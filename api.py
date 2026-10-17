import os
import json
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Import existing backend modules directly — preserving all existing logic
from utils.roadmap_generator import generate_roadmap as gemini_generate_roadmap
from utils.assessment_bank import get_assessment_for_module, CURATED_ASSESSMENTS
from utils.submodule_bank import get_submodules_for_module, get_final_exam_for_module
from utils.progress_manager import (
    load_progress,
    save_progress,
    update_target_role,
    evaluate_student_assessment,
    evaluate_submodule_assessment,
    evaluate_final_exam_assessment,
    calculate_overall_progress,
    execute_python_code,
    get_default_state,
    find_module_record,
    find_submodule_record
)

load_dotenv()

app = FastAPI(
    title="CareerPilot AI — Backend API Bridge",
    description="REST API Bridge exposing Python Gemini roadmap generation, automatic code evaluation against unit test cases, and student progress telemetry.",
    version="2.5.0"
)

# CORS Configuration — allow Vite dev server and localhost origins
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:8501"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic Request Models ───────────────────────────────────────────────────

class RoadmapGenerateRequest(BaseModel):
    skills: List[str] = Field(default_factory=lambda: ["Python", "SQL"])
    role: str = "AI Engineer"
    months: int = 6

class UpdateProgressRequest(BaseModel):
    student_name: Optional[str] = None
    target_role: Optional[str] = None
    selected_timeline_months: Optional[int] = None
    current_skills: Optional[List[str]] = None
    learning_objective: Optional[str] = None

class TestCodeExecutionRequest(BaseModel):
    code: str
    function_name: str = "solution"
    test_cases: List[Dict[str, Any]]

class AssessmentSubmitRequest(BaseModel):
    module_id: str
    mcq_answers: Dict[str, str] = Field(default_factory=dict)
    coding_solution: str = ""

class AssessmentGenerateRequest(BaseModel):
    module_id: str
    module_name: Optional[str] = None
    topics: Optional[List[str]] = None

class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = "password"
    name: Optional[str] = None

class SubmoduleEvaluateRequest(BaseModel):
    module_id: str
    sub_id: str
    mcq_answers: Dict[str, str] = Field(default_factory=dict)
    coding_solution: str = ""

class FinalExamEvaluateRequest(BaseModel):
    module_id: str
    variant_id: str = "variant_a"
    mcq_answers: Dict[str, str] = Field(default_factory=dict)
    coding_solutions: Dict[str, str] = Field(default_factory=dict)


# ── Health Check ──────────────────────────────────────────────────────────────

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CareerPilot AI FastAPI Bridge",
        "version": "2.5.0",
        "gemini_configured": bool(os.getenv("GEMINI_API_KEY"))
    }


# ── Authentication Endpoints ──────────────────────────────────────────────────

@app.post("/api/auth/login")
def login_user(req: LoginRequest):
    """
    Authenticates or creates student session and returns reactive session token.
    """
    progress = load_progress()
    name = req.name or (progress.get("student_name") if "alex" in req.email.lower() else req.email.split("@")[0].title())
    user = {
        "id": "usr_alex_01",
        "name": name,
        "email": req.email,
        "avatar": f"https://api.dicebear.com/7.x/bottts/svg?seed={name}",
        "role": progress.get("target_role", "AI Engineer")
    }
    return {
        "success": True,
        "token": "cp_jwt_session_" + req.email.replace("@", "_").replace(".", "_"),
        "user": user
    }


@app.get("/api/auth/me")
def get_current_authenticated_user():
    """
    Returns current authenticated student user profile.
    """
    progress = load_progress()
    name = progress.get("student_name", "Alex Morgan")
    return {
        "id": "usr_alex_01",
        "name": name,
        "email": "alex.morgan@careerpilot.ai",
        "avatar": f"https://api.dicebear.com/7.x/bottts/svg?seed={name}",
        "role": progress.get("target_role", "AI Engineer")
    }


# ── Roadmap Endpoints ─────────────────────────────────────────────────────────

