
import re


def _clean_lines(text: str) -> list[str]:
    return [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]


def _has_any(text: str, keywords: list[str]) -> bool:
    return any(keyword in text for keyword in keywords)


def _normalize_heading(text: str) -> str:
    """Normalize headings so symbols such as &, :, and - do not
    prevent section recognition.
    """
    normalized = text.lower().strip()
    normalized = normalized.replace("&", " and ")
    normalized = re.sub(r"[^a-z0-9 ]", " ", normalized)
    return re.sub(r"\s+", " ", normalized).strip()


def _extract_section(text: str, section_names: list[str]) -> str:
    """Extract text between a recognized heading and the next heading."""

    headings = [
        "profile summary",
        "professional summary",
        "summary",
        "objective",
        "education",
        "experience",
        "work experience",
        "internship",
        "projects",
        "technical skills",
        "skills",
        "certifications",
        "certifications & achievements",
        "certifications and achievements",
        "achievements",
        "awards"
    ]

    normalized_headings = {
        _normalize_heading(heading)
        for heading in headings
    }

    target_sections = {
        _normalize_heading(section)
        for section in section_names
    }

    lines = _clean_lines(text)
    collected = []
    capturing = False

    for line in lines:
        normalized = _normalize_heading(line)

        if not capturing:
            if normalized in target_sections:
                capturing = True
            continue

        if normalized in normalized_headings:
            break

        collected.append(line)

    return "\n".join(collected)


