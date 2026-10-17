import json
import os
import sys
import io
import traceback
from datetime import datetime
from typing import Dict, List, Any, Optional

from utils.submodule_bank import get_submodules_for_module, get_final_exam_for_module

PROGRESS_FILE = "student_progress.json"

def find_module_record(modules: List[Dict[str, Any]], mod_id: str) -> Optional[Dict[str, Any]]:
    if not mod_id:
        return None
    target = str(mod_id).replace("-", "_").lower()
    for m in modules:
        mid = str(m.get("id", "")).replace("-", "_").lower()
        if mid == target or m.get("id") == mod_id:
            return m
    return None

def find_submodule_record(submodules: List[Dict[str, Any]], sub_id: str) -> Optional[Dict[str, Any]]:
    if not sub_id:
        return None
    target = str(sub_id).replace("-", "_").lower()
    for s in submodules:
        sid = str(s.get("id", "")).replace("-", "_").lower()
        if sid == target or s.get("id") == sub_id:
            return s
    return None

DEFAULT_TRACKS = {
    "AI Engineer": [
        {
            "id": "mod_1",
            "name": "Python Programming & Core Syntax",
            "topics": ["Variables & Types", "Control Flow", "Functions & Scope", "OOP & Classes", "Error Handling"],
            "status": "in_progress",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_2",
            "name": "Data Structures & Algorithms",
            "topics": ["Arrays & Strings", "Hash Maps", "Binary Search", "Recursion", "Time Complexity"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_3",
            "name": "SQL & Relational Databases",
            "topics": ["Basic Queries", "Joins & Subqueries", "Aggregations", "Indexing & Transactions"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_4",
            "name": "Machine Learning Fundamentals",
            "topics": ["Scikit-Learn", "Regression & Classification", "Evaluation Metrics", "Feature Engineering"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_5",
            "name": "Deep Learning & Neural Networks",
            "topics": ["PyTorch Basics", "Backpropagation", "CNNs", "Loss Functions & Optimizers"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_6",
            "name": "Generative AI & LLM Engineering",
            "topics": ["Prompt Engineering", "Embeddings & Vector DBs", "RAG Systems", "Gemini API Integration"],
            "status": "locked",
            "score": None,
            "attempts": 0
        }
    ],
    "Data Scientist": [
        {
            "id": "mod_1",
            "name": "Python for Data Analysis",
            "topics": ["NumPy Arrays", "Pandas DataFrames", "Data Cleaning", "Vectorized Operations"],
            "status": "in_progress",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_2",
            "name": "Advanced SQL & Warehousing",
            "topics": ["Window Functions", "CTEs", "Aggregations", "Query Optimization"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_3",
            "name": "Probability & Applied Statistics",
            "topics": ["Hypothesis Testing", "Distributions", "Confidence Intervals", "A/B Testing"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_4",
            "name": "Machine Learning Modeling",
            "topics": ["Supervised Learning", "Unsupervised Clustering", "Cross-Validation", "Ensemble Models"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_5",
            "name": "Data Visualization & Storytelling",
            "topics": ["Matplotlib & Seaborn", "Plotly Dashboards", "KPI Formulation", "Executive Insights"],
            "status": "locked",
            "score": None,
            "attempts": 0
        }
    ],
    "Full Stack Developer": [
        {
            "id": "mod_1",
            "name": "Modern JavaScript & ES6+",
            "topics": ["Async/Await & Promises", "DOM Manipulation", "Array Methods", "ES Modules"],
            "status": "in_progress",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_2",
            "name": "React & Frontend Architecture",
            "topics": ["Components & Props", "Hooks & State", "Routing & Navigation", "Tailwind CSS"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_3",
            "name": "Node.js & Backend APIs",
            "topics": ["Express Routing", "REST API Design", "Authentication & JWT", "Middleware"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_4",
            "name": "Database Systems & ORMs",
            "topics": ["PostgreSQL/MongoDB", "Prisma / Mongoose", "Data Modeling", "Migrations"],
            "status": "locked",
            "score": None,
            "attempts": 0
        },
        {
            "id": "mod_5",
            "name": "DevOps, Testing & Deployment",
            "topics": ["Unit & Integration Tests", "Docker Containers", "CI/CD Pipelines", "Cloud Deployment"],
            "status": "locked",
            "score": None,
            "attempts": 0
        }
    ]
}


def get_default_state(role: str = "AI Engineer") -> Dict[str, Any]:
    track_modules = DEFAULT_TRACKS.get(role, DEFAULT_TRACKS["AI Engineer"])
    return {
        "student_name": "Alex Morgan",
        "target_role": role,
        "learning_objective": f"Master production-ready {role} skill stack with validated competencies",
        "selected_timeline_months": 6,
        "current_skills": ["Python", "SQL"],
        "learning_streak_days": 5,
        "total_paths_enrolled": 2,
        "modules": [dict(m) for m in track_modules],
        "assessment_history": [
            {
                "timestamp": "2026-10-15 14:30",
                "module_id": "mod_1",
                "module_name": "Python Programming & Core Syntax",
                "score": 88.0,
                "status": "Pass",
                "mcq_score": 90.0,
                "coding_score": 85.0,
                "strengths": ["Variables & Types", "Control Flow", "Functions & Scope"],
                "weaknesses": ["OOP & Classes"]
            }
        ],
        "recently_accessed_subjects": [
            {
                "id": "mod_1",
                "name": "Python Programming & Core Syntax",
                "category": "Core Programming",
                "progress_pct": 100,
                "last_accessed": "Today, 10:45 AM",
                "status": "Completed"
            },
            {
                "id": "mod_2",
                "name": "Data Structures & Algorithms",
                "category": "Computer Science",
                "progress_pct": 35,
                "last_accessed": "Yesterday, 3:15 PM",
                "status": "In Progress"
            },
            {
                "id": "mod_3",
                "name": "SQL & Relational Databases",
                "category": "Data Architecture",
                "progress_pct": 0,
                "last_accessed": "3 days ago",
                "status": "Queued"
            }
        ],
        "progress_history": [
            {"label": "Week 1", "date": "Oct 1", "progress": 10, "score": 75},
            {"label": "Week 2", "date": "Oct 5", "progress": 25, "score": 82},
            {"label": "Week 3", "date": "Oct 10", "progress": 45, "score": 85},
            {"label": "Current", "date": "Oct 16", "progress": 65, "score": 88}
        ],
        "topic_scores": {
            "Variables & Types": 90,
            "Control Flow": 85,
            "Functions & Scope": 80,
            "Arrays & Strings": 75,
            "OOP & Classes": 55,
            "Error Handling": 70
        },
        "skills_mastered": ["Variables & Syntax", "Functions Basics", "Control Flow"],
        "skills_to_improve": ["Object-Oriented Design", "Binary Search Complexity"],
        "recommendations": [
            {
                "topic": "OOP & Classes",
                "reason": "Recent performance in class inheritance and dunder methods needs reinforcement.",
                "action": "Complete the 'Python OOP Deep Dive' review guide and solve 3 practice exercises on Class Constructors."
            }
        ]
    }


def _ensure_module_submodules_and_final_exam(data: Dict[str, Any]) -> Dict[str, Any]:
    modules = data.get("modules", [])
    updated = False
    for i, m in enumerate(modules):
        mod_id = m.get("id")
        mod_name = m.get("name")
        mod_status = m.get("status", "locked")

        # 1. Ensure submodules exist
        if "submodules" not in m or not m["submodules"]:
            curated_subs = get_submodules_for_module(mod_id, mod_name)
            sub_list = []
            for j, s in enumerate(curated_subs):
                if mod_status == "completed":
                    sub_status = "passed"
                    sub_score = 100.0
                elif mod_status == "in_progress":
                    sub_status = "in_progress" if j == 0 else "locked"
                    sub_score = None
                else:
                    sub_status = "locked"
                    sub_score = None

                sub_list.append({
                    "id": s["id"],
                    "module_id": mod_id,
                    "title": s["title"],
                    "difficulty": s["difficulty"],
                    "order": s["order"],
                    "status": sub_status,
                    "score": sub_score,
                    "attempts": 1 if sub_status == "passed" else 0,
                    "has_coding_challenge": s.get("has_coding_challenge", True),
                    "test_scope": s.get("test_scope", "4 MCQs + 1 Python Challenge • 15 Mins"),
                    "topics": s.get("topics", [])
                })
            m["submodules"] = sub_list
            updated = True

        # 2. Ensure final_exam exists
        all_passed = all(s.get("status") == "passed" for s in m.get("submodules", []))
        if "final_exam" not in m:
            if mod_status == "completed":
                fe_status = "passed"
                fe_unlocked = True
                fe_score = m.get("score") or 100.0
            elif all_passed:
                fe_status = "unlocked"
                fe_unlocked = True
                fe_score = None
            else:
                fe_status = "locked"
                fe_unlocked = False
                fe_score = None

            m["final_exam"] = {
                "module_id": mod_id,
                "title": f"{mod_name} Final Exam",
                "status": fe_status,
                "unlocked": fe_unlocked,
                "score": fe_score,
                "attempts": 1 if fe_status == "passed" else 0
            }
            updated = True
        else:
            if all_passed and m["final_exam"].get("status") == "locked":
                m["final_exam"]["status"] = "unlocked"
                m["final_exam"]["unlocked"] = True
                updated = True

    if updated:
        save_progress(data)
    return data


def load_progress() -> Dict[str, Any]:
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                data = _ensure_module_submodules_and_final_exam(data)
                return data
        except Exception:
            pass
    default_data = get_default_state()
    default_data = _ensure_module_submodules_and_final_exam(default_data)
    save_progress(default_data)
    return default_data


def save_progress(data: Dict[str, Any]) -> None:
    try:
        with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving progress: {e}")


def update_target_role(role: str, timeline_months: int = 6, skills: Optional[List[str]] = None) -> Dict[str, Any]:
    data = load_progress()
    data["target_role"] = role
    data["selected_timeline_months"] = timeline_months
    if skills:
        data["current_skills"] = skills

    matched_track = DEFAULT_TRACKS.get(role)
    if not matched_track:
        # Generate custom track template if role is unique
        matched_track = [
            {"id": "mod_1", "name": f"{role} Foundations", "topics": ["Core Syntax", "Tools", "Best Practices"], "status": "in_progress", "score": None, "attempts": 0},
            {"id": "mod_2", "name": "Intermediate Architecture", "topics": ["Data Structures", "Design Patterns", "Modularization"], "status": "locked", "score": None, "attempts": 0},
            {"id": "mod_3", "name": "Specialized Domain Engineering", "topics": ["APIs", "Data Pipelines", "Production Practices"], "status": "locked", "score": None, "attempts": 0},
            {"id": "mod_4", "name": "Capstone & Deployment", "topics": ["System Integration", "Testing", "Cloud Delivery"], "status": "locked", "score": None, "attempts": 0}
        ]

    # Check if existing modules match role, otherwise reset or adapt
    current_module_names = [m["name"] for m in data.get("modules", [])]
    new_module_names = [m["name"] for m in matched_track]

    if current_module_names != new_module_names:
        data["modules"] = [dict(m) for m in matched_track]
        data["modules"][0]["status"] = "in_progress"

    save_progress(data)
    return data


def execute_python_code(user_code: str, test_cases: List[Dict[str, Any]], function_name: str) -> Dict[str, Any]:
    """
    Safely executes user Python code and validates it against test cases.
    """
    # Restricted builtins for safety
    restricted_globals = {
        "__builtins__": {
            "abs": abs, "all": all, "any": any, "bool": bool, "dict": dict,
            "enumerate": enumerate, "filter": filter, "float": float, "int": int,
            "isinstance": isinstance, "len": len, "list": list, "map": map,
            "max": max, "min": min, "range": range, "reversed": reversed,
            "round": round, "set": set, "sorted": sorted, "str": str,
            "sum": sum, "tuple": tuple, "zip": zip, "print": print
        }
    }
    local_scope: Dict[str, Any] = {}

    # Capture stdout
    old_stdout = sys.stdout
    redirected_output = io.StringIO()
    sys.stdout = redirected_output

    try:
        exec(user_code, restricted_globals, local_scope)
    except Exception as e:
        sys.stdout = old_stdout
        return {
            "success": False,
            "error": f"Syntax or Runtime Error during code compilation: {str(e)}",
            "passed_tests": 0,
            "total_tests": len(test_cases),
            "test_results": []
        }
    finally:
        sys.stdout = old_stdout

    if function_name not in local_scope:
        return {
            "success": False,
            "error": f"Function '{function_name}' was not defined. Ensure your solution defines `def {function_name}(...)`.",
            "passed_tests": 0,
            "total_tests": len(test_cases),
            "test_results": []
        }

    target_func = local_scope[function_name]
    passed_count = 0
    test_results = []

    for idx, tc in enumerate(test_cases, 1):
        input_args = tc.get("input", [])
        expected_output = tc.get("expected")

        try:
            if isinstance(input_args, (list, tuple)):
                try:
                    actual_output = target_func(*input_args)
                except TypeError:
                    actual_output = target_func(input_args)
            else:
                actual_output = target_func(input_args)

            # Check correctness
            passed = (actual_output == expected_output)
            if passed:
                passed_count += 1

            test_results.append({
                "test_num": idx,
                "input": str(input_args),
                "expected": str(expected_output),
                "actual": str(actual_output),
                "passed": passed,
                "error": None
            })
        except Exception as e:
            test_results.append({
                "test_num": idx,
                "input": str(input_args),
                "expected": str(expected_output),
                "actual": "Error",
                "passed": False,
                "error": str(e)
            })

    all_passed = (passed_count == len(test_cases))
    return {
        "success": all_passed,
        "error": None,
        "passed_tests": passed_count,
        "total_tests": len(test_cases),
        "test_results": test_results
    }


def evaluate_student_assessment(
    module_id: str,
    mcq_answers: Dict[str, str],
    coding_solution: str,
    assessment_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Evaluates MCQs and Coding Challenge, calculates grade, identifies weak areas,
    updates learning progress, and generates personalized recommendations.
    """
    data = load_progress()
    mcq_questions = assessment_data.get("mcqs", [])
    coding_challenge = assessment_data.get("coding_challenge", {})

    # 1. Evaluate MCQs
    total_mcqs = len(mcq_questions)
    correct_mcqs = 0
    mcq_breakdown = []
    topic_results: Dict[str, List[bool]] = {}

    for q in mcq_questions:
        q_id = q["id"]
        topic = q.get("topic", "General")
        correct_opt = q["correct_option"]
        user_choice = mcq_answers.get(q_id)

        is_correct = (user_choice == correct_opt)
        if is_correct:
            correct_mcqs += 1

        if topic not in topic_results:
            topic_results[topic] = []
        topic_results[topic].append(is_correct)

        mcq_breakdown.append({
            "id": q_id,
            "question": q["question"],
            "user_choice": user_choice,
            "correct_option": correct_opt,
            "is_correct": is_correct,
            "explanation": q.get("explanation", "")
        })

    mcq_percentage = (correct_mcqs / total_mcqs * 100) if total_mcqs > 0 else 100

    # 2. Evaluate Coding Challenge
    code_eval = {
        "success": True,
        "passed_tests": 1,
        "total_tests": 1,
        "test_results": []
    }
    code_percentage = 100.0

    if coding_challenge:
        test_cases = coding_challenge.get("test_cases", [])
        func_name = coding_challenge.get("function_name", "solution")
        code_eval = execute_python_code(coding_solution, test_cases, func_name)
        total_tc = code_eval["total_tests"]
        passed_tc = code_eval["passed_tests"]
        code_percentage = (passed_tc / total_tc * 100) if total_tc > 0 else 0

        code_topic = coding_challenge.get("topic", "Practical Implementation")
        if code_topic not in topic_results:
            topic_results[code_topic] = []
        topic_results[code_topic].append(code_eval["success"])

    # 3. Overall Weighted Score: 60% MCQs + 40% Coding
    final_score = round((mcq_percentage * 0.6) + (code_percentage * 0.4), 1)

    # 4. Performance Classification
    if final_score >= 75.0:
        status_category = "Pass"
    elif final_score >= 50.0:
        status_category = "Needs Improvement"
    else:
        status_category = "Fail"

    # 5. Topic Strengths and Weaknesses
    strengths = []
    weaknesses = []
    for topic, outcomes in topic_results.items():
        topic_acc = (sum(outcomes) / len(outcomes)) * 100
        # Update overall topic scores
        current_prev = data["topic_scores"].get(topic, 70)
        data["topic_scores"][topic] = round((current_prev * 0.4) + (topic_acc * 0.6), 1)

        if topic_acc >= 75.0:
            strengths.append(topic)
            if topic not in data["skills_mastered"]:
                data["skills_mastered"].append(topic)
            if topic in data["skills_to_improve"]:
                data["skills_to_improve"].remove(topic)
        else:
            weaknesses.append(topic)
            if topic not in data["skills_to_improve"]:
                data["skills_to_improve"].append(topic)
            if topic in data["skills_mastered"]:
                data["skills_mastered"].remove(topic)

    # 6. Update Module Status in Roadmap
    modules = data.get("modules", [])
    module_idx = next((i for i, m in enumerate(modules) if m["id"] == module_id), -1)
    unlocked_next_name = None

    if module_idx != -1:
        modules[module_idx]["attempts"] = modules[module_idx].get("attempts", 0) + 1
        modules[module_idx]["score"] = final_score

        if status_category == "Pass":
            modules[module_idx]["status"] = "completed"
            # Unlock next module
            if module_idx + 1 < len(modules):
                if modules[module_idx + 1]["status"] == "locked":
                    modules[module_idx + 1]["status"] = "in_progress"
                unlocked_next_name = modules[module_idx + 1]["name"]
        elif status_category == "Needs Improvement":
            modules[module_idx]["status"] = "needs_revision"
        else:
            modules[module_idx]["status"] = "needs_revision"

    # 7. Generate Personalized Recommendations
    new_recommendations = []
    if status_category in ["Needs Improvement", "Fail"] or weaknesses:
        for weak_topic in weaknesses:
            new_recommendations.append({
                "topic": weak_topic,
                "reason": f"Scored below passing threshold in '{weak_topic}' during recent module assessment.",
                "action": f"Review concepts for {weak_topic}, re-read core documentation, and solve 2 diagnostic exercises.",
                "practice_query": f"How to master {weak_topic} in {data.get('target_role', 'Tech')}"
            })
    elif status_category == "Pass":
        next_step_text = f"Advance to module: {unlocked_next_name}" if unlocked_next_name else "All curriculum modules completed!"
        new_recommendations.append({
            "topic": "Career Acceleration",
            "reason": f"Excellent mastery demonstrated in {assessment_data.get('module_name', 'current module')} ({final_score}%).",
            "action": next_step_text,
            "practice_query": "Explore real-world portfolio capstone projects"
        })

    data["recommendations"] = new_recommendations

    # 8. Add to Assessment History
    history_record = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "module_id": module_id,
        "module_name": assessment_data.get("module_name", "Module Assessment"),
        "score": final_score,
        "status": status_category,
        "mcq_score": round(mcq_percentage, 1),
        "coding_score": round(code_percentage, 1),
        "strengths": strengths,
        "weaknesses": weaknesses
    }
    data["assessment_history"].insert(0, history_record)

    save_progress(data)

    return {
        "score": final_score,
        "status": status_category,
        "mcq_percentage": mcq_percentage,
        "code_percentage": code_percentage,
        "code_eval": code_eval,
        "mcq_breakdown": mcq_breakdown,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "unlocked_next_module": unlocked_next_name,
        "recommendations": new_recommendations
    }


def evaluate_submodule_assessment(
    module_id: str,
    sub_id: str,
    mcq_answers: Dict[str, str],
    coding_solution: str = ""
) -> Dict[str, Any]:
    """
    Evaluates a submodule test (MCQs + coding challenge if present).
    Pass threshold: >= 70%.
    When passed: unlocks next submodule, and unlocks Final Exam if all submodules passed.
    """
    data = load_progress()
    modules = data.get("modules", [])
    matched_mod = find_module_record(modules, module_id)
    if not matched_mod:
        raise ValueError(f"Module {module_id} not found")

    curated_subs = get_submodules_for_module(module_id, matched_mod.get("name"))
    matched_sub = find_submodule_record(curated_subs, sub_id)
    if not matched_sub:
        raise ValueError(f"Submodule {sub_id} not found")

    mcqs = matched_sub.get("mcqs", [])
    total_mcqs = len(mcqs)
    correct_mcqs = 0
    mcq_breakdown = []
    topic_results: Dict[str, List[bool]] = {}

    for q in mcqs:
        q_id = q["id"]
        correct_opt = q["correct_option"]
        user_choice = mcq_answers.get(q_id)
        topic = q.get("topic", "General")
        is_correct = (user_choice == correct_opt)
        if is_correct:
            correct_mcqs += 1
        if topic not in topic_results:
            topic_results[topic] = []
        topic_results[topic].append(is_correct)

        mcq_breakdown.append({
            "id": q_id,
            "question": q["question"],
            "user_choice": user_choice,
            "correct_option": correct_opt,
            "is_correct": is_correct,
            "explanation": q.get("explanation", "")
        })

    mcq_pct = (correct_mcqs / total_mcqs * 100) if total_mcqs > 0 else 100.0

    # Evaluate Coding Challenge if present
    code_eval = {"success": True, "passed_tests": 0, "total_tests": 0, "test_results": []}
    code_pct = 100.0
    has_code = matched_sub.get("has_coding_challenge", False)
    cc = matched_sub.get("coding_challenge")

    if has_code and cc:
        test_cases = cc.get("test_cases", [])
        func_name = cc.get("function_name", "solution")
        code_eval = execute_python_code(coding_solution, test_cases, func_name)
        total_tc = code_eval["total_tests"]
        passed_tc = code_eval["passed_tests"]
        code_pct = (passed_tc / total_tc * 100) if total_tc > 0 else 0.0
        final_score = round((mcq_pct * 0.6) + (code_pct * 0.4), 1)

        c_topic = cc.get("topic", "Coding Practice")
        if c_topic not in topic_results:
            topic_results[c_topic] = []
        topic_results[c_topic].append(code_eval["success"])
    else:
        final_score = round(mcq_pct, 1)

    if final_score >= 70.0:
        status_category = "Pass"
    elif final_score >= 50.0:
        status_category = "Needs Improvement"
    else:
        status_category = "Fail"

    # Strengths / Weaknesses
    strengths = []
    weaknesses = []
    for topic, outcomes in topic_results.items():
        acc = (sum(outcomes) / len(outcomes)) * 100
        cur_prev = data["topic_scores"].get(topic, 70)
        data["topic_scores"][topic] = round((cur_prev * 0.4) + (acc * 0.6), 1)
        if acc >= 70.0:
            strengths.append(topic)
            if topic not in data["skills_mastered"]:
                data["skills_mastered"].append(topic)
            if topic in data["skills_to_improve"]:
                data["skills_to_improve"].remove(topic)
        else:
            weaknesses.append(topic)
            if topic not in data["skills_to_improve"]:
                data["skills_to_improve"].append(topic)
            if topic in data["skills_mastered"]:
                data["skills_mastered"].remove(topic)

    # Update Submodule in Student Progress
    sub_list = matched_mod.get("submodules", [])
    target_sid = str(sub_id).replace('-', '_').lower()
    sub_idx = next((i for i, s in enumerate(sub_list) if s["id"] == sub_id or s["id"].replace('-', '_').lower() == target_sid), -1)
    unlocked_final_exam = False
    unlocked_next_sub_id = None

    if sub_idx != -1:
        sub_list[sub_idx]["attempts"] = sub_list[sub_idx].get("attempts", 0) + 1
        sub_list[sub_idx]["score"] = final_score
        if status_category == "Pass":
            sub_list[sub_idx]["status"] = "passed"
            # Unlock next submodule if present
            if sub_idx + 1 < len(sub_list):
                if sub_list[sub_idx + 1]["status"] == "locked":
                    sub_list[sub_idx + 1]["status"] = "in_progress"
                unlocked_next_sub_id = sub_list[sub_idx + 1]["id"]

            # Check if all submodules in module are now passed
            if all(s.get("status") == "passed" for s in sub_list):
                matched_mod["final_exam"]["status"] = "unlocked"
                matched_mod["final_exam"]["unlocked"] = True
                unlocked_final_exam = True

    history_record = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "type": "submodule_test",
        "module_id": module_id,
        "submodule_id": sub_id,
        "module_name": f"{matched_mod.get('name')} • {matched_sub['title']}",
        "score": final_score,
        "status": status_category,
        "mcq_score": round(mcq_pct, 1),
        "coding_score": round(code_pct, 1),
        "strengths": strengths,
        "weaknesses": weaknesses
    }
    data["assessment_history"].insert(0, history_record)
    save_progress(data)

    return {
        "score": final_score,
        "status": status_category,
        "assessment_type": "submodule_test",
        "mcq_percentage": mcq_pct,
        "code_percentage": code_pct,
        "code_eval": code_eval,
        "mcq_breakdown": mcq_breakdown,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "unlocked_next_sub_id": unlocked_next_sub_id,
        "unlocked_final_exam": unlocked_final_exam,
        "recommendations": data.get("recommendations", [])
    }


def evaluate_final_exam_assessment(
    module_id: str,
    variant_id: str = "variant_a",
    mcq_answers: Dict[str, str] = {},
    coding_solutions: Dict[str, str] = {}
) -> Dict[str, Any]:
    """
    Evaluates a 15-20 question module Final Exam.
    Pass threshold: >= 75%.
    When passed: marks module complete, records milestone, and unlocks the next module.
    """
    data = load_progress()
    modules = data.get("modules", [])
    matched_mod = find_module_record(modules, module_id)
    if not matched_mod:
        raise ValueError(f"Module {module_id} not found")

    exam_data = get_final_exam_for_module(module_id, variant_id, matched_mod.get("name"))
    mcqs = exam_data.get("mcqs", [])
    total_mcqs = len(mcqs)
    correct_mcqs = 0
    mcq_breakdown = []
    topic_results: Dict[str, List[bool]] = {}

    for q in mcqs:
        q_id = q["id"]
        correct_opt = q["correct_option"]
        user_choice = mcq_answers.get(q_id)
        topic = q.get("topic", "General")
        is_correct = (user_choice == correct_opt)
        if is_correct:
            correct_mcqs += 1
        if topic not in topic_results:
            topic_results[topic] = []
        topic_results[topic].append(is_correct)

        mcq_breakdown.append({
            "id": q_id,
            "question": q["question"],
            "user_choice": user_choice,
            "correct_option": correct_opt,
            "is_correct": is_correct,
            "explanation": q.get("explanation", "")
        })

    mcq_pct = (correct_mcqs / total_mcqs * 100) if total_mcqs > 0 else 100.0

    # Evaluate All Coding Challenges in Final Exam
    challenges = exam_data.get("coding_challenges", [])
    code_results = []
    total_code_tests = 0
    passed_code_tests = 0

    for ch in challenges:
        ch_id = ch["id"]
        solution = coding_solutions.get(ch_id) or coding_solutions.get(ch["function_name"], "")
        res = execute_python_code(solution, ch.get("test_cases", []), ch.get("function_name", "solution"))
        code_results.append({
            "challenge_id": ch_id,
            "title": ch["title"],
            "result": res
        })
        total_code_tests += res["total_tests"]
        passed_code_tests += res["passed_tests"]

        c_topic = ch.get("topic", "Practical Coding")
        if c_topic not in topic_results:
            topic_results[c_topic] = []
        topic_results[c_topic].append(res["success"])

    code_pct = (passed_code_tests / total_code_tests * 100) if total_code_tests > 0 else 100.0
    final_score = round((mcq_pct * 0.5) + (code_pct * 0.5), 1)

    if final_score >= 75.0:
        status_category = "Pass"
    elif final_score >= 50.0:
        status_category = "Needs Improvement"
    else:
        status_category = "Fail"

    # Strengths / Weaknesses
    strengths = []
    weaknesses = []
    for topic, outcomes in topic_results.items():
        acc = (sum(outcomes) / len(outcomes)) * 100
        cur_prev = data["topic_scores"].get(topic, 70)
        data["topic_scores"][topic] = round((cur_prev * 0.4) + (acc * 0.6), 1)
        if acc >= 75.0:
            strengths.append(topic)
            if topic not in data["skills_mastered"]:
                data["skills_mastered"].append(topic)
            if topic in data["skills_to_improve"]:
                data["skills_to_improve"].remove(topic)
        else:
            weaknesses.append(topic)
            if topic not in data["skills_to_improve"]:
                data["skills_to_improve"].append(topic)
            if topic in data["skills_mastered"]:
                data["skills_mastered"].remove(topic)

    # Update Module Status
    mod_idx = next((i for i, m in enumerate(modules) if m["id"] == module_id), -1)
    unlocked_next_name = None

    if mod_idx != -1:
        matched_mod["final_exam"]["attempts"] = matched_mod["final_exam"].get("attempts", 0) + 1
        matched_mod["final_exam"]["score"] = final_score

        if status_category == "Pass":
            matched_mod["final_exam"]["status"] = "passed"
            matched_mod["status"] = "completed"
            matched_mod["score"] = final_score

            # Unlock Next Module
            if mod_idx + 1 < len(modules):
                if modules[mod_idx + 1]["status"] == "locked":
                    modules[mod_idx + 1]["status"] = "in_progress"
                # Also unlock first submodule of next module
                next_subs = modules[mod_idx + 1].get("submodules", [])
                if next_subs and next_subs[0]["status"] == "locked":
                    next_subs[0]["status"] = "in_progress"
                unlocked_next_name = modules[mod_idx + 1]["name"]
        elif status_category == "Needs Improvement":
            matched_mod["final_exam"]["status"] = "needs_improvement"
        else:
            matched_mod["final_exam"]["status"] = "failed"

    history_record = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "type": "final_exam",
        "module_id": module_id,
        "module_name": f"{matched_mod.get('name')} • Final Exam",
        "score": final_score,
        "status": status_category,
        "mcq_score": round(mcq_pct, 1),
        "coding_score": round(code_pct, 1),
        "strengths": strengths,
        "weaknesses": weaknesses
    }
    data["assessment_history"].insert(0, history_record)
    save_progress(data)

    return {
        "score": final_score,
        "status": status_category,
        "assessment_type": "final_exam",
        "mcq_percentage": mcq_pct,
        "code_percentage": code_pct,
        "coding_results": code_results,
        "mcq_breakdown": mcq_breakdown,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "unlocked_next_module": unlocked_next_name,
        "recommendations": data.get("recommendations", [])
    }


def calculate_overall_progress() -> Dict[str, Any]:
    data = load_progress()
    modules = data.get("modules", [])
    total = len(modules)
    if total == 0:
        return {"percentage": 0, "completed": 0, "total": 0, "remaining": 0}

    completed = sum(1 for m in modules if m.get("status") == "completed")
    in_progress = sum(1 for m in modules if m.get("status") == "in_progress")
    needs_revision = sum(1 for m in modules if m.get("status") == "needs_revision")
    remaining = total - completed

    # Calculate submodules stats
    all_subs_count = 0
    all_subs_passed = 0
    enriched_modules = []
    for m in modules:
        subs = m.get("submodules", [])
        m_passed = sum(1 for s in subs if s.get("status") == "passed")
        m_total = len(subs)
        all_subs_count += m_total
        all_subs_passed += m_passed
        
        fe = m.get("final_exam", {})
        if m.get("status") == "completed":
            sub_status_label = "Final Exam Passed"
        elif fe.get("status") == "unlocked":
            sub_status_label = f"{m_passed}/{m_total} submodules passed • Final Exam Ready"
        elif m.get("status") == "in_progress":
            sub_status_label = f"{m_passed}/{m_total} submodules passed • Final Exam pending"
        else:
            sub_status_label = "Locked Milestone"
            
        m_copy = dict(m)
        m_copy["submodules_passed"] = m_passed
        m_copy["submodules_total"] = m_total
        m_copy["status_label"] = sub_status_label
        enriched_modules.append(m_copy)

    # Percentage: 60% Submodules + 40% Completed Final Exams
    sub_ratio = (all_subs_passed / all_subs_count) if all_subs_count > 0 else 0
    mod_ratio = (completed / total) if total > 0 else 0
    percentage = round((sub_ratio * 60.0) + (mod_ratio * 40.0), 1)

    history = data.get("assessment_history", [])
    if history:
        assessment_average = round(sum(h.get("score", 0) for h in history) / len(history), 1)
    else:
        assessment_average = 0.0

    # Pending Assessments Count: in_progress submodules + unlocked final exams
    pending_count = 0
    for m in modules:
        if m.get("status") == "in_progress":
            pending_count += sum(1 for s in m.get("submodules", []) if s.get("status") == "in_progress")
            if m.get("final_exam", {}).get("status") == "unlocked":
                pending_count += 1

    # Determine Recommended Next Activity
    recommended_activity = None
    for m in modules:
        if m.get("status") == "in_progress":
            fe = m.get("final_exam", {})
            if fe.get("status") == "unlocked":
                recommended_activity = {
                    "title": f"Take Final Exam: {m['name']}",
                    "description": "All submodules passed! Take the comprehensive 15-20 question Final Exam to complete this module and unlock the next milestone.",
                    "type": "final_exam",
                    "module_id": m["id"],
                    "cta_label": "Launch Final Exam"
                }
                break
            # Find in-progress submodule
            for s in m.get("submodules", []):
                if s.get("status") == "in_progress":
                    recommended_activity = {
                        "title": f"Study & Test: {s['title']}",
                        "description": f"Learn key topics and take the submodule test ({s.get('test_scope', 'MCQs + Code Challenge')}).",
                        "type": "submodule",
                        "module_id": m["id"],
                        "submodule_id": s["id"],
                        "cta_label": "Open Submodule"
                    }
                    break
            if recommended_activity:
                break

    if not recommended_activity:
        if completed == total and total > 0:
            recommended_activity = {
                "title": "Complete Capstone Portfolio Project",
                "description": "All roadmap curriculum modules passed! Build and deploy your production-ready portfolio project.",
                "type": "capstone",
                "module_id": "capstone",
                "cta_label": "View Capstone Guidelines"
            }
        else:
            first_mod = modules[0] if modules else {"id": "mod_1", "name": "Module 1"}
            recommended_activity = {
                "title": f"Start {first_mod['name']}",
                "description": "Begin the first submodule in your career flightpath.",
                "type": "submodule",
                "module_id": first_mod["id"],
                "submodule_id": "sub_1_1",
                "cta_label": "Start Learning"
            }

    return {
        "percentage": percentage,
        "completed": completed,
        "remaining": remaining,
        "in_progress": in_progress,
        "needs_revision": needs_revision,
        "total": total,
        "submodules_passed": all_subs_passed,
        "submodules_total": all_subs_count,
        "modules": enriched_modules,
        "student_name": data.get("student_name", "Alex Morgan"),
        "target_role": data.get("target_role", "AI Engineer"),
        "learning_objective": data.get("learning_objective", f"Master {data.get('target_role', 'AI Engineer')} Core Competencies"),
        "learning_streak_days": data.get("learning_streak_days", 5),
        "total_paths_enrolled": data.get("total_paths_enrolled", 2),
        "pending_assessments_count": pending_count,
        "assessment_average": assessment_average,
        "recommended_next_activity": recommended_activity,
        "skills_mastered_count": len(data.get("skills_mastered", [])),
        "skills_to_improve_count": len(data.get("skills_to_improve", []))
    }
