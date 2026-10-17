import streamlit as st

st.set_page_config(
    page_title="About — CareerPilot AI",
    page_icon="ℹ️",
    layout="wide"
)


def load_css():
    with open("styles/style.css", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


load_css()

from components.sidebar import show_sidebar
from components.footer import show_footer

show_sidebar()

# ── Breadcrumb ────────────────────────────────────────────────────────────────
st.markdown("""
<div class="breadcrumb-nav">
    <a href="/app" target="_self">CareerPilot AI</a>
    <span class="breadcrumb-separator">/</span>
    <span style="color: #0F172A; font-weight: 600;">About the Platform</span>
</div>
""", unsafe_allow_html=True)

# ── Page Header ───────────────────────────────────────────────────────────────
st.markdown("""
<div class="page-header" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:28px 32px; box-shadow:0 1px 3px rgba(15,23,42,0.04); margin-bottom:28px;">
    <span class="badge-base badge-primary" style="margin-bottom:8px;">Enterprise Platform Overview</span>
    <h1 style="font-size:2.2rem; font-weight:800; color:#0F172A; margin:6px 0 8px 0; letter-spacing:-0.02em;">
        Architected for the Next Generation of IT Engineers
    </h1>
    <p style="color:#475569; font-size:15px; max-width:760px; line-height:1.6; margin:0;">
        CareerPilot AI is an intelligent career navigation and technical competency verification platform.
        It synthesizes personalized learning roadmaps, conducts automated periodic assessments, and guides students
        through progressive milestones toward career readiness.
    </p>
</div>
""", unsafe_allow_html=True)

# ── Mission & AI Architecture ─────────────────────────────────────────────────
col1, col2 = st.columns([1.2, 1], gap="large")

with col1:
    st.markdown("""
    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:22px 24px; box-shadow:0 1px 2px rgba(15,23,42,0.03); height:100%;">
        <div style="font-size:2rem; margin-bottom:12px;">🎯</div>
        <h3 style="color:#0F172A; font-size:1.25rem; font-weight:700; margin-bottom:8px;">Our Core Mission</h3>
        <p style="color:#475569; font-size:14px; line-height:1.65; margin:0;">
            Navigating technical careers is often fragmented and overwhelming. CareerPilot AI solves this by giving every
            student a data-driven, verified roadmap tailored precisely to their skill profile and target role.
            With automated assessment gates at each module, students validate real competencies rather than merely watching tutorials.
        </p>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:22px 24px; box-shadow:0 1px 2px rgba(15,23,42,0.03); height:100%;">
        <div style="font-size:2rem; margin-bottom:12px;">🤖</div>
        <h3 style="color:#0F172A; font-size:1.25rem; font-weight:700; margin-bottom:8px;">Powered by Google Gemini</h3>
        <p style="color:#475569; font-size:14px; line-height:1.65; margin:0;">
            We leverage Google's state-of-the-art Gemini AI model to perform deep semantic gap analysis,
            generate custom curriculum modules aligned with modern IT standards, and formulate targeted remediation notes
            based on real test case performance.
        </p>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

# ── Values Grid ───────────────────────────────────────────────────────────────
st.markdown("""
<div style="font-size:1.2rem; font-weight:700; color:#0F172A; margin-bottom:16px;">
    Platform Guiding Principles
</div>
""", unsafe_allow_html=True)

v1, v2, v3, v4 = st.columns(4, gap="medium")

values = [
    ("🔮", "#2563EB", "Personalized", "Every curriculum roadmap dynamically adapts to verified skill levels and desired role."),
    ("⚡", "#4F46E5", "Real-Time Feedback", "Instant automated evaluation on MCQs and execution against unit test cases."),
    ("🔬", "#10B981", "Competency Verified", "Advance only upon achieving benchmark proficiency (&ge; 75%)."),
    ("📈", "#0EA5E9", "Measurable Growth", "Comprehensive student telemetry, topic-level radars, and streak analytics."),
]

for col, (icon, color, title, desc) in zip([v1, v2, v3, v4], values):
    with col:
        st.markdown(f"""
        <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:18px; box-shadow:0 1px 2px rgba(15,23,42,0.03); height:100%;">
            <div style="font-size:1.6rem; margin-bottom:8px;">{icon}</div>
            <div style="font-weight:700; color:{color}; font-size:14px; margin-bottom:6px;">{title}</div>
            <div style="color:#64748B; font-size:12.5px; line-height:1.5;">{desc}</div>
        </div>
        """, unsafe_allow_html=True)

st.markdown("---")

# ── Tech Stack ────────────────────────────────────────────────────────────────
st.markdown("""
<div style="font-size:1.2rem; font-weight:700; color:#0F172A; margin-bottom:16px;">
    Enterprise Technology Stack
</div>

<div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:14px; margin-bottom:28px;">

    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:18px; text-align:center;">
        <div style="font-size:1.6rem; margin-bottom:4px;">🐍</div>
        <div style="font-weight:700; color:#0F172A; font-size:14px;">Python 3.12</div>
        <div style="color:#64748B; font-size:12px; margin-top:2px;">Safe Sandboxed Execution</div>
    </div>

    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:18px; text-align:center;">
        <div style="font-size:1.6rem; margin-bottom:4px;">⚡</div>
        <div style="font-weight:700; color:#0F172A; font-size:14px;">Streamlit</div>
        <div style="color:#64748B; font-size:12px; margin-top:2px;">Responsive Web Interface</div>
    </div>

    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:18px; text-align:center;">
        <div style="font-size:1.6rem; margin-bottom:4px;">🤖</div>
        <div style="font-weight:700; color:#0F172A; font-size:14px;">Google Gemini API</div>
        <div style="color:#64748B; font-size:12px; margin-top:2px;">Roadmap &amp; Diagnostic AI</div>
    </div>

    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:18px; text-align:center;">
        <div style="font-size:1.6rem; margin-bottom:4px;">📊</div>
        <div style="font-weight:700; color:#0F172A; font-size:14px;">Plotly Interactive</div>
        <div style="color:#64748B; font-size:12px; margin-top:2px;">Radar &amp; Progress Charts</div>
    </div>

</div>
""", unsafe_allow_html=True)

show_footer()
