import streamlit as st


def show_input_form():
    st.markdown("""
    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:22px 24px; margin-bottom:24px; box-shadow:0 1px 3px rgba(15,23,42,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div>
                <h3 style="font-size:1.25rem; font-weight:700; color:#0F172A; margin:0 0 4px 0;">🎯 Define Your Career Objectives</h3>
                <p style="color:#64748B; font-size:13.5px; margin:0;">Configure your baseline skill profile and target learning trajectory.</p>
            </div>
            <span class="badge-base badge-primary" style="font-size:11px;">AI Roadmap Generator</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns(2, gap="large")

    with col1:
        current_skills = st.multiselect(
            "🧠 Baseline Competencies & Skills",
            [
                "Python",
                "SQL",
                "Machine Learning",
                "Deep Learning",
                "HTML & CSS",
                "JavaScript",
                "React",
                "Node.js",
                "Data Structures & Algorithms",
                "Git & GitHub",
                "Docker & Containers",
                "Kubernetes",
                "AWS Cloud",
                "Applied Statistics",
                "REST APIs",
                "CI/CD Pipelines"
            ],
            default=["Python", "SQL"],
            placeholder="Select your verified technical skills..."
        )

    with col2:
        dream_role = st.selectbox(
            "🎯 Target Professional Role",
            [
                "AI Engineer",
                "Data Scientist",
                "ML Engineer",
                "Full Stack Developer",
                "Cloud Engineer",
                "DevOps Engineer",
                "Backend Developer",
                "Frontend Developer",
            ],
            index=0
        )

    months = st.slider(
        "⏱️ Target Timeline Commitment (Months)",
        min_value=3,
        max_value=12,
        value=6,
        help="Target duration to complete all progressive learning modules and periodic assessments."
    )

    st.markdown("""
    <div style="margin: 8px 0 20px; background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:14px 18px; color:#1E40AF; font-size:13.5px; line-height:1.5;">
        💡 <strong>Personalization Tip:</strong> Specifying both your foundational and intermediate competencies allows Gemini AI to pinpoint prerequisite skill gaps, tailoring each periodic module assessment directly to your goals.
    </div>
    """, unsafe_allow_html=True)

    generate = st.button(
        "✨ Generate Verified AI Career Roadmap",
        type="primary",
        use_container_width=True
    )

    return current_skills, dream_role, months, generate