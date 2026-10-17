import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime

st.set_page_config(
    page_title="Student Dashboard — CareerPilot AI",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)


def load_css():
    with open("styles/style.css", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


load_css()

from components.sidebar import show_sidebar
from components.footer import show_footer
from utils.progress_manager import (
    load_progress,
    calculate_overall_progress,
    save_progress
)
from components.assessment_component import render_assessment_interface

show_sidebar()

# ── Fetch Telemetry & Student Data ────────────────────────────────────────────
data = load_progress()
stats = calculate_overall_progress()

student_name = stats.get("student_name", "Alex Morgan")
target_role = stats.get("target_role", "AI Engineer")
learning_objective = stats.get("learning_objective", f"Master {target_role} Skill Stack")
progress_pct = stats.get("percentage", 0.0)
streak_days = stats.get("learning_streak_days", 5)
paths_enrolled = stats.get("total_paths_enrolled", 2)
completed_cnt = stats.get("completed", 0)
total_cnt = stats.get("total", 0)
remaining_cnt = stats.get("remaining", 0)
pending_count = stats.get("pending_assessments_count", 0)
avg_score = stats.get("assessment_average", 0.0)
recommended_act = stats.get("recommended_next_activity", {})
modules = data.get("modules", [])
recent_subjects = data.get("recently_accessed_subjects", [])
history = data.get("assessment_history", [])

# ── Breadcrumb Navigation ─────────────────────────────────────────────────────
st.markdown("""
<div class="breadcrumb-nav">
    <a href="/app" target="_self">CareerPilot AI</a>
    <span class="breadcrumb-separator">/</span>
    <span style="color: #64748B;">Workspace</span>
    <span class="breadcrumb-separator">/</span>
    <span style="color: #0F172A; font-weight: 600;">Student Dashboard</span>
</div>
""", unsafe_allow_html=True)

# ── Welcome & Objective Header ────────────────────────────────────────────────
today_str = datetime.now().strftime("%A, %B %d, %Y")

st.markdown(f"""
<div class="page-header" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:24px 28px; box-shadow:0 1px 3px rgba(15,23,42,0.05); margin-bottom:24px;">
    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <span class="badge-base badge-primary">Student Workspace</span>
                <span style="color:#64748B; font-size:13px; font-weight:500;">{today_str}</span>
            </div>
            <h1 style="font-size:2rem; font-weight:800; color:#0F172A; margin:0 0 6px 0; letter-spacing:-0.02em;">
                Welcome back, {student_name} 👋
            </h1>
            <p style="color:#475569; font-size:14.5px; margin:0; line-height:1.5;">
                Goal: <strong style="color:#0F172A;">{target_role}</strong> &nbsp;•&nbsp;
                <span style="color:#64748B;">{learning_objective}</span>
            </p>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
            <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:8px 14px; text-align:center;">
                <div style="font-size:11px; font-weight:700; color:#1D4ED8; text-transform:uppercase;">Learning Streak</div>
                <div style="font-size:1.25rem; font-weight:800; color:#2563EB;">🔥 {streak_days} Days</div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:8px 14px; text-align:center;">
                <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;">Enrolled Paths</div>
                <div style="font-size:1.25rem; font-weight:800; color:#0F172A;">📚 {paths_enrolled}</div>
            </div>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# ── Recommended Next Activity Banner ──────────────────────────────────────────
rec_title = recommended_act.get("title", "Continue Your Learning Path")
rec_desc = recommended_act.get("description", "Advance to your next milestone.")
rec_btn_label = recommended_act.get("cta_label", "Get Started")
rec_mod_id = recommended_act.get("module_id", "mod_1")

st.markdown(f"""
<div style="background: linear-gradient(90deg, #EFF6FF 0%, #FFFFFF 100%);
            border: 1px solid #BFDBFE; border-left: 5px solid #2563EB;
            border-radius: 12px; padding: 18px 22px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(15,23,42,0.04);">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <span style="font-size:11px; font-weight:700; color:#2563EB; text-transform:uppercase; letter-spacing:0.06em;">
                    ⚡ Recommended Next Activity
                </span>
                <span class="badge-base badge-primary" style="font-size:11px; padding:2px 8px;">High Priority</span>
            </div>
            <h3 style="font-size:1.15rem; font-weight:700; color:#0F172A; margin:0 0 4px 0;">{rec_title}</h3>
            <p style="color:#475569; font-size:13.5px; margin:0; line-height:1.5;">{rec_desc}</p>
        </div>
        <div>
            <span style="background:#2563EB; color:#FFFFFF; font-size:13px; font-weight:600; padding:8px 18px; border-radius:8px; display:inline-block;">
                {rec_btn_label} ↓
            </span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

# ── Primary SaaS KPI Grid ─────────────────────────────────────────────────────
c1, c2, c3, c4, c5 = st.columns(5, gap="medium")

with c1:
    st.markdown(f"""
    <div class="stat-card">
        <div>
            <div class="stat-label">Overall Progress</div>
            <div class="stat-number" style="color:#2563EB;">{progress_pct}%</div>
        </div>
        <div class="stat-subtext">{completed_cnt} of {total_cnt} Modules Cleared</div>
    </div>
    """, unsafe_allow_html=True)

with c2:
    st.markdown(f"""
    <div class="stat-card">
        <div>
            <div class="stat-label">Completed Modules</div>
            <div class="stat-number" style="color:#10B981;">{completed_cnt}</div>
        </div>
        <div class="stat-subtext">{remaining_cnt} Modules Remaining</div>
    </div>
    """, unsafe_allow_html=True)

with c3:
    st.markdown(f"""
    <div class="stat-card">
        <div>
            <div class="stat-label">Pending Assessments</div>
            <div class="stat-number" style="color:{'#F59E0B' if pending_count > 0 else '#64748B'};">{pending_count}</div>
        </div>
        <div class="stat-subtext">Awaiting Evaluation</div>
    </div>
    """, unsafe_allow_html=True)

with c4:
    score_clr = "#10B981" if avg_score >= 75 else ("#F59E0B" if avg_score >= 50 else "#EF4444")
    st.markdown(f"""
    <div class="stat-card">
        <div>
            <div class="stat-label">Assessment Average</div>
            <div class="stat-number" style="color:{score_clr};">{avg_score if avg_score > 0 else 'N/A'}{'%' if avg_score > 0 else ''}</div>
        </div>
        <div class="stat-subtext">{len(history)} Tests Recorded</div>
    </div>
    """, unsafe_allow_html=True)

with c5:
    st.markdown(f"""
    <div class="stat-card">
        <div>
            <div class="stat-label">Active Goal Track</div>
            <div class="stat-number" style="font-size:1.3rem; color:#0F172A; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                {target_role}
            </div>
        </div>
        <div class="stat-subtext">6-Month Curriculum</div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<div style='height: 12px;'></div>", unsafe_allow_html=True)
st.progress(progress_pct / 100.0)

st.markdown("---")

# ── Progress Chart & Recently Accessed Subjects ───────────────────────────────
col_chart_area, col_recent = st.columns([1.3, 1], gap="large")

with col_chart_area:
    st.markdown("""
    <div style="font-size:1.15rem; font-weight:700; color:#0F172A; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
        <span>📈 Learning Progress &amp; Assessment Performance Over Time</span>
    </div>
    """, unsafe_allow_html=True)

    progress_history = data.get("progress_history", [
        {"label": "Week 1", "date": "Oct 1", "progress": 10, "score": 75},
        {"label": "Week 2", "date": "Oct 5", "progress": 25, "score": 82},
        {"label": "Week 3", "date": "Oct 10", "progress": 45, "score": 85},
        {"label": "Current", "date": "Oct 16", "progress": progress_pct, "score": avg_score or 85}
    ])

    df_hist = pd.DataFrame(progress_history)

    fig = go.Figure()

    # Progress Area
    fig.add_trace(go.Scatter(
        x=df_hist["label"],
        y=df_hist["progress"],
        mode='lines+markers',
        name='Progress %',
        line=dict(color='#2563EB', width=3, shape='spline'),
        fill='tozeroy',
        fillcolor='rgba(37, 99, 235, 0.08)',
        marker=dict(size=8, color='#2563EB', line=dict(color='#FFFFFF', width=2))
    ))

    # Assessment Score Line
    if "score" in df_hist.columns:
        fig.add_trace(go.Scatter(
            x=df_hist["label"],
            y=df_hist["score"],
            mode='lines+markers',
            name='Test Score %',
            line=dict(color='#10B981', width=2, dash='dot'),
            marker=dict(size=6, color='#10B981')
        ))

    fig.update_layout(
        template="plotly_white",
        paper_bgcolor='#FFFFFF',
        plot_bgcolor='#FFFFFF',
        xaxis=dict(
            title="",
            gridcolor='#F1F5F9',
            tickfont=dict(color='#64748B', size=12)
        ),
        yaxis=dict(
            title="Percentage (%)",
            title_font=dict(color='#64748B', size=12),
            gridcolor='#F1F5F9',
            range=[0, 105],
            ticksuffix="%",
            tickfont=dict(color='#64748B', size=12)
        ),
        margin=dict(l=16, r=16, t=20, b=16),
        height=270,
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1,
            font=dict(size=11, color='#64748B')
        ),
        hovermode="x unified"
    )

    st.plotly_chart(fig, use_container_width=True)

with col_recent:
    st.markdown("""
    <div style="font-size:1.15rem; font-weight:700; color:#0F172A; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
        <span>📖 Recently Accessed Subjects</span>
    </div>
    """, unsafe_allow_html=True)

    if recent_subjects:
        for subj in recent_subjects[:3]:
            st_badge = "badge-success" if subj.get("status") == "Completed" else ("badge-primary" if subj.get("status") == "In Progress" else "badge-neutral")
            st.markdown(f"""
            <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:12px 16px; margin-bottom:10px; box-shadow:0 1px 2px rgba(15,23,42,0.03);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
                    <div>
                        <div style="color:#0F172A; font-weight:600; font-size:13.5px;">{subj.get('name')}</div>
                        <div style="color:#64748B; font-size:11.5px;">{subj.get('category', 'Technical Track')} • {subj.get('last_accessed', 'Recently')}</div>
                    </div>
                    <span class="badge-base {st_badge}" style="font-size:10.5px; padding:2px 8px;">{subj.get('status')}</span>
                </div>
                <div style="margin-top:6px;">
                    <div style="background:#F1F5F9; border-radius:999px; height:5px; width:100%; overflow:hidden;">
                        <div style="background:#2563EB; height:100%; width:{subj.get('progress_pct', 0)}%;"></div>
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.info("No recently accessed subjects. Begin your modules below.")

st.markdown("---")

# ── Upcoming or Unlocked Learning Milestones Flightpath ────────────────────────
st.markdown("""
<div style="font-size:1.25rem; font-weight:700; color:#0F172A; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between;">
    <span>🗺️ Career Goal Learning Milestones</span>
    <span style="font-size:12.5px; color:#64748B; font-weight:500;">Sequential progression with automated assessment gates</span>
</div>
""", unsafe_allow_html=True)

cols = st.columns(len(modules) if modules else 1, gap="small")

for idx, (col, mod) in enumerate(zip(cols, modules), 1):
    status = mod.get("status", "locked")
    mod_id = mod.get("id")
    score_val = mod.get("score")

    if status == "completed":
        card_class = "is-completed"
        badge_html = '<span class="badge-base badge-success">Passed ✓</span>'
        icon = "✅"
    elif status == "in_progress":
        card_class = "is-active"
        badge_html = '<span class="badge-base badge-primary">Current ⚡</span>'
        icon = "🚀"
    elif status == "needs_revision":
        card_class = "is-revision"
        badge_html = '<span class="badge-base badge-warning">Needs Review ⚠️</span>'
        icon = "🔄"
    else:
        card_class = "is-locked"
        badge_html = '<span class="badge-base badge-neutral">Locked 🔒</span>'
        icon = "🔒"

    with col:
        st.markdown(f"""
        <div class="milestone-node {card_class}">
            <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:1.15rem;">{icon}</span>
                    {badge_html}
                </div>
                <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;">Milestone {idx}</div>
                <div style="color:#0F172A; font-weight:700; font-size:13.5px; line-height:1.4; margin-top:2px;">
                    {mod['name']}
                </div>
            </div>
            <div style="margin-top:12px; border-top:1px solid #F1F5F9; padding-top:8px;">
                <div style="font-size:11.5px; color:#64748B;">
                    {f'Score: <strong style=\"color:#0F172A;\">{score_val}%</strong>' if score_val is not None else 'Assessment Pending'}
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)

st.markdown("---")

# ── Skills Mastered vs. Requiring Improvement + Competency Radar ───────────────
col_skills_cards, col_radar = st.columns([1.1, 1], gap="large")

with col_skills_cards:
    st.markdown("""
    <div style="font-size:1.15rem; font-weight:700; color:#0F172A; margin-bottom:14px;">
        🎯 Skills Inventory &amp; Competency Tracking
    </div>
    """, unsafe_allow_html=True)

    mastered = data.get("skills_mastered", [])
    to_improve = data.get("skills_to_improve", [])

    st.markdown("""
    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; margin-bottom:14px; box-shadow:0 1px 2px rgba(15,23,42,0.03);">
        <div style="font-size:12px; font-weight:700; color:#065F46; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10B981;"></span>
            Skills Mastered (Score &ge; 75%)
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
    """ + "".join([
        f'<span class="badge-base badge-success">✓ {s}</span>'
        for s in mastered
    ]) + ("<span style='color:#64748B; font-size:12.5px;'>No mastered skills recorded yet.</span>" if not mastered else "") +
    """
        </div>
    </div>

    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; box-shadow:0 1px 2px rgba(15,23,42,0.03);">
        <div style="font-size:12px; font-weight:700; color:#92400E; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#F59E0B;"></span>
            Skills Requiring Practice &amp; Revision (&lt; 75%)
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
    """ + "".join([
        f'<span class="badge-base badge-warning">⚠ {s}</span>'
        for s in to_improve
    ]) + ("<span style='color:#64748B; font-size:12.5px;'>No skills flagged for improvement! Great job!</span>" if not to_improve else "") +
    """
        </div>
    </div>
    """, unsafe_allow_html=True)

with col_radar:
    st.markdown("""
    <div style="font-size:1.15rem; font-weight:700; color:#0F172A; margin-bottom:14px;">
        📊 Topic-Wise Competency Radar
    </div>
    """, unsafe_allow_html=True)

    topic_scores = data.get("topic_scores", {})
    if topic_scores:
        topics_list = list(topic_scores.keys())
        scores_list = [topic_scores[t] for t in topics_list]

        fig_radar = go.Figure()
        fig_radar.add_trace(go.Scatterpolar(
            r=scores_list + [scores_list[0]],
            theta=topics_list + [topics_list[0]],
            fill='toself',
            fillcolor='rgba(37, 99, 235, 0.12)',
            line=dict(color='#2563EB', width=2),
            marker=dict(color='#4F46E5', size=6)
        ))

        fig_radar.update_layout(
            polar=dict(
                radialaxis=dict(
                    visible=True,
                    range=[0, 100],
                    gridcolor='#E2E8F0',
                    tickfont=dict(color='#64748B', size=10)
                ),
                angularaxis=dict(
                    gridcolor='#E2E8F0',
                    tickfont=dict(color='#0F172A', size=11, family='Inter')
                ),
                bgcolor='#FFFFFF'
            ),
            paper_bgcolor='#FFFFFF',
            plot_bgcolor='#FFFFFF',
            margin=dict(l=24, r=24, t=16, b=16),
            height=260,
            showlegend=False
        )

        st.plotly_chart(fig_radar, use_container_width=True)
    else:
        st.info("Take assessments to visualize your topic competency radar.")

st.markdown("---")

# ── Personalized Recommendations & Assessment History ────────────────────────
col_recs, col_hist = st.columns([1, 1], gap="large")

with col_recs:
    st.markdown("""
    <div style="font-size:1.15rem; font-weight:700; color:#0F172A; margin-bottom:12px;">
        💡 Personalized Learning Recommendations
    </div>
    """, unsafe_allow_html=True)

    recs = data.get("recommendations", [])
    if recs:
        for r in recs:
            st.markdown(f"""
            <div class="recommendation-card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span style="color:#1D4ED8; font-weight:700; font-size:14px;">Focused Topic: {r.get('topic')}</span>
                    <span class="badge-base badge-primary" style="font-size:10px;">Diagnostic</span>
                </div>
                <div style="color:#475569; font-size:13px; margin:4px 0 6px 0; line-height:1.5;">
                    <strong>Observation:</strong> {r.get('reason')}
                </div>
                <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:6px; padding:8px 12px; color:#2563EB; font-size:12.5px;">
                    <strong>Action Step:</strong> {r.get('action')}
                </div>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.info("No active recommendations. Complete your pending assessments to generate targeted study items.")

with col_hist:
    st.markdown("""
    <div style="font-size:1.15rem; font-weight:700; color:#0F172A; margin-bottom:12px;">
        🏆 Recent Assessment Results Log
    </div>
    """, unsafe_allow_html=True)

    if history:
        rows = []
        for h in history[:4]:
            st_text = h.get("status", "Pass")
            rows.append({
                "Date": h.get("timestamp", "").split(" ")[0] if " " in h.get("timestamp", "") else h.get("timestamp", ""),
                "Module": h.get("module_name", "Module Test"),
                "Score": f"{h.get('score', 0)}%",
                "Status": "Passed ✓" if st_text == "Pass" else ("Revision ⚠️" if st_text == "Needs Improvement" else "Failed ❌"),
                "MCQ": f"{h.get('mcq_score', 'N/A')}%",
                "Code": f"{h.get('coding_score', 'N/A')}%"
            })
        df_log = pd.DataFrame(rows)
        st.dataframe(df_log, use_container_width=True, hide_index=True)
    else:
        st.info("No assessment logs recorded yet.")

st.markdown("---")

# ── Embedded Assessment Workspace ─────────────────────────────────────────────
st.markdown("""
<div style="margin-top:12px; margin-bottom:14px;">
    <div style="font-size:1.25rem; font-weight:700; color:#0F172A;">
        📝 Central Assessment Testing Lab
    </div>
    <p style="color:#64748B; font-size:14px; margin:4px 0 16px 0;">
        Launch and complete periodic module tests. All multiple choice questions are evaluated automatically,
        and coding challenges are verified against real test suites.
    </p>
</div>
""", unsafe_allow_html=True)

eligible_mods = [m for m in modules if m.get("status") in ["in_progress", "needs_revision", "completed"]]
if not eligible_mods:
    eligible_mods = modules[:1]

mod_map = {f"{m['name']}  ({m['status'].replace('_', ' ').title()})": m["id"] for m in eligible_mods}

c_sel, _ = st.columns([2, 1])
with c_sel:
    selected_option = st.selectbox("Select module to test:", list(mod_map.keys()), key="dash_mod_select")
    chosen_id = mod_map[selected_option]

render_assessment_interface(chosen_id)

show_footer()
