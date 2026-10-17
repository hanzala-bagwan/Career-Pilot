import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px


def show_learning_timeline(months):
    phases = []
    labels = []
    progress = []
    colors = []

    phase_names = ["Foundation", "Core Skills", "Advanced", "Projects", "Job Ready"]
    phase_colors = ["#2563EB", "#4F46E5", "#0EA5E9", "#10B981", "#8B5CF6"]

    for i in range(1, months + 1):
        pct = round((i / months) * 100, 1)
        phase_idx = min(int((i / months) * 5), 4)
        phases.append(phase_names[phase_idx])
        labels.append(f"Month {i}")
        progress.append(pct)
        colors.append(phase_colors[phase_idx])

    df = pd.DataFrame({
        "Month": list(range(1, months + 1)),
        "Label": labels,
        "Progress": progress,
        "Phase": phases,
    })

    fig = go.Figure()

    # Filled area
    fig.add_trace(go.Scatter(
        x=df["Month"],
        y=df["Progress"],
        fill='tozeroy',
        mode='lines+markers',
        name='Curriculum Progress',
        line=dict(color='#2563EB', width=3, shape='spline'),
        marker=dict(
            size=8,
            color=colors,
            line=dict(color='#FFFFFF', width=2)
        ),
        fillcolor='rgba(37, 99, 235, 0.08)',
        hovertemplate=(
            '<b>%{customdata[0]}</b><br>'
            'Progress: %{y:.0f}%<br>'
            'Phase: %{customdata[1]}<extra></extra>'
        ),
        customdata=list(zip(df["Label"], df["Phase"]))
    ))

    # Milestone markers
    for i, row in df.drop_duplicates('Phase').iterrows():
        fig.add_vline(
            x=row['Month'],
            line_dash="dot",
            line_color="#CBD5E1",
            line_width=1
        )

    fig.update_layout(
        template="plotly_white",
        paper_bgcolor='#FFFFFF',
        plot_bgcolor='#FFFFFF',
        title=dict(
            text='Curriculum Completion Timeline',
            font=dict(family='Plus Jakarta Sans', size=16, color='#0F172A'),
            x=0.01
        ),
        xaxis=dict(
            title='Month',
            title_font=dict(color='#64748B', size=12),
            tickfont=dict(color='#64748B', size=12),
            gridcolor='#F1F5F9',
            zeroline=False,
            showline=False,
        ),
        yaxis=dict(
            title='Completion %',
            title_font=dict(color='#64748B', size=12),
            tickfont=dict(color='#64748B', size=12),
            gridcolor='#F1F5F9',
            zeroline=False,
            showline=False,
            range=[0, 108],
            ticksuffix='%',
        ),
        margin=dict(l=16, r=16, t=48, b=16),
        hovermode='x unified',
        hoverlabel=dict(
            bgcolor='#FFFFFF',
            bordercolor='#2563EB',
            font=dict(color='#0F172A', size=13)
        ),
        showlegend=False,
        height=320,
    )

    st.plotly_chart(fig, use_container_width=True)

    # Phase breakdown badges in light SaaS styling
    st.markdown("""
<div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:6px; margin-bottom:12px;">
    <span class="badge-base badge-primary">
        1. Foundation
    </span>
    <span class="badge-base" style="background:#EEF2FF; border:1px solid #C7D2FE; color:#4F46E5;">
        2. Core Skills
    </span>
    <span class="badge-base" style="background:#F0F9FF; border:1px solid #BAE6FD; color:#0284C7;">
        3. Advanced
    </span>
    <span class="badge-base badge-success">
        4. Portfolio Projects
    </span>
    <span class="badge-base" style="background:#F5F3FF; border:1px solid #DDD6FE; color:#7C3AED;">
        5. Industry Ready
    </span>
</div>
""", unsafe_allow_html=True)