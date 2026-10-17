import streamlit as st


def show_sidebar():
    with st.sidebar:
        st.markdown("""
<div style="padding: 12px 0 20px;">
    <div style="font-family:'Plus Jakarta Sans',sans-serif; font-size:20px; font-weight:800; color:#0F172A; display:flex; align-items:center; gap:8px; margin-bottom:2px;">
        <span style="color:#2563EB;">🚀</span> CareerPilot AI
    </div>
    <div style="color:#64748B; font-size:11.5px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">
        IT Learning &amp; Career Engine
    </div>
</div>
""", unsafe_allow_html=True)

        st.markdown("---")

        st.markdown("""
<div style="margin-bottom:10px;">
    <div style="color:#64748B; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px;">
        Main Navigation
    </div>
</div>
""", unsafe_allow_html=True)
        st.page_link("app.py", label="Roadmap Studio", icon="🚀")
        st.page_link("pages/1_Dashboard.py", label="Student Workspace", icon="📊")
        st.page_link("pages/4_Assessments.py", label="Assessment Center", icon="📝")
        st.page_link("pages/2_About.py", label="About Platform", icon="ℹ️")
        st.page_link("pages/3_How_It_Works.py", label="How It Works", icon="⚙️")

        st.markdown("---")

        st.markdown("""
<div style="margin-bottom:12px;">
    <div style="color:#64748B; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px;">
        Verified Capabilities
    </div>
    <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px; color:#334155; font-size:13px; font-weight:500;">
            <span style="color:#2563EB;">✓</span> Modular IT Curriculums
        </div>
        <div style="display:flex; align-items:center; gap:8px; color:#334155; font-size:13px; font-weight:500;">
            <span style="color:#10B981;">✓</span> Periodic Assessments
        </div>
        <div style="display:flex; align-items:center; gap:8px; color:#334155; font-size:13px; font-weight:500;">
            <span style="color:#2563EB;">✓</span> Automated Test Suites
        </div>
        <div style="display:flex; align-items:center; gap:8px; color:#334155; font-size:13px; font-weight:500;">
            <span style="color:#4F46E5;">✓</span> Student Progress Telemetry
        </div>
        <div style="display:flex; align-items:center; gap:8px; color:#334155; font-size:13px; font-weight:500;">
            <span style="color:#F59E0B;">✓</span> Targeted Remediation
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

        st.markdown("---")

        st.markdown("""
<div style="margin-bottom:12px;">
    <div style="color:#64748B; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px;">
        Technology
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:6px;">
        <span class="badge-base badge-neutral" style="font-size:11px;">Python 3.12</span>
        <span class="badge-base badge-neutral" style="font-size:11px;">Streamlit</span>
        <span class="badge-base badge-primary" style="font-size:11px;">Gemini AI</span>
        <span class="badge-base badge-neutral" style="font-size:11px;">Plotly</span>
    </div>
</div>
""", unsafe_allow_html=True)

        st.markdown("---")

        st.markdown("""
<div style="color:#94A3B8; font-size:11.5px; text-align:center; padding: 4px 0;">
    CareerPilot AI &copy; 2026 • Enterprise Learning
</div>
""", unsafe_allow_html=True)