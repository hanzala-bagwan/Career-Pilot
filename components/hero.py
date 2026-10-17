import streamlit as st


def show_hero():
    st.markdown("""
<div class="hero-saas">
    <div class="hero-pill-tag">✦ AI-Powered IT Learning &amp; Career Acceleration</div>
    <h1 class="hero-saas-title">
        Chart Your Path to a <span>High-Growth IT Career</span>
    </h1>
    <p class="hero-saas-desc">
        Select your existing technical competencies and target role. CareerPilot AI designs a
        structured, production-aligned learning roadmap, conducts automated periodic assessments,
        and provides personalized recommendations to accelerate your mastery.
    </p>
    <div class="hero-pills-row">
        <span class="hero-pill-item">📚 Modular Curriculum</span>
        <span class="hero-pill-item">💻 Live Code Challenges</span>
        <span class="hero-pill-item">⚡ Automated Evaluations</span>
        <span class="hero-pill-item">📊 Student Progress Telemetry</span>
        <span class="hero-pill-item">📄 PDF Export</span>
    </div>
</div>
""", unsafe_allow_html=True)