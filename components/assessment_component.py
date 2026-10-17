import streamlit as st
import time
from typing import Dict, Any, Optional
from utils.progress_manager import (
    load_progress,
    evaluate_student_assessment,
    execute_python_code
)
from utils.assessment_bank import get_assessment_for_module


def render_assessment_interface(module_id: str, custom_title: Optional[str] = None):
    progress_data = load_progress()
    assessment = get_assessment_for_module(module_id, custom_title)
    
    st.markdown(f"""
    <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px;
                padding: 22px 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(15,23,42,0.05);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
                <span class="badge-base badge-primary" style="margin-bottom:6px;">
                    Periodic Assessment Suite
                </span>
                <h2 style="color: #0F172A; margin: 4px 0 6px 0; font-size: 1.6rem; font-weight: 800;">
                    📝 {assessment.get('module_name', 'Module Test')}
                </h2>
                <p style="color: #64748B; font-size: 14px; margin: 0; line-height: 1.5;">
                    {assessment.get('description', 'Evaluate your comprehension and coding skills.')}
                </p>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:10px 18px; text-align:right;">
                <div style="color: #64748B; font-size: 11px; text-transform: uppercase; font-weight: 700;">Passing Benchmark</div>
                <div style="font-size: 1.45rem; font-weight: 800; color: #10B981;">75%</div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    mcqs = assessment.get("mcqs", [])
    conceptual = assessment.get("conceptual_question", {})
    coding_challenge = assessment.get("coding_challenge", {})

    user_mcq_answers: Dict[str, str] = {}

    # ── SECTION 1: Multiple Choice Questions ──
    st.markdown("""
    <div style="font-size: 1.15rem; font-weight: 700; color: #0F172A; margin: 20px 0 12px; display:flex; align-items:center; gap: 8px;">
        <span>🎯 Section 1: Conceptual Multiple Choice Questions</span>
    </div>
    """, unsafe_allow_html=True)

    for i, q in enumerate(mcqs, 1):
        st.markdown(f"""
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
                    padding: 16px 20px; margin-bottom: 14px; box-shadow: 0 1px 2px rgba(15,23,42,0.03);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                <span style="color: #2563EB; font-weight: 700; font-size: 12.5px; text-transform:uppercase;">Question {i}</span>
                <span class="badge-base badge-neutral" style="font-size:11px;">Topic: {q.get('topic', 'General')}</span>
            </div>
            <div style="color: #0F172A; font-size: 14.5px; font-weight: 600; margin-bottom: 8px; line-height: 1.5;">
                {q['question']}
            </div>
        </div>
        """, unsafe_allow_html=True)

        options_dict = q["options"]
        option_keys = list(options_dict.keys())
        formatted_options = [f"{k}. {options_dict[k]}" for k in option_keys]

        choice = st.radio(
            label=f"Select your answer for Question {i}:",
            options=formatted_options,
            key=f"mcq_{module_id}_{q['id']}",
            index=None,
            label_visibility="collapsed"
        )
        if choice:
            selected_key = choice.split(".")[0].strip()
            user_mcq_answers[q["id"]] = selected_key

    # ── SECTION 2: Conceptual Engineering Reflection ──
    if conceptual:
        st.markdown("""
        <div style="font-size: 1.15rem; font-weight: 700; color: #0F172A; margin: 28px 0 12px; display:flex; align-items:center; gap: 8px;">
            <span>💡 Section 2: Technical Concept Analysis</span>
        </div>
        """, unsafe_allow_html=True)

        st.markdown(f"""
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
                    padding: 16px 20px; margin-bottom: 14px; box-shadow: 0 1px 2px rgba(15,23,42,0.03);">
            <div style="color: #4F46E5; font-weight: 700; font-size: 13.5px; margin-bottom: 4px;">
                Concept: {conceptual.get('title', 'Architecture Analysis')}
            </div>
            <div style="color: #334155; font-size: 14px; line-height: 1.55; margin-bottom: 10px;">
                {conceptual.get('prompt', '')}
            </div>
        </div>
        """, unsafe_allow_html=True)

        user_concept_notes = st.text_area(
            "Synthesize your technical explanation here:",
            placeholder="Type your explanation...",
            key=f"concept_{module_id}",
            height=90
        )

        with st.expander("🔍 View Reference Engineering Rationale"):
            st.markdown(f"""
            <div style="color: #1E293B; font-size: 13.5px; line-height: 1.6; background:#F8FAFC; padding:12px; border-radius:8px;">
                {conceptual.get('sample_answer', '')}
            </div>
            """, unsafe_allow_html=True)

    # ── SECTION 3: Live Programming Challenge ──
    if coding_challenge:
        st.markdown("""
        <div style="font-size: 1.15rem; font-weight: 700; color: #0F172A; margin: 28px 0 12px; display:flex; align-items:center; gap: 8px;">
            <span>💻 Section 3: Live Code Challenge (Evaluated with Test Cases)</span>
        </div>
        """, unsafe_allow_html=True)

        st.markdown(f"""
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
                    padding: 18px 20px; margin-bottom: 14px; box-shadow: 0 1px 2px rgba(15,23,42,0.03);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
                <span style="color: #0F172A; font-weight: 700; font-size: 15px;">
                    {coding_challenge.get('title', 'Coding Challenge')}
                </span>
                <span class="badge-base badge-primary" style="font-size:11px;">
                    Automated Test Suite
                </span>
            </div>
            <div style="color: #334155; font-size: 14px; line-height: 1.55; margin-bottom: 12px;">
                {coding_challenge.get('description', '')}
            </div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #1E40AF;">
                Required Signature: <code>def {coding_challenge.get('function_name', 'solution')}(...)</code>
            </div>
        </div>
        """, unsafe_allow_html=True)

        starter_code = coding_challenge.get("starter_code", "def solution():\n    pass\n")
        code_input = st.text_area(
            "Write your Python solution below:",
            value=starter_code,
            height=160,
            key=f"code_{module_id}"
        )

        col_run, _ = st.columns([1, 4])
        with col_run:
            test_run_btn = st.button("▶️ Test Code", key=f"run_test_{module_id}", use_container_width=True)

        if test_run_btn:
            with st.spinner("Executing solution against test cases..."):
                t_cases = coding_challenge.get("test_cases", [])
                f_name = coding_challenge.get("function_name", "solution")
                exec_result = execute_python_code(code_input, t_cases, f_name)

            if exec_result["error"]:
                st.error(f"❌ Execution Error: {exec_result['error']}")
            else:
                passed = exec_result["passed_tests"]
                total = exec_result["total_tests"]
                if passed == total:
                    st.success(f"✅ All {total}/{total} Test Cases Passed Successfully!")
                else:
                    st.warning(f"⚠️ {passed}/{total} Test Cases Passed.")

                for tr in exec_result["test_results"]:
                    status_badge = '<span class="badge-base badge-success">Passed ✓</span>' if tr["passed"] else '<span class="badge-base badge-warning">Failed ✗</span>'
                    st.markdown(f"""
                    <div style="background: #FFFFFF; border: 1px solid #E2E8F0;
                                border-radius: 8px; padding: 10px 14px; margin-bottom: 6px; font-size: 12.5px; font-family: 'JetBrains Mono', monospace;">
                        {status_badge} &nbsp;|&nbsp;
                        <span style="color: #64748B;">Input: {tr['input']}</span> &nbsp;|&nbsp;
                        <span style="color: #2563EB;">Expected: {tr['expected']}</span> &nbsp;|&nbsp;
                        <span style="color: #0F172A;">Got: {tr['actual']}</span>
                        {f'<br><span style="color:#EF4444;">Error: {tr["error"]}</span>' if tr.get('error') else ''}
                    </div>
                    """, unsafe_allow_html=True)

    # ── SECTION 4: Final Submission & Automatic Evaluation ──
    st.markdown("---")
    submit_btn = st.button("🚀 Submit Complete Assessment for Automatic Evaluation", type="primary", use_container_width=True)

    if submit_btn:
        with st.spinner("Evaluating responses, grading code against unit tests, and updating progress..."):
            eval_result = evaluate_student_assessment(
                module_id=module_id,
                mcq_answers=user_mcq_answers,
                coding_solution=code_input,
                assessment_data=assessment
            )
            time.sleep(0.4)

        score = eval_result["score"]
        status = eval_result["status"]

        # Render Assessment Result Banner
        if status == "Pass":
            st.balloons()
            st.markdown(f"""
            <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-left: 6px solid #10B981;
                        border-radius: 14px; padding: 24px; margin: 20px 0; text-align: center;">
                <div style="font-size: 2.2rem; margin-bottom: 4px;">🎉</div>
                <div style="color: #065F46; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">
                    Assessment Result: PASSED
                </div>
                <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color: #0F172A; font-size: 2.5rem; margin: 6px 0;">
                    {score}%
                </h1>
                <p style="color: #334155; font-size: 15px; max-width: 620px; margin: 0 auto 12px; line-height: 1.5;">
                    Excellent work! You have successfully mastered <strong>{assessment.get('module_name')}</strong>.
                    Your roadmap progress has been updated, and the next learning milestone is unlocked.
                </p>
                {f'<span class="badge-base badge-success" style="font-size:13px; padding:6px 14px;">🔓 Unlocked Next Module: {eval_result["unlocked_next_module"]}</span>' if eval_result.get("unlocked_next_module") else ''}
            </div>
            """, unsafe_allow_html=True)

        elif status == "Needs Improvement":
            st.markdown(f"""
            <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-left: 6px solid #F59E0B;
                        border-radius: 14px; padding: 24px; margin: 20px 0; text-align: center;">
                <div style="font-size: 2.2rem; margin-bottom: 4px;">⚠️</div>
                <div style="color: #92400E; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">
                    Assessment Result: NEEDS IMPROVEMENT
                </div>
                <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color: #0F172A; font-size: 2.5rem; margin: 6px 0;">
                    {score}%
                </h1>
                <p style="color: #334155; font-size: 15px; max-width: 620px; margin: 0 auto; line-height: 1.5;">
                    You are close to the 75% benchmark! Review the topics below to reinforce your understanding and retake the test.
                </p>
            </div>
            """, unsafe_allow_html=True)

        else:
            st.markdown(f"""
            <div style="background: #FEF2F2; border: 1px solid #FECACA; border-left: 6px solid #EF4444;
                        border-radius: 14px; padding: 24px; margin: 20px 0; text-align: center;">
                <div style="font-size: 2.2rem; margin-bottom: 4px;">❌</div>
                <div style="color: #991B1B; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">
                    Assessment Result: REVIEW REQUIRED
                </div>
                <h1 style="font-family:'Plus Jakarta Sans',sans-serif; color: #0F172A; font-size: 2.5rem; margin: 6px 0;">
                    {score}%
                </h1>
                <p style="color: #334155; font-size: 15px; max-width: 620px; margin: 0 auto; line-height: 1.5;">
                    Score below 50%. Review the core fundamentals identified below before attempting the assessment again.
                </p>
            </div>
            """, unsafe_allow_html=True)

        # Performance Breakdown Columns
        col_s, col_w = st.columns(2, gap="medium")
        with col_s:
            st.markdown("#### 🟢 Strengths Mastered")
            if eval_result["strengths"]:
                for s in eval_result["strengths"]:
                    st.markdown(f"- **{s}** (Demonstrated solid proficiency)")
            else:
                st.info("No standout strengths recorded on this attempt.")

        with col_w:
            st.markdown("#### 🟡 Topics Needing Revision")
            if eval_result["weaknesses"]:
                for w in eval_result["weaknesses"]:
                    st.markdown(f"- **{w}** (Recommended for targeted review)")
            else:
                st.success("Great job! No major conceptual weaknesses detected.")

        # MCQ Explanations
        with st.expander("📝 Detailed Question & Answer Explanations"):
            for bd in eval_result["mcq_breakdown"]:
                icon = "✅ Correct" if bd["is_correct"] else "❌ Incorrect"
                st.markdown(f"""
                **Question:** {bd['question']}  
                - Your choice: `{bd['user_choice']}` &nbsp;|&nbsp; Correct answer: `{bd['correct_option']}` ({icon})  
                - *Explanation:* {bd['explanation']}  
                ---
                """)

        # Personalized Recommendations
        st.markdown("#### 💡 Personalized Recommendations")
        recs = eval_result.get("recommendations", [])
        for r in recs:
            st.markdown(f"""
            <div class="recommendation-card">
                <div style="color: #2563EB; font-weight: 700; font-size: 13.5px;">{r.get('topic')}</div>
                <div style="color: #334155; font-size: 13px; margin: 3px 0;"><strong>Observation:</strong> {r.get('reason')}</div>
                <div style="color: #0F172A; font-size: 13px;"><strong>Next Action:</strong> {r.get('action')}</div>
            </div>
            """, unsafe_allow_html=True)

        st.info("💡 Your Student Dashboard has been updated. Open the Dashboard page to view updated progress metrics!")