@app.post("/api/roadmap")
def create_roadmap(req: RoadmapGenerateRequest):
    """
    Synthesizes a personalized AI career roadmap using Google Gemini AI,
    updates student progress state, and stores the latest generated roadmap.
    """
    try:
        # Update progress manager with selected role and timeline
        update_target_role(role=req.role, timeline_months=req.months, skills=req.skills)
        
        # Call existing Gemini roadmap generator
        markdown_content = gemini_generate_roadmap(req.skills, req.role, req.months)
        
        # Persist the latest roadmap in progress data
        progress = load_progress()
        progress["latest_roadmap"] = {
            "role": req.role,
            "months": req.months,
            "skills": req.skills,
            "markdown": markdown_content
        }
        save_progress(progress)
        
        return {
            "success": True,
            "role": req.role,
            "months": req.months,
            "markdown": markdown_content,
            "modules": progress.get("modules", [])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate roadmap: {str(e)}")


@app.get("/api/roadmap")
def get_current_roadmap():
    """
    Returns the latest synthesized roadmap and curriculum modules.
    """
    progress = load_progress()
    saved = progress.get("latest_roadmap")
    if saved:
        return {
            "role": saved.get("role", progress.get("target_role", "AI Engineer")),
            "months": saved.get("months", progress.get("selected_timeline_months", 6)),
            "skills": saved.get("skills", progress.get("current_skills", ["Python", "SQL"])),
            "markdown": saved.get("markdown", ""),
            "modules": progress.get("modules", [])
        }
    return {
        "role": progress.get("target_role", "AI Engineer"),
        "months": progress.get("selected_timeline_months", 6),
        "skills": progress.get("current_skills", ["Python", "SQL"]),
        "markdown": None,
        "modules": progress.get("modules", [])
    }


@app.get("/api/roadmap/{module_id}")
@app.get("/api/module/{module_id}")
def get_module_overview(module_id: str):
    """
    Returns Module Overview: module summary, list of submodules with status/scores,
    progress bar counts, and the Final Exam card status (locked/unlocked/passed).
    """
    progress = load_progress()
    modules = progress.get("modules", [])
    matched = find_module_record(modules, module_id)
    if not matched:
        raise HTTPException(status_code=404, detail=f"Module {module_id} not found")

    curated_subs = get_submodules_for_module(module_id, matched.get("name"))
    saved_subs = matched.get("submodules", [])
    sub_status_map = {s["id"]: s for s in saved_subs}

    merged_subs = []
    for cs in curated_subs:
        saved = sub_status_map.get(cs["id"], {})
        merged_subs.append({
            "id": cs["id"],
            "module_id": module_id,
            "title": cs["title"],
            "difficulty": cs["difficulty"],
            "order": cs["order"],
            "status": saved.get("status", "locked"),
            "score": saved.get("score"),
            "has_coding_challenge": cs.get("has_coding_challenge", True),
            "coding_challenge_count": cs.get("coding_challenge_count", 1),
            "test_scope": cs.get("test_scope"),
            "topics": cs.get("topics", []),
            "w3schools_links": cs.get("w3schools_links", [])
        })

    all_passed = all(s.get("status") == "passed" for s in merged_subs) if merged_subs else False
    final_exam_meta = matched.get("final_exam", {})
    if all_passed and final_exam_meta.get("status") == "locked":
        final_exam_meta["status"] = "unlocked"
        final_exam_meta["unlocked"] = True

    return {
        "module": {
            "id": matched["id"],
            "name": matched["name"],
            "status": matched.get("status", "in_progress"),
            "score": matched.get("score"),
            "topics": matched.get("topics", []),
            "description": f"Master foundational and production-grade competencies in {matched['name']}."
        },
        "submodules": merged_subs,
        "submodules_passed": sum(1 for s in merged_subs if s["status"] == "passed"),
        "submodules_total": len(merged_subs),
        "final_exam": {
            "module_id": module_id,
            "title": final_exam_meta.get("title", f"{matched['name']} Final Exam"),
            "status": final_exam_meta.get("status", "locked"),
            "unlocked": final_exam_meta.get("unlocked", False) or all_passed,
            "score": final_exam_meta.get("score"),
            "question_count": 16,
            "duration_minutes": 45
        }
    }


@app.get("/api/module/{module_id}/submodule/{sub_id}")
def get_submodule_detail(module_id: str, sub_id: str):
    """
    Returns SUBMODULE LEARNING page data: 'What you'll learn', 'Test scope',
    W3Schools resources, and current completion status.
    """
    progress = load_progress()
    modules = progress.get("modules", [])
    matched_mod = find_module_record(modules, module_id)
    if not matched_mod:
        raise HTTPException(status_code=404, detail="Module not found")

    curated_subs = get_submodules_for_module(module_id, matched_mod.get("name"))
    matched_sub = find_submodule_record(curated_subs, sub_id)
    if not matched_sub:
        raise HTTPException(status_code=404, detail="Submodule not found")

    saved_subs = matched_mod.get("submodules", [])
    saved_sub = find_submodule_record(saved_subs, sub_id) or {}

    return {
        "id": matched_sub["id"],
        "module_id": module_id,
        "module_name": matched_mod["name"],
        "title": matched_sub["title"],
        "difficulty": matched_sub["difficulty"],
        "order": matched_sub["order"],
        "status": saved_sub.get("status", "in_progress"),
        "score": saved_sub.get("score"),
        "has_coding_challenge": matched_sub.get("has_coding_challenge", True),
        "coding_challenge_count": matched_sub.get("coding_challenge_count", 1),
        "topics": matched_sub.get("topics", []),
        "what_you_will_learn": matched_sub.get("what_you_will_learn", []),
        "test_scope": matched_sub.get("test_scope", "4 MCQs + 1 Python Challenge • 15 Mins"),
        "w3schools_links": matched_sub.get("w3schools_links", [])
    }


@app.get("/api/module/{module_id}/submodule/{sub_id}/test")
def get_submodule_test_suite(module_id: str, sub_id: str):
    """
    Returns the test suite for a specific submodule: client-safe MCQs,
    conceptual question, and coding challenge with starter code and test cases.
    """
    progress = load_progress()
    modules = progress.get("modules", [])
    matched_mod = find_module_record(modules, module_id)
    if not matched_mod:
        raise HTTPException(status_code=404, detail="Module not found")

    curated_subs = get_submodules_for_module(module_id, matched_mod.get("name"))
    matched_sub = find_submodule_record(curated_subs, sub_id)
    if not matched_sub:
        raise HTTPException(status_code=404, detail="Submodule not found")

    safe_mcqs = []
    for q in matched_sub.get("mcqs", []):
        safe_mcqs.append({
            "id": q["id"],
            "topic": q.get("topic", "General"),
            "question": q["question"],
            "options": q["options"]
        })

    cc = matched_sub.get("coding_challenge")
    safe_cc = None
    if cc:
        safe_cc = {
            "id": cc["id"],
            "title": cc["title"],
            "topic": cc.get("topic", "Coding Challenge"),
            "description": cc["description"],
            "function_name": cc["function_name"],
            "starter_code": cc["starter_code"],
            "test_cases": cc.get("test_cases", [])[:2]
        }

    return {
        "module_id": module_id,
        "module_name": matched_mod["name"],
        "submodule_id": sub_id,
        "submodule_title": matched_sub["title"],
        "difficulty": matched_sub["difficulty"],
        "test_scope": matched_sub.get("test_scope"),
        "has_coding_challenge": matched_sub.get("has_coding_challenge", True),
        "mcqs": safe_mcqs,
        "conceptual_question": matched_sub.get("conceptual_question"),
        "coding_challenge": safe_cc
    }


@app.post("/api/module/{module_id}/submodule/{sub_id}/evaluate")
def evaluate_submodule_attempt(module_id: str, sub_id: str, req: SubmoduleEvaluateRequest):
    """
    Auto-grades submodule MCQs and executes coding challenge in Python sandbox.
    Unlocks next submodule upon pass (>=70%), and unlocks Final Exam if all submodules passed.
    """
    try:
        eval_result = evaluate_submodule_assessment(
            module_id=module_id,
            sub_id=sub_id,
            mcq_answers=req.mcq_answers,
            coding_solution=req.coding_solution
        )
        return {
            "success": True,
            "attempt": eval_result,
            "updated_progress": calculate_overall_progress()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Submodule evaluation error: {str(e)}")


@app.get("/api/module/{module_id}/final-exam")
def get_module_final_exam(module_id: str, variant: str = "variant_a"):
    """
    Returns 15-20 question module Final Exam with MCQs, conceptual questions,
    and 2-3 coding challenges spanning the entire module. Supports variant switching.
    """
    progress = load_progress()
    modules = progress.get("modules", [])
    matched_mod = find_module_record(modules, module_id)
    if not matched_mod:
        raise HTTPException(status_code=404, detail="Module not found")

    exam = get_final_exam_for_module(module_id, variant, matched_mod.get("name"))

    safe_mcqs = []
    for q in exam.get("mcqs", []):
        safe_mcqs.append({
            "id": q["id"],
            "topic": q.get("topic", "Core Fundamentals"),
            "question": q["question"],
            "options": q["options"]
        })

    safe_challenges = []
    for cc in exam.get("coding_challenges", []):
        safe_challenges.append({
            "id": cc["id"],
            "title": cc["title"],
            "topic": cc.get("topic", "Coding Challenge"),
            "description": cc["description"],
            "function_name": cc["function_name"],
            "starter_code": cc["starter_code"],
            "test_cases": cc.get("test_cases", [])[:2]
        })

    return {
        "module_id": module_id,
        "module_name": matched_mod["name"],
        "variant_id": exam.get("variant_id", variant),
        "title": exam.get("title"),
        "subtitle": exam.get("subtitle"),
        "question_count": exam.get("question_count", len(safe_mcqs)),
        "passing_percentage": exam.get("passing_percentage", 75.0),
        "duration_minutes": exam.get("duration_minutes", 45),
        "mcqs": safe_mcqs,
        "conceptual_questions": exam.get("conceptual_questions", []),
        "coding_challenges": safe_challenges
    }


@app.post("/api/module/{module_id}/final-exam/evaluate")
def evaluate_module_final_exam(module_id: str, req: FinalExamEvaluateRequest):
    """
    Auto-grades the 15-20 question Final Exam.
    When passed (>=75%): marks module completed, unlocks next module in roadmap!
    """
    try:
        eval_result = evaluate_final_exam_assessment(
            module_id=module_id,
            variant_id=req.variant_id,
            mcq_answers=req.mcq_answers,
            coding_solutions=req.coding_solutions
        )
        return {
            "success": True,
            "attempt": eval_result,
            "updated_progress": calculate_overall_progress()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Final exam evaluation error: {str(e)}")


# ── Progress & Dashboard Telemetry ───────────────────────────────────────────

@app.get("/api/progress")
def get_student_progress():
    """
    Returns the complete student progress record from student_progress.json.
    """
    return load_progress()


@app.post("/api/progress")
def update_student_progress(req: UpdateProgressRequest):
    """
    Updates student identity, career goal, or skills in student_progress.json.
    """
    progress = load_progress()
    if req.student_name is not None:
        progress["student_name"] = req.student_name
    if req.target_role is not None:
        progress = update_target_role(
            role=req.target_role,
            timeline_months=req.selected_timeline_months or progress.get("selected_timeline_months", 6),
            skills=req.current_skills or progress.get("current_skills")
        )
    if req.learning_objective is not None:
        progress["learning_objective"] = req.learning_objective
    if req.current_skills is not None:
        progress["current_skills"] = req.current_skills

    save_progress(progress)
    return {
        "success": True,
        "progress": progress,
        "stats": calculate_overall_progress()
    }


@app.get("/api/dashboard")
def get_dashboard_summary():
    """
    Returns aggregated dashboard stats, telemetry, recent subjects,
    skills breakdown, and progress history for charting.
    """
    progress = load_progress()
    stats = calculate_overall_progress()
    return {
        "stats": stats,
        "modules": progress.get("modules", []),
        "recently_accessed_subjects": progress.get("recently_accessed_subjects", []),
        "progress_history": progress.get("progress_history", []),
        "topic_scores": progress.get("topic_scores", {}),
        "skills_mastered": progress.get("skills_mastered", []),
        "skills_to_improve": progress.get("skills_to_improve", []),
        "recommendations": progress.get("recommendations", []),
        "assessment_history": progress.get("assessment_history", [])
    }


@app.get("/api/recommendations")
def get_learning_recommendations():
    """
    Returns targeted remediation recommendations and practice suggestions.
    """
    progress = load_progress()
    return {
        "recommendations": progress.get("recommendations", []),
        "skills_to_improve": progress.get("skills_to_improve", []),
        "skills_mastered": progress.get("skills_mastered", [])
    }


# ── Assessment & Automatic Evaluation ─────────────────────────────────────────

@app.get("/api/assessments/{module_id}")
def get_assessment(module_id: str):
    """
    Retrieves the assessment suite (MCQs, conceptual questions, coding challenge)
    for a given module ID.
    """
    progress = load_progress()
    modules = progress.get("modules", [])
    matched_name = next((m.get("name") for m in modules if m.get("id") == module_id), None)
    
    assessment = get_assessment_for_module(module_id, matched_name)
    
    # Hide correct answers from client payload for test integrity
    client_safe_mcqs = []
    for q in assessment.get("mcqs", []):
        client_safe_mcqs.append({
            "id": q["id"],
            "topic": q.get("topic", "General"),
            "question": q["question"],
            "options": q["options"]
        })
        
    return {
        "module_id": assessment.get("module_id"),
        "module_name": assessment.get("module_name"),
        "role": assessment.get("role", "AI Engineer"),
        "topics": assessment.get("topics", []),
        "description": assessment.get("description"),
        "mcqs": client_safe_mcqs,
        "conceptual_question": assessment.get("conceptual_question"),
        "coding_challenge": {
            "id": assessment.get("coding_challenge", {}).get("id"),
            "title": assessment.get("coding_challenge", {}).get("title"),
            "topic": assessment.get("coding_challenge", {}).get("topic"),
            "description": assessment.get("coding_challenge", {}).get("description"),
            "function_name": assessment.get("coding_challenge", {}).get("function_name"),
            "starter_code": assessment.get("coding_challenge", {}).get("starter_code"),
            "test_cases": assessment.get("coding_challenge", {}).get("test_cases", [])[:2] # reveal visible sample test cases
        }
    }


@app.post("/api/assessments/test-code")
def test_code_execution(req: TestCodeExecutionRequest):
    """
    Executes Python code against test cases in real-time sandbox before final submission.
    """
    try:
        result = execute_python_code(req.code, req.test_cases, req.function_name)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Code execution error: {str(e)}")


@app.post("/api/evaluate")
def evaluate_assessment(req: AssessmentSubmitRequest):
    """
    Auto-grades MCQs, runs the coding challenge against full test suites,
    classifies the attempt as Pass, Needs Improvement, or Fail,
    updates student progress and unlocks the next module if passed.
    """
    try:
        progress = load_progress()
        matched_name = next((m.get("name") for m in progress.get("modules", []) if m.get("id") == req.module_id), None)
        assessment_data = get_assessment_for_module(req.module_id, matched_name)
        
        eval_result = evaluate_student_assessment(
            module_id=req.module_id,
            mcq_answers=req.mcq_answers,
            coding_solution=req.coding_solution,
            assessment_data=assessment_data
        )
        
        return {
            "success": True,
            "attempt": eval_result,
            "updated_progress": calculate_overall_progress()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")
