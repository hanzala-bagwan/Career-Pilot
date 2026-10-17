import streamlit as st


def show_footer():
    st.markdown("""
<div class="footer-saas">
    <div class="footer-logo">🚀 CareerPilot AI</div>
    <div class="footer-tagline">Autonomous IT Career Guidance, Skill Verification &amp; Intelligent Learning Roadmaps</div>
    <div class="footer-links">
        <span class="footer-chip">🐍 Python 3.12</span>
        <span class="footer-chip">⚡ Streamlit</span>
        <span class="footer-chip">🤖 Google Gemini API</span>
        <span class="footer-chip">📊 Plotly Interactive</span>
        <span class="footer-chip">🔒 Secure Sandbox</span>
    </div>
    <div class="footer-copy">
        CareerPilot AI Enterprise Learning Platform &copy; 2026 &nbsp;•&nbsp; Built for Aspiring Engineers &amp; Tech Professionals
    </div>
</div>
""", unsafe_allow_html=True)