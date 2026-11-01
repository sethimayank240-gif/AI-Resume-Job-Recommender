import re


SKILLS = [
    "python",
    "java",
    "c++",
    "javascript",
    "html",
    "css",
    "react",
    "node.js",
    "express.js",
    "flask",
    "fastapi",
    "mongodb",
    "sql",
    "mysql",
    "postgresql",
    "pandas",
    "numpy",
    "scikit-learn",
    "machine learning",
    "deep learning",
    "natural language processing",
    "nlp",
    "tensorflow",
    "pytorch",
    "sentence transformers",
    "git",
    "github",
    "rest api",
    "rest apis",
    "data analysis",
    "data preprocessing",
    "statistics",
    "streamlit",
]


def extract_skills(text: str) -> list[str]:
    """
    Extract technical skills from text using
    a predefined skill vocabulary.
    """

    text_lower = text.lower()

    found_skills = set()

    for skill in SKILLS:
        pattern = r"(?<!\w)" + re.escape(skill.lower()) + r"(?!\w)"

        if re.search(pattern, text_lower):
            found_skills.add(skill.lower())

    return sorted(found_skills)