import streamlit as st

st.set_page_config(
    page_title="CareerPilot AI — AI-Powered IT Learning & Career Platform",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded",
    menu_items={
        'About': "CareerPilot AI — Enterprise IT Learning Platform"
    }
)

from components.footer import show_footer
from components.sidebar import show_sidebar
from components.hero import show_hero
from components.input_form import show_input_form
from utils.pdf_generator import create_pdf
from components.charts import show_learning_timeline
from utils.roadmap_generator import generate_roadmap
from utils.progress_manager import (
    load_progress,
    update_target_role,
    calculate_overall_progress
)
from components.assessment_component import render_assessment_interface


def load_css():
    with open("styles/style.css", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


load_css()
show_sidebar()

# ── Breadcrumb ────────────────────────────────────────────────────────────────
st.markdown("""
<div class="breadcrumb-nav">
    <span style="color:#0F172A; font-weight:600;">CareerPilot AI</span>
    <span class="breadcrumb-separator">/</span>
    <span style="color:#64748B;">Roadmap Studio</span>
</div>
""", unsafe_allow_html=True)

show_hero()

# ── Professional SaaS Stat Cards ──────────────────────────────────────────────
st.markdown("""
<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:28px;">

    <div class="stat-card">
        <div>
            <div class="stat-label">Production Career Paths</div>
            <div class="stat-number" style="color:#2563EB;">50+ Tracks</div>
        </div>
        <div class="stat-subtext">AI, Full Stack, Cloud, DevOps &amp; Data Engineering</div>
    </div>

    <div class="stat-card">
        <div>
            <div class="stat-label">Verification Engine</div>
            <div class="stat-number" style="color:#10B981;">Automated</div>
        </div>
        <div class="stat-subtext">MCQs, Architecture Reviews &amp; Live Unit Test Cases</div>
    </div>

    <div class="stat-card">
        <div>
            <div class="stat-label">AI Intelligence</div>
            <div class="stat-number" style="color:#4F46E5;">Google Gemini</div>
        </div>
        <div class="stat-subtext">Dynamic Gap Analysis &amp; Targeted Recommendations</div>
    </div>

</div>
""", unsafe_allow_html=True)

# ── Live Telemetry Banner ─────────────────────────────────────────────────────
progress_stats = calculate_overall_progress()
if progress_stats["total"] > 0:
    st.markdown(f"""
    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px;
                padding:16px 20px; margin-bottom:24px; box-shadow:0 1px 3px rgba(15,23,42,0.04);
                display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:12px;">
            <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:8px; width:40px; height:40px; display:flex; align-items:center; justify-content:center; font-size:1.25rem;">
                🎯
            </div>
            <div>
                <div style="color:#0F172A; font-weight:700; font-size:14px;">
                    Active Career Path: <span style="color:#2563EB;">{progress_stats['target_role']}</span>
                </div>
                <div style="color:#64748B; font-size:12.5px;">
                    Progress: {progress_stats['completed']}/{progress_stats['total']} Modules Cleared ({progress_stats['percentage']}%) &nbsp;•&nbsp; Streak: 🔥 {progress_stats['learning_streak_days']} Days
                </div>
            </div>
        </div>
        <div style="display:flex; gap:8px;">
            <a href="/Dashboard" target="_self" style="text-decoration:none;">
                <span class="badge-base badge-primary" style="padding:6px 14px; font-size:12px; cursor:pointer;">
                    📊 Open Dashboard
                </span>
            </a>
            <a href="/Assessments" target="_self" style="text-decoration:none;">
                <span class="badge-base badge-success" style="padding:6px 14px; font-size:12px; cursor:pointer;">
                    📝 Assessment Center
                </span>
            </a>
        </div>
    </div>
    """, unsafe_allow_html=True)

# ── Input Form ───────────────────────────────────────────────────────────────
skills, role, months, generate = show_input_form()

if generate:
    update_target_role(role=role, timeline_months=months, skills=skills)
    with st.spinner("🤖 Google Gemini is synthesizing your personalized career roadmap..."):
        roadmap = generate_roadmap(skills, role, months)
        st.session_state["saved_roadmap"] = roadmap
        st.session_state["saved_role"] = role
        st.session_state["saved_months"] = months

# ── Roadmap Display & Continuous Evaluation ───────────────────────────────────
saved_roadmap = st.session_state.get("saved_roadmap")
saved_role = st.session_state.get("saved_role", role)
saved_months = st.session_state.get("saved_months", months)

if saved_roadmap:
    st.markdown("""
<div style="background:#ECFDF5; border:1px solid #A7F3D0; border-left:5px solid #10B981;
            border-radius:10px; padding:14px 18px; margin:20px 0 16px;
            color:#065F46; font-weight:600; font-size:14px; display:flex; align-items:center; gap:8px;">
    ✓ &nbsp;Your personalized curriculum roadmap has been synthesized and synchronized with your Student Dashboard!
</div>
""", unsafe_allow_html=True)

    # Workflow Pipeline Breadcrumb
    st.markdown("""
<div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px;
            padding:12px 16px; margin-bottom:16px; font-size:12.5px; color:#475569; line-height:1.6;">
    <strong style="color:#0F172A;">🔄 Complete Continuous Learning Workflow:</strong><br>
    <span style="color:#2563EB; font-weight:600;">1. AI Roadmap</span> &nbsp;→&nbsp;
    <span style="color:#64748B;">2. Learn Module</span> &nbsp;→&nbsp;
    <span style="color:#4F46E5; font-weight:600;">3. Take Assessment</span> &nbsp;→&nbsp;
    <span style="color:#10B981; font-weight:600;">4. Automatic Evaluation</span> &nbsp;→&nbsp;
    <span style="color:#0284C7; font-weight:600;">5. Update Dashboard</span> &nbsp;→&nbsp;
    <span style="color:#F59E0B; font-weight:600;">6. Improve Weak Areas</span> &nbsp;→&nbsp;
    <span style="color:#10B981; font-weight:600;">7. Unlock Next Milestone</span>
</div>
""", unsafe_allow_html=True)

    st.markdown("""
<div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px;
            padding:28px 32px; margin:16px 0; box-shadow:0 1px 3px rgba(15,23,42,0.04);">
""", unsafe_allow_html=True)

    st.markdown(saved_roadmap)

    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown("---")

    show_learning_timeline(saved_months)

    st.markdown("---")

    # PDF Download
    pdf_path = create_pdf(saved_roadmap)

    with open(pdf_path, "rb") as file:
        st.download_button(
            "⬇️  Download Roadmap as PDF",
            data=file,
            file_name=f"careerpilot_{saved_role.lower().replace(' ', '_')}_roadmap.pdf",
            mime="application/pdf",
            use_container_width=True
        )

    st.markdown("---")

    # ── Quick Assessment Launcher on Home Page ──
    st.markdown("""
    <div style="margin-top:20px; margin-bottom:12px;">
        <div style="font-size:1.25rem; font-weight:700; color:#0F172A;">
            📝 Ready for Module Verification? Take Periodic Assessment
        </div>
        <p style="color:#64748B; font-size:13.5px; margin-top:4px;">
            Finished studying the current curriculum module? Take the diagnostic test below.
            Passing validates your competencies, unlocks subsequent milestones, and updates your Student Dashboard.
        </p>
    </div>
    """, unsafe_allow_html=True)

    curr_data = load_progress()
    active_mods = curr_data.get("modules", [])
    active_mod_id = "mod_1"
    for m in active_mods:
        if m.get("status") in ["in_progress", "needs_revision"]:
            active_mod_id = m["id"]
            break

    with st.expander("🚀 Open Interactive Module Testing Environment", expanded=False):
        render_assessment_interface(active_mod_id)

show_footer()