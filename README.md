# 🚀 CareerPilot AI

An AI-powered career guidance platform that generates personalized learning roadmaps, project recommendations, learning timelines, and downloadable PDF reports to help users achieve their dream careers.

🌐 **Live Demo:** `https://khutejakhancareerpilot-ai.streamlit.app/`

📂 **GitHub Repository:** `https://github.com/khutejakhan/CareerPilot-AI`

---

## ✨ Features

* 🤖 AI-generated personalized career roadmaps
* 📚 Recommended courses and learning resources
* 💻 Real-world project suggestions
* 📈 Interactive learning timeline visualization
* 📄 Download career plans as PDF files
* 🎨 Modern and responsive user interface
* 🔒 Secure API key management using environment variables

---

## 🖼️ Screenshots

### Home Page

![Home](C:\Users\M M Auto\Desktop\CareerPilot-AI\assets\screenshots\page1-careerpilotai.jpg)

### Generated Roadmap

![Roadmap](C:\Users\M M Auto\Desktop\CareerPilot-AI\assets\screenshots\page3-careerpilotai.jpg)

### Learning Timeline

![Timeline](C:\Users\M M Auto\Desktop\CareerPilot-AI\assets\screenshots\page4-careerpilotai.jpg)

---

## 🛠️ Tech Stack

| Category               | Technologies              |
| ---------------------- | ------------------------- |
| Frontend               | Streamlit                 |
| Backend                | Python                    |
| AI Model               | Google Gemini API         |
| Data Visualization     | Plotly                    |
| PDF Generation         | FPDF2                     |
| Environment Management | Python-dotenv             |
| Version Control        | Git & GitHub              |
| Deployment             | Streamlit Community Cloud |

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/khutejakhan/CareerPilot-AI.git
cd CareerPilot-AI
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it:

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
streamlit run app.py
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** Never commit your API key to GitHub.

---

## 📂 Project Structure

```text
CareerPilot-AI/
│
├── assets/
│   └── screenshots/
│
├── components/
│   ├── charts.py
│   ├── footer.py
│   ├── hero.py
│   ├── input_form.py
│   └── sidebar.py
│
├── styles/
│   └── style.css
│
├── utils/
│   ├── pdf_generator.py
│   └── roadmap_generator.py
│
├── app.py
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

---

## 🚀 Deployment

This project is deployed using **Streamlit Community Cloud**.

To deploy:

1. Push the repository to GitHub.
2. Connect the repository to Streamlit Cloud.
3. Add the following secret:

```toml
GEMINI_API_KEY = "YOUR_API_KEY"
```

4. Deploy the application.

---

## 🎯 Future Improvements

* User authentication and profiles
* Save generated roadmaps
* Multiple AI model support
* Skill-gap analysis
* Resume upload and personalized recommendations
* Dark mode support
* Career trend analytics dashboard

---

## 💡 Motivation

CareerPilot AI was built to help students and aspiring professionals transform their existing skills into structured learning plans, practical projects, and actionable career roadmaps using the power of Generative AI.

---

## 👨‍💻 Author

**Khuteja Khan**

* GitHub: `https://github.com/khutejakhan/CareerPilot-AI`
* LinkedIn: `www.linkedin.com/in/khuteja-khan`

---

## ⭐ Support

If you found this project useful, please consider giving it a star on GitHub!

It helps others discover the project and motivates future improvements.

---

## 📜 License

This project is licensed under the MIT License.
