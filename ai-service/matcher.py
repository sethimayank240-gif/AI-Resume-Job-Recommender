
import re


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

    # Initial ATS-style score based on skill coverage.
    # This is not a complete employer ATS evaluation.
    ats_score = round(skill_match_percentage, 2)

    if not jd_set:
        score_category = "Insufficient Job Description Skills"
    elif ats_score >= 80:
        score_category = "Strong Match"
    elif ats_score >= 60:
        score_category = "Good Match"
    elif ats_score >= 40:
        score_category = "Moderate Match"
    else:
        score_category = "Needs Improvement"

    return {
        # Existing fields retained for compatibility
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "skill_match_percentage": round(
            skill_match_percentage, 2
        ),
        "overall_match_score": ats_score,

        # New ATS-related fields
        "ats_score": ats_score,
        "score_category": score_category,
        "total_required_skills": len(jd_set),
        "matched_skills_count": len(matched_skills),
        "missing_skills_count": len(missing_skills),
        "ats_suggestions": [
            f"Review the requirement for '{skill}' and add it only if you genuinely have that skill."
            for skill in missing_skills
        ],
    }


def calculate_resume_quality(resume_text: str) -> dict:
    """
    Provide basic resume-text checks.
    These checks are separate from the job-specific ATS match score.
    """

    text = str(resume_text or "").strip()

    if not text:
        return {
            "resume_quality_score": 0,
            "resume_quality_checks": [
                "No resume text was extracted. Upload a readable resume."
            ],
        }

    checks = []
    score = 100

    sections = {
        "education": r"\beducation\b",
        "experience": r"\b(experience|employment|internship)\b",
        "skills": r"\bskills\b",
        "projects": r"\bprojects\b",
    }

    for section, pattern in sections.items():
        if not re.search(pattern, text, re.IGNORECASE):
            score -= 15
            checks.append(f"Consider adding a clearly labelled {section} section.")

    if len(text.split()) < 100:
        score -= 10
        checks.append(
            "The extracted resume text is short. Check whether all resume content was parsed."
        )

    if not checks:
        checks.append("The basic text and section checks passed.")

    return {
        "resume_quality_score": max(0, score),
        "resume_quality_checks": checks,
    }
