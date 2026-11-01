from skill_extractor import extract_skills


def analyze_job_description(text: str) -> dict:
    """
    Extract required skills from a job description.
    """

    skills = extract_skills(text)

    return {
        "skills": skills,
        "skill_count": len(skills)
    }