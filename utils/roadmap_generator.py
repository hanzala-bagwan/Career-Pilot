import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError(
        "GEMINI_API_KEY is missing. Add it to your local .env file or Streamlit secrets."
    )

# Configure Gemini
client = genai.Client(api_key=api_key)


def generate_roadmap(skills, role, months):

    prompt = f"""
You are an expert career mentor and senior software engineer.

Create a professional {months}-month roadmap to become a {role}.

Current skills:
{skills}

Include:

# Month-by-Month Learning Plan
Give clear goals for each month.

# Courses
Recommend free and paid resources.

# Projects
Suggest real-world portfolio projects.

# Technologies
Mention frameworks, tools, and platforms.

# Interview Preparation
Explain what to practice.

# Portfolio Tips
Tell the user what to showcase on GitHub and LinkedIn.

Format everything beautifully in Markdown with headings, bullet points, and emojis.
"""

    models_to_try = ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"]
    last_error = None
    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt
            )
            if response and response.text:
                return response.text
        except Exception as e:
            last_error = e
            continue

    return f"AI service error: {str(last_error)}"