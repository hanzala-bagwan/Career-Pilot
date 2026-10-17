import streamlit as st

st.set_page_config(
    page_title="Periodic Assessments — CareerPilot AI",
    page_icon="📝",
    layout="wide",
    initial_sidebar_state="expanded"
)


def load_css():
    with open("styles/style.css", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


load_css()

from components.sidebar import show_sidebar
from components.footer import show_footer
from utils.progress_manager import load_progress
from components.assessment_component import render_assessment_interface

show_sidebar()

data = load_progress()
modules = data.get("modules", [])

# ── Breadcrumb Navigation ─────────────────────────────────────────────────────
st.markdown("""
<div class="breadcrumb-nav">
    <a href="/app" target="_self">CareerPilot AI</a>
    <span class="breadcrumb-separator">/</span>
    <span style="color: #64748B;">Workspace</span>
    <span class="breadcrumb-separator">/</span>
    <span style="color: #0F172A; font-weight: 600;">Periodic Assessments</span>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="page-header" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:22px 26px; box-shadow:0 1px 3px rgba(15,23,42,0.04); margin-bottom:24px;">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
            <span class="badge-base badge-primary" style="margin-bottom:6px;">Automated Skill Verification Engine</span>
            <h1 style="font-size:1.85rem; font-weight:800; color:#0F172A; margin:4px 0 6px 0;">
                Periodic Module Assessments
            </h1>
            <p style="color:#475569; font-size:14px; margin:0; line-height:1.5; max-width:720px;">
                Validate your knowledge at each milestone before unlocking the next module. Assessments feature
                multiple choice questions, conceptual architectural diagnostics, and live code challenges evaluated against test suites.
            </p>
        </div>
        <div style="display:flex; gap:8px;">
            <a href="/Dashboard" target="_self" style="text-decoration:none;">
                <span class="badge-base badge-neutral" style="padding:6px 14px; font-size:12px; cursor:pointer;">
                    📊 View Dashboard
                </span>
            </a>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# Module Selector Filter
available_modules = [m for m in modules if m.get("status") != "locked"]
if not available_modules:
    available_modules = modules[:1]

cols = st.columns([2, 1])
with cols[0]:
    mod_mapping = {f"{m['name']}  [{m['status'].replace('_', ' ').upper()}]": m["id"] for m in available_modules}
    selected_name = st.selectbox("🎯 Select Active Module Assessment:", list(mod_mapping.keys()))
    selected_id = mod_mapping[selected_name]

render_assessment_interface(selected_id)

show_footer()