def calculate_resume_score(
    resume_text: str,
    extracted_skills: list[str]
) -> dict:
    """
    Calculate a rule-based resume score out of 100.

    This is an academic resume evaluation, not an official ATS score.
    """

    text = resume_text.lower()

    weights = {
        "skills": 25,
        "projects": 20,
        "education": 15,
        "experience": 15,
        "certifications": 10,
        "structure": 15
    }

    scores = {}

    # -------------------------------------------------
    # 1. SKILLS SCORE (25)
    # -------------------------------------------------

    unique_skills = {
        skill.strip().lower()
        for skill in extracted_skills
        if skill.strip()
    }

    scores["skills"] = min(
        len(unique_skills) * 2,
        weights["skills"]
    )

    # -------------------------------------------------
    # 2. PROJECTS SCORE (20)
    # -------------------------------------------------

    project_text = _extract_section(
        resume_text,
        ["projects"]
    )

    project_score = 0

    if project_text:
        project_score += 5

        project_lines = _clean_lines(project_text)

        project_entries = [
            line for line in project_lines
            if "|" in line or "—" in line or " - " in line
        ]

        project_score += min(len(project_entries) * 2, 6)

        action_keywords = [
            "developed", "built", "implemented",
            "designed", "created", "deployed",
            "integrated", "used", "trained",
            "achieved", "improved"
        ]

        action_count = sum(
            1 for keyword in action_keywords
            if keyword in project_text.lower()
        )

        project_score += min(action_count, 5)

        technology_keywords = [
            "python", "java", "c++", "react",
            "node.js", "fastapi", "flask",
            "machine learning", "deep learning",
            "sql", "mongodb", "docker",
            "scikit-learn", "tensorflow", "pytorch"
        ]

        technology_count = sum(
            1 for keyword in technology_keywords
            if keyword in project_text.lower()
        )

        project_score += min(technology_count, 4)

    scores["projects"] = min(
        project_score,
        weights["projects"]
    )

    # -------------------------------------------------
    # 3. EDUCATION SCORE (15)
    # -------------------------------------------------

    education_text = _extract_section(
        resume_text,
        ["education"]
    ).lower()

    education_score = 0

    if education_text:
        education_score += 5

        degree_keywords = [
            "b.tech", "btech", "bachelor",
            "master", "m.tech", "mba",
            "degree", "diploma", "phd"
        ]

        institution_keywords = [
            "university", "college", "institute",
            "school", "adgips"
        ]

        if _has_any(education_text, degree_keywords):
            education_score += 4

        if _has_any(education_text, institution_keywords):
            education_score += 3

        if re.search(r"\b(19|20)\d{2}\b", education_text):
            education_score += 1

        if _has_any(
            education_text,
            ["cgpa", "gpa", "percentage", "grade", "marks"]
        ):
            education_score += 2

    scores["education"] = min(
        education_score,
        weights["education"]
    )

    # -------------------------------------------------
    # 4. EXPERIENCE SCORE (15)
    # -------------------------------------------------

    experience_text = _extract_section(
        resume_text,
        ["experience", "work experience", "internship"]
    ).lower()

    experience_score = 0

    if experience_text:
        experience_score += 4

        role_keywords = [
            "intern", "internship", "developer",
            "engineer", "trainee", "worked",
            "employment", "professional"
        ]

        if _has_any(experience_text, role_keywords):
            experience_score += 3

        if re.search(r"\b(19|20)\d{2}\b", experience_text):
            experience_score += 2

        organisation_keywords = [
            "company", "solutions", "technologies",
            "infotech", "ibm", "organisation",
            "organization"
        ]

        if _has_any(experience_text, organisation_keywords):
            experience_score += 2

        action_keywords = [
            "developed", "built", "created",
            "implemented", "designed",
            "managed", "improved", "worked"
        ]

        action_count = sum(
            1 for keyword in action_keywords
            if keyword in experience_text
        )

        experience_score += min(action_count, 4)

    scores["experience"] = min(
        experience_score,
        weights["experience"]
    )

    # -------------------------------------------------
    # 5. CERTIFICATIONS SCORE (10)
    # -------------------------------------------------

    certification_text = _extract_section(
        resume_text,
        [
            "certifications",
            "certifications & achievements",
            "achievements",
            "awards"
        ]
    ).lower()

    certification_score = 0

    if certification_text:
        certification_score += 4

        certification_entries = [
            line for line in _clean_lines(certification_text)
            if (
                line.startswith(("•", "-", "*"))
                or "|" in line
            )
        ]

        certification_score += min(
            len(certification_entries),
            4
        )

        provider_keywords = [
            "ibm", "google", "microsoft",
            "internshala", "coursera",
            "udemy", "infosys", "prodigy"
        ]

        if _has_any(certification_text, provider_keywords):
            certification_score += 1

        if re.search(r"\b(19|20)\d{2}\b", certification_text):
            certification_score += 1

    scores["certifications"] = min(
        round(certification_score),
        weights["certifications"]
    )

    # -------------------------------------------------
    # 6. STRUCTURE SCORE (15)
    # -------------------------------------------------

    structure_score = 0

    if re.search(
        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
        resume_text
    ):
        structure_score += 3

    if re.search(r"\+?\d[\d\s-]{8,}\d", resume_text):
        structure_score += 2

    if _has_any(
        text,
        [
            "profile summary",
            "professional summary",
            "summary",
            "objective"
        ]
    ):
        structure_score += 2

    section_names = [
        "education",
        "experience",
        "projects",
        "technical skills",
        "certifications",
        "achievements"
    ]

    detected_sections = sum(
        1 for section in section_names
        if _extract_section(resume_text, [section])
    )

    structure_score += min(
        detected_sections * 1.5,
        8
    )

    scores["structure"] = min(
        round(structure_score),
        weights["structure"]
    )

    # -------------------------------------------------
    # TOTAL SCORE AND RATING
    # -------------------------------------------------

    overall_score = sum(scores.values())

    if overall_score >= 85:
        rating = "Excellent"
    elif overall_score >= 70:
        rating = "Very Good"
    elif overall_score >= 55:
        rating = "Good"
    elif overall_score >= 40:
        rating = "Average"
    else:
        rating = "Needs Improvement"

    # -------------------------------------------------
    # IMPROVEMENT SUGGESTIONS
    # -------------------------------------------------

    suggestion_messages = {
        "skills": "Add more relevant technical skills to your resume.",
        "projects": "Add more project details, technologies and implementation outcomes.",
        "education": "Provide complete education details, including degree, institution and academic performance.",
        "experience": "Add internship or work experience details with responsibilities and achievements.",
        "certifications": "Include relevant certifications, issuing organisations and completion dates.",
        "structure": "Improve resume structure and include important sections and contact information."
    }

    suggestions = []

    for category, score in scores.items():
        if score < weights[category] * 0.6:
            suggestions.append(suggestion_messages[category])

    if not suggestions:
        suggestions.append(
            "Your resume covers the evaluated sections well. "
            "Keep updating it with relevant skills and achievements."
        )

    # -------------------------------------------------
    # FINAL RESPONSE
    # -------------------------------------------------

    return {
        "overall_score": overall_score,
        "rating": rating,
        "category_scores": {
            category: {
                "score": score,
                "maximum": weights[category]
            }
            for category, score in scores.items()
        },
        "suggestions": suggestions
    }
