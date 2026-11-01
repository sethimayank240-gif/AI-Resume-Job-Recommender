
def normalize_skill(skill: str) -> str:
    """Normalize skill names and common aliases before matching."""
    skill = str(skill).strip().lower()

    aliases = {
        "nlp": "natural language processing",
        "sklearn": "scikit-learn",
        "scikit learn": "scikit-learn",
        "rest apis": "rest api",
        "postgres": "postgresql",
        "js": "javascript",
        "node": "node.js",
        "machinelearning": "machine learning",
        "deep-learning": "deep learning",
        "dataanalysis": "data analysis",
        "datapreprocessing": "data preprocessing",
    }

    return aliases.get(skill, skill)


def calculate_skill_match(
    resume_skills: list[str],
    jd_skills: list[str]
) -> dict:
    """
    Compare resume skills with job-description skills.
    Return matched skills, missing skills and match percentage.
    """

    resume_set = {
        normalize_skill(skill)
        for skill in (resume_skills or [])
        if skill and str(skill).strip()
    }

    jd_set = {
        normalize_skill(skill)
        for skill in (jd_skills or [])
        if skill and str(skill).strip()
    }

    matched_skills = sorted(resume_set.intersection(jd_set))
    missing_skills = sorted(jd_set - resume_set)

    if not jd_set:
        skill_match_percentage = 0.0
    else:
        skill_match_percentage = (
            len(matched_skills) / len(jd_set)
        ) * 100

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "skill_match_percentage": round(
            skill_match_percentage, 2
        ),
        "overall_match_score": round(
            skill_match_percentage, 2
        )
    }
