def build_prompt(skills, role, months):

    return f"""
You are a world-class career mentor.

A student currently knows:

{', '.join(skills)}

Their target role is:

{role}

They want to achieve this in {months} months.

Generate:

1. Skill gap analysis
2. Month-by-month learning roadmap
3. Best free courses
4. 5 portfolio projects
5. Interview preparation strategy
6. Salary expectations
7. Daily study plan

Format beautifully using markdown.
"""