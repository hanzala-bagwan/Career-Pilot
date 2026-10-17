import streamlit as st


def show_card(title, content):

    st.markdown("""
<div style="display:flex;gap:20px;margin-bottom:40px;">

<div style="
background:white;
padding:20px;
border-radius:20px;
box-shadow:0 10px 25px rgba(0,0,0,0.08);
flex:1;
text-align:center;
">

<h2>50+</h2>
<p>Career Paths</p>

</div>

<div style="
background:white;
padding:20px;
border-radius:20px;
box-shadow:0 10px 25px rgba(0,0,0,0.08);
flex:1;
text-align:center;
">

<h2>500+</h2>
<p>Projects Suggested</p>

</div>

<div style="
background:white;
padding:20px;
border-radius:20px;
box-shadow:0 10px 25px rgba(0,0,0,0.08);
flex:1;
text-align:center;
">

<h2>Gemini 2.5</h2>
<p>AI Powered</p>

</div>

</div>
""", unsafe_allow_html=True)