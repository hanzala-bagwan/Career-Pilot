import streamlit as st

st.set_page_config(
    page_title="How It Works — CareerPilot AI",
    page_icon="⚙️",
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
    <span style="color: #0F172A; font-weight: 600;">How It Works</span>
</div>
""", unsafe_allow_html=True)

# ── Header ────────────────────────────────────────────────────────────────────
st.markdown("""
<div class="page-header" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:28px 32px; box-shadow:0 1px 3px rgba(15,23,42,0.04); margin-bottom:28px;">
    <span class="badge-base badge-primary" style="margin-bottom:8px;">End-to-End Learning Engine</span>
    <h1 style="font-size:2.2rem; font-weight:800; color:#0F172A; margin:6px 0 8px 0; letter-spacing:-0.02em;">
        From Skill Gap to Industry Ready in 7 Stages
    </h1>
    <p style="color:#475569; font-size:15px; max-width:760px; line-height:1.6; margin:0;">
        CareerPilot AI unifies generative AI curriculum synthesis with automated skill verification and
        adaptive progression so students gain real, verifiable competencies.
    </p>
</div>
""", unsafe_allow_html=True)

# ── 7-Stage Workflow ──────────────────────────────────────────────────────────
steps = [
    {
        "num": "01",
        "icon": "🧠",
        "color": "#2563EB",
        "title": "Skill Inventory Input",
        "desc": (
            "Declare your baseline competencies across programming languages, frameworks, "
            "and developer tools. Our engine isolates exact prerequisite gaps."
        ),
        "tags": ["Python", "SQL", "JavaScript", "Cloud"]
    },
    {
        "num": "02",
        "icon": "🎯",
        "color": "#4F46E5",
        "title": "Select Target IT Role",
        "desc": (
            "Choose your target career path (AI Engineer, DevOps, Full Stack, Data Scientist). "
            "The curriculum automatically aligns with modern industry job descriptions."
        ),
        "tags": ["AI Engineer", "DevOps", "Full Stack", "Data Science"]
    },
    {
        "num": "03",
        "icon": "⏱️",
        "color": "#0EA5E9",
        "title": "Set Learning Commitment",
        "desc": (
            "Choose a timeline between 3 to 12 months. Gemini AI breaks down the curriculum "
            "into manageable monthly phases and milestones."
        ),
        "tags": ["3 Months", "6 Months", "9 Months", "12 Months"]
    },
    {
        "num": "04",
        "icon": "✨",
        "color": "#10B981",
        "title": "AI Roadmap Synthesis",
        "desc": (
            "Gemini AI synthesizes a personalized modular plan complete with course recommendations, "
            "portfolio project blueprints, and timeline visualizations."
        ),
        "tags": ["Curated Courses", "Projects", "Timeline", "PDF Export"]
    },
    {
        "num": "05",
        "icon": "📝",
        "color": "#2563EB",
        "title": "Periodic Module Assessments",
        "desc": (
            "Upon completing a module, take a periodic diagnostic test combining MCQs, "
            "architectural conceptual reviews, and live programming challenges."
        ),
        "tags": ["MCQs", "Architecture", "Code Challenges"]
    },
    {
        "num": "06",
        "icon": "⚡",
        "color": "#10B981",
        "title": "Automatic Code Evaluation",
        "desc": (
            "MCQs grade automatically and programming submissions run against real unit test suites. "
            "Performance is categorized as Pass (≥75%), Needs Improvement, or Fail."
        ),
        "tags": ["Safe Execution", "Test Suites", "Pass Benchmark 75%"]
    },
    {
        "num": "07",
        "icon": "📊",
        "color": "#4F46E5",
        "title": "Telemetry & Milestone Unlock",
        "desc": (
            "Passing unlocks the next sequential milestone on your Student Dashboard. "
            "Any weak topics trigger personalized revision guides and practice problems."
        ),
        "tags": ["Dashboard Updates", "Competency Radar", "Next Milestone Unlock"]
    },
]

c1, c2 = st.columns(2, gap="medium")

for i, step in enumerate(steps):
    col = c1 if i % 2 == 0 else c2
    with col:
        tag_html = "".join([
            f'<span class="badge-base badge-neutral" style="font-size:11px; margin-right:4px;">{t}</span>'
            for t in step["tags"]
        ])
        st.markdown(f"""
        <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px;
                    padding:20px; margin-bottom:16px; box-shadow:0 1px 2px rgba(15,23,42,0.03);">
            <div style="display:flex; align-items:flex-start; gap:14px;">
                <div style="min-width:44px; height:44px; background:#EFF6FF; border:1px solid #BFDBFE;
                            border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                    {step['icon']}
                </div>
                <div style="flex:1;">
                    <div style="font-size:11px; font-weight:700; color:{step['color']}; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:2px;">
                        Stage {step['num']}
                    </div>
                    <h3 style="font-size:1.1rem; font-weight:700; color:#0F172A; margin:0 0 6px 0;">{step['title']}</h3>
                    <p style="color:#475569; font-size:13.5px; line-height:1.55; margin-bottom:10px;">
                        {step['desc']}
                    </p>
                    <div style="display:flex; flex-wrap:wrap; gap:4px;">
                        {tag_html}
                    </div>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)

st.markdown("---")

# ── FAQ ───────────────────────────────────────────────────────────────────────
st.markdown("""
<div style="font-size:1.25rem; font-weight:700; color:#0F172A; margin-bottom:16px;">
    ❓ Frequently Asked Questions
</div>
""", unsafe_allow_html=True)

faqs = [
    ("How does the periodic assessment evaluation work?",
     "MCQs are scored instantly against verified keys. Programming challenges are executed in an isolated Python environment and evaluated against unit test cases, validating inputs, return values, and edge conditions."),
    ("What happens if I score below the 75% passing threshold?",
     "The system classifies your attempt as 'Needs Improvement' or 'Review Required', identifies the specific topics you missed, and generates personalized revision notes and practice exercises before allowing you to retake."),
    ("Can I switch my career goal or add new skills anytime?",
     "Yes! Generating a new career roadmap in the Roadmap Studio updates your target role and adapts the curriculum modules on your Student Dashboard."),
    ("Is my learning progress saved across sessions?",
     "Yes. All module unlock statuses, assessment history, competency scores, and streak data are persisted locally in student_progress.json.")
]

for q, a in faqs:
    with st.expander(f"  {q}"):
        st.markdown(f"<p style='color:#334155; line-height:1.65; margin:0;'>{a}</p>", unsafe_allow_html=True)

show_footer()
