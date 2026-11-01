
# ============================================================
# AI-BASED RESUME SCREENING & JOB RECOMMENDATION SYSTEM
# JD-based category filtering and resume-based job matching
# ============================================================

from __future__ import annotations

from typing import Any


# ============================================================
# ROLE SKILL PROFILES
# ============================================================

JOB_ROLES: dict[str, list[str]] = {
    "Machine Learning Intern": [
        "python", "machine learning", "pandas", "numpy",
        "scikit-learn", "sql", "data analysis",
    ],
    "Data Analyst Intern": [
        "python", "pandas", "numpy", "sql", "data analysis", "statistics",
    ],
    "Python Developer Intern": [
        "python", "sql", "git", "rest api", "flask", "django",
    ],
    "Frontend Developer Intern": [
        "html", "css", "javascript", "react", "typescript", "responsive design",
    ],
    "Backend Developer Intern": [
        "node.js", "express.js", "python", "rest api", "sql", "mongodb",
    ],
    "Full Stack Developer Intern": [
        "html", "css", "javascript", "react", "node.js", "express.js",
        "mongodb", "rest api", "git",
    ],
    "Web Developer Intern": [
        "html", "css", "javascript", "web development", "git", "github",
    ],
    "NLP Intern": [
        "python", "machine learning", "natural language processing", "nlp",
        "pandas", "scikit-learn",
    ],
}

ROLE_CATEGORIES: dict[str, str] = {
    "Machine Learning Intern": "AI/ML",
    "Data Analyst Intern": "Data Analytics",
    "Python Developer Intern": "Backend Development",
    "Frontend Developer Intern": "Frontend Development",
    "Backend Developer Intern": "Backend Development",
    "Full Stack Developer Intern": "Full Stack Development",
    "Web Developer Intern": "Web Development",
    "NLP Intern": "AI/ML",
}


# ============================================================
# JOB LISTINGS
# Existing curated Delhi NCR dataset
# ============================================================

JOB_LISTINGS: list[dict[str, Any]] = [

    # ----------------------------
    # AI/ML LISTINGS
    # ----------------------------

    {
        "company": "Gramik",
        "job_role": "AI/ML Trainee",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": True,
        "required_skills": [
            "python", "machine learning", "pandas", "numpy",
            "scikit-learn", "data analysis", "databases"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/ai-ml-trainee-at-gramik%C2%AE-4469663934",
    },
    {
        "company": "Bizhues Pvt. Ltd.",
        "job_role": "Python, Django, AI/ML Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": False,
        "required_skills": [
            "python", "django", "machine learning", "numpy",
            "pandas", "scikit-learn", "tensorflow", "pytorch",
            "rest api", "data preprocessing"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/python-django-ai-ml-interns-paid-internship-at-bizhues-pvt-ltd-at-bizhues-pvt-ltd-4157282191",
    },
    {
        "company": "AD&AR Technologies",
        "job_role": "Artificial Intelligence Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": True,
        "required_skills": [
            "python", "artificial intelligence", "machine learning",
            "natural language processing", "nlp", "llm", "rag",
            "data analysis", "javascript", "c++"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-ad-ar-technologies-4417142600",
    },
    {
        "company": "eTeam",
        "job_role": "Artificial Intelligence Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": True,
        "required_skills": [
            "python", "artificial intelligence", "machine learning",
            "llm", "rag", "prompt engineering", "ai agents", "apis"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-eteam-4472084536",
    },
    {
        "company": "Onified.ai",
        "job_role": "AI/ML Intern",
        "location": "Gurugram, Haryana",
        "category": "AI/ML",
        "hiring": False,
        "required_skills": [
            "python", "machine learning", "llm", "rag", "embeddings",
            "pytorch", "tensorflow", "scikit-learn", "hugging face",
            "fastapi", "vector databases", "nlp", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/ai-ml-intern-at-onified-ai-4466844440",
    },
    {
        "company": "Tower Research Capital",
        "job_role": "Intern - AI/ML",
        "location": "Gurugram, Haryana",
        "category": "AI/ML",
        "hiring": True,
        "required_skills": [
            "python", "machine learning", "sql", "git",
            "linux", "tensorflow", "pytorch"
        ],
        "application_url": "https://www.tower-research.com/careers/",
    },
    {
        "company": "HR Creations",
        "job_role": "Python Automation & Data Science Intern",
        "location": "Gurugram, Haryana",
        "category": "Data Analytics",
        "hiring": None,
        "required_skills": [
            "python", "data science", "data analysis",
            "machine learning", "data processing", "excel"
        ],
        "application_url": "https://in.indeed.com/q-ai-ml-internships-l-gurugram%2C-haryana-jobs.html",
    },
    {
        "company": "Stealth Startup",
        "job_role": "AI/ML Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": False,
        "required_skills": [
            "python", "machine learning", "llm", "rag",
            "embeddings", "computer vision", "git", "docker"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/ai-ml-interns-at-stealth-startup-4389577022",
    },
    {
        "company": "DivyaNetra AI",
        "job_role": "AI/ML Developer Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": False,
        "required_skills": [
            "machine learning", "neural networks", "pattern recognition",
            "natural language processing", "nlp", "tensorflow", "pytorch"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/ai-ml-developer-intern-at-divyanetra-ai-4424341216",
    },
    {
        "company": "Line Code",
        "job_role": "Artificial Intelligence Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": False,
        "required_skills": [
            "python", "machine learning", "generative ai", "llm",
            "vector databases", "embeddings", "sql", "apis", "rag"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-line-code-4446998494",
    },
    {
        "company": "CHIRAG Technologies",
        "job_role": "AI/ML Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "AI/ML",
        "hiring": False,
        "required_skills": [
            "python", "machine learning",
            "artificial intelligence", "data analysis"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-chirag-technologies-4228124287",
    },

    # ----------------------------
    # FRONTEND / WEB / FULL STACK
    # ----------------------------

    {
        "company": "Eduzent Infotech Private Limited",
        "job_role": "Frontend Developer Internship",
        "location": "Noida, Uttar Pradesh",
        "category": "Frontend Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript", "react",
            "responsive design", "web development", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-internship-noida-at-eduzent-infotech-private-limited-4478404251",
    },
    {
        "company": "Microhub Technologies",
        "job_role": "Frontend Developer Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "Frontend Development",
        "hiring": False,
        "required_skills": [
            "html", "css", "javascript", "react",
            "typescript", "git", "rest api"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-internship-noida-at-microhub-technologies-4461861742",
    },
    {
        "company": "Meritshot",
        "job_role": "Frontend Developer Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "Frontend Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript", "react",
            "next.js", "git", "responsive design"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-intern-at-meritshot-4474272529",
    },
    {
        "company": "NARBA",
        "job_role": "Full Stack Developer Intern",
        "location": "Noida, Uttar Pradesh",
        "category": "Full Stack Development",
        "hiring": None,
        "required_skills": [
            "html", "css", "javascript", "react",
            "node.js", "rest api", "mongodb", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/full-stack-developer-intern-at-narba-4386874748",
    },
    {
        "company": "CodesIdea",
        "job_role": "Frontend Developer Intern",
        "location": "Gurugram, Haryana",
        "category": "Frontend Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript", "react",
            "next.js", "rest api", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-internship-at-codesidea-4468366629",
    },
    {
        "company": "EMotorad",
        "job_role": "Frontend Intern - Web and Mobile",
        "location": "Gurugram, Haryana",
        "category": "Frontend Development",
        "hiring": True,
        "required_skills": [
            "react", "next.js", "javascript", "typescript",
            "html", "css", "rest api", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/frontend-intern-web%2Bmobile-at-emotorad-4475580374",
    },
    {
        "company": "Anslation",
        "job_role": "Frontend Developer Intern (React.js)",
        "location": "Gurugram, Haryana",
        "category": "Frontend Development",
        "hiring": False,
        "required_skills": [
            "react", "javascript", "html", "css",
            "responsive design", "git", "rest api"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/tech-interns-at-anslation-4459914365",
    },
    {
        "company": "Tecnod8.AI",
        "job_role": "Full Stack Intern - Agentic AI Applications",
        "location": "Gurugram, Haryana",
        "category": "Full Stack Development",
        "hiring": True,
        "required_skills": [
            "react", "next.js", "javascript", "typescript",
            "html", "css", "python", "fastapi", "node.js",
            "rest api", "mongodb", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/2026-b-tech-graduates-gurgaon-intern-full-stack-agentic-ai-applications-development-at-tecnod8-ai-4480238090",
    },
    {
        "company": "Spectent",
        "job_role": "Full Stack Developer Intern",
        "location": "Gurugram, Haryana",
        "category": "Full Stack Development",
        "hiring": True,
        "required_skills": [
            "javascript", "html", "css", "react",
            "node.js", "rest api", "mongodb", "mysql", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/full-stack-developer-intern-at-spectent%E2%84%A2-4480260577",
    },
    {
        "company": "AIONOS",
        "job_role": "Full Stack Tech Intern",
        "location": "Gurugram, Haryana",
        "category": "Full Stack Development",
        "hiring": None,
        "required_skills": [
            "javascript", "react", "node.js",
            "rest api", "mongodb", "sql", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/tech-interns-full-stack-at-aionos-4465810827",
    },
    {
        "company": "GrowthGear",
        "job_role": "Full Stack Development Intern",
        "location": "Gurugram, Haryana",
        "category": "Full Stack Development",
        "hiring": True,
        "required_skills": [
            "react", "javascript", "python", "rest api", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/full-stack-development-internship-in-gurgaon-hybrid-at-growthgear-4469565483",
    },
    {
        "company": "RegisterKaro",
        "job_role": "Full Stack Intern",
        "location": "Gurugram, Haryana",
        "category": "Full Stack Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript", "react", "node.js",
            "python", "sql", "mongodb", "rest api", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/full-stack-intern-at-registerkaro-4469934241",
    },
    {
        "company": "Stalwartsoft Technologies",
        "job_role": "Frontend Development Intern",
        "location": "New Delhi, Delhi",
        "category": "Frontend Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript", "react",
            "responsive design", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/frontend-development-intern-at-stalwartsoft-technologies-4466677685",
    },
    {
        "company": "At Buzz",
        "job_role": "Front End Development Intern",
        "location": "South Delhi, Delhi",
        "category": "Full Stack Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript", "node.js",
            "mongodb", "rest api", "git"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/front-end-development-intern-at-at-buzz-4459931031",
    },
    {
        "company": "DigiBySR",
        "job_role": "Web Developer Intern",
        "location": "Delhi, India",
        "category": "Web Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript",
            "web development", "git", "responsive design"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/web-developer-intern-at-digibysr-4478875041",
    },
    {
        "company": "Roseknot Events & Marketing LLP",
        "job_role": "Website Developer Intern",
        "location": "New Delhi, Delhi",
        "category": "Web Development",
        "hiring": True,
        "required_skills": [
            "html", "css", "javascript", "web development",
            "responsive design", "rest api"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/website-developer-intern-at-roseknot-4478859355",
    },
    {
        "company": "Credes",
        "job_role": "Frontend Developer Intern",
        "location": "Delhi, India (Remote)",
        "category": "Frontend Development",
        "hiring": False,
        "required_skills": [
            "react", "next.js", "javascript", "typescript",
            "html", "css", "rest api"
        ],
        "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-intern-at-credes-4458458865",
    },
]


# ============================================================
# SKILL NORMALIZATION
# ============================================================

def normalize_skill(skill: str) -> str:
    """Normalize equivalent spellings and common skill aliases."""

    if not isinstance(skill, str):
        return ""

    skill = " ".join(skill.lower().strip().split())

    aliases = {
        "machinelearning": "machine learning",
        "naturallanguageprocessing": "natural language processing",
        "dataanalysis": "data analysis",
        "datapreprocessing": "data preprocessing",
        "datascience": "data science",
        "restapis": "rest api",
        "rest apis": "rest api",
        "scikitlearn": "scikit-learn",
        "sklearn": "scikit-learn",
        "nodejs": "node.js",
        "node js": "node.js",
        "express": "express.js",
        "expressjs": "express.js",
        "express js": "express.js",
        "nextjs": "next.js",
        "next js": "next.js",
        "reactjs": "react",
        "react js": "react",
        "javascript (js)": "javascript",
        "js": "javascript",
        "html5": "html",
        "css3": "css",
        "git hub": "github",
        "mongo db": "mongodb",
        "my sql": "mysql",
        "api development": "rest api",
        "restful api": "rest api",
        "restful apis": "rest api",
        "responsive web design": "responsive design",
        "front end development": "frontend development",
        "front-end development": "frontend development",
        "back end development": "backend development",
        "back-end development": "backend development",
        "full-stack development": "full stack development",
        "fullstack development": "full stack development",
        "web dev": "web development",
    }

    return aliases.get(skill, skill)


def normalize_skills(skills: list[str] | None) -> set[str]:
    """Return a normalized set, ignoring empty or invalid values."""

    if not skills:
        return set()

    return {
        normalized
        for item in skills
        if (normalized := normalize_skill(item))
    }


# ============================================================
# JOB DESCRIPTION CATEGORY DETECTION
# ============================================================

JD_CATEGORY_INDICATORS = {
    "AI/ML": {
        "machine learning",
        "artificial intelligence",
        "deep learning",
        "natural language processing",
        "nlp",
        "generative ai",
        "computer vision",
        "neural networks",
        "tensorflow",
        "pytorch",
        "scikit-learn",
        "llm",
        "rag",
    },

    "Data Analytics": {
        "data analysis",
        "data analytics",
        "data analyst",
        "data science",
        "statistics",
        "data visualization",
        "power bi",
        "tableau",
        "excel",
    },

    "Frontend Development": {
        "frontend",
        "frontend development",
        "front end",
        "html",
        "css",
        "javascript",
        "react",
        "responsive design",
        "typescript",
    },

    "Full Stack Development": {
        "full stack",
        "fullstack",
        "full stack development",
        "mern stack",
        "mean stack",
    },

    "Backend Development": {
        "backend",
        "backend development",
        "back end",
        "python developer",
        "django",
        "flask",
        "node.js",
        "express.js",
        "rest api",
    },

    "Web Development": {
        "web development",
        "web developer",
        "website development",
    },
}


def detect_jd_category(jd_skills: list[str]) -> str | None:
    """
    Identify the category of a job description using
    its extracted skills.

    The category with the highest number of matching
    indicators is selected.
    """

    jd_set = normalize_skills(jd_skills)

    if not jd_set:
        return None

    category_scores: dict[str, int] = {}

    for category, indicators in JD_CATEGORY_INDICATORS.items():

        normalized_indicators = normalize_skills(
            list(indicators)
        )

        matched = jd_set.intersection(normalized_indicators)

        if matched:
            category_scores[category] = len(matched)

    if not category_scores:
        return None

    return max(
        category_scores,
        key=category_scores.get
    )


# ============================================================
# RESUME ROLE DETECTION
# ============================================================

def detect_resume_roles(
    resume_skills: list[str],
    min_match_ratio: float = 0.25,
) -> list[dict[str, Any]]:
    """
    Detect all role profiles with enough skill overlap.

    Multiple roles can be returned for hybrid resumes.
    """

    resume_set = normalize_skills(resume_skills)
    detected: list[dict[str, Any]] = []

    if not resume_set:
        return detected

    for role_name, role_skills in JOB_ROLES.items():

        required_set = normalize_skills(role_skills)

        matched = sorted(
            resume_set.intersection(required_set)
        )

        score = (
            len(matched) / len(required_set) * 100
            if required_set else 0.0
        )

        if score >= min_match_ratio * 100:

            detected.append({
                "role": role_name,
                "category": ROLE_CATEGORIES.get(
                    role_name,
                    "Web Development"
                ),
                "match_percentage": round(score, 2),
                "matched_skills": matched,
            })

    detected.sort(
        key=lambda item: item["match_percentage"],
        reverse=True
    )

    return detected


# ============================================================
# LOCATION FILTER
# ============================================================

def _allowed_location(location: str) -> bool:
    """Allow listings in Delhi NCR."""

    location_lower = location.lower()

    allowed_terms = (
        "delhi",
        "noida",
        "gurugram",
        "gurgaon",
        "greater noida",
        "ghaziabad",
        "faridabad",
        "ncr",
    )

    return any(
        term in location_lower
        for term in allowed_terms
    )


# ============================================================
# HIRING STATUS
# ============================================================

def _hiring_status(job: dict[str, Any]) -> str:
    """Return a clear hiring status."""

    if job.get("hiring_status"):
        return str(job["hiring_status"])

    if job.get("hiring") is True:
        return "Currently Hiring"

    if job.get("hiring") is False:
        return "No Hiring"

    return "Status Unverified"


def _hiring_rank(hiring: bool | None) -> int:
    """Sort currently hiring first."""

    if hiring is True:
        return 2

    if hiring is None:
        return 1

    return 0


# ============================================================
# JOB RECOMMENDATION FUNCTION
# ============================================================

def recommend_jobs(
    resume_skills: list[str],
    max_results: int = 20,
    include_closed: bool = True,
    job_description_skills: list[str] | None = None,
) -> list[dict[str, Any]]:
    """
    Recommend jobs using the Job Description category
    and uploaded resume skills.

    Main logic:
    1. Detect the category from Job Description skills.
    2. Filter jobs to that category.
    3. Calculate resume-to-job skill match percentage.
    4. Sort currently hiring jobs first.
    5. If JD category cannot be detected, fall back
       to resume-based category detection.
    """

    if max_results < 1:
        return []

    resume_set = normalize_skills(resume_skills)

    # Detect category from the Job Description first.
    jd_category = detect_jd_category(
        job_description_skills or []
    )

    # JD category takes priority over resume categories.
    if jd_category:

        allowed_categories = {jd_category}

    else:

        detected_roles = detect_resume_roles(
            resume_skills
        )

        allowed_categories = {
            role["category"]
            for role in detected_roles
        }

    recommendations: list[dict[str, Any]] = []

    for job in JOB_LISTINGS:

        # Delhi NCR location filtering.
        if not _allowed_location(
            job.get("location", "")
        ):
            continue

        # Optionally exclude closed listings.
        if (
            not include_closed
            and job.get("hiring") is False
        ):
            continue

        category = job.get(
            "category",
            "Web Development"
        )

        # Strict category filtering.
        if (
            allowed_categories
            and category not in allowed_categories
        ):
            continue

        required_set = normalize_skills(
            job.get("required_skills", [])
        )

        matched_skills = sorted(
            resume_set.intersection(required_set)
        )

        match_percentage = (
            len(matched_skills) / len(required_set) * 100
            if required_set else 0.0
        )

        hiring = job.get("hiring")

        is_full_match = (
            match_percentage == 100.0
            and hiring is True
        )

        recommendations.append({
            "company": job["company"],
            "job_role": job["job_role"],
            "location": job["location"],
            "category": category,
            "hiring": hiring,
            "hiring_status": _hiring_status(job),
            "match_percentage": round(
                match_percentage,
                2
            ),
            "is_full_match": is_full_match,
            "matched_skills": matched_skills,
            "required_skills": sorted(required_set),
            "application_url": job["application_url"],
        })

    # Currently hiring first, then full matches,
    # followed by higher resume skill match percentages.
    recommendations.sort(
        key=lambda item: (
            _hiring_rank(item["hiring"]),
            item["is_full_match"],
            item["match_percentage"],
        ),
        reverse=True,
    )

    return recommendations[:max_results]


# ============================================================
# COMMAND-LINE TEST
# ============================================================

if __name__ == "__main__":

    sample_resume_skills = [
        "python",
        "machine learning",
        "pandas",
        "numpy",
        "scikit-learn",
        "sql",
        "git",
        "html",
        "css",
        "javascript",
        "react",
    ]

    test_cases = {
        "AI/ML": [
            "python",
            "machine learning",
            "deep learning",
            "pandas",
            "scikit-learn",
        ],

        "Frontend Development": [
            "html",
            "css",
            "javascript",
            "react",
        ],

        "Full Stack Development": [
            "full stack",
            "react",
            "node.js",
            "mongodb",
        ],
    }

    print("JOB DESCRIPTION CATEGORY TEST")
    print("=" * 50)

    for expected_category, jd_skills in test_cases.items():

        detected_category = detect_jd_category(
            jd_skills
        )

        print(
            f"Expected: {expected_category} | "
            f"Detected: {detected_category}"
        )

    print("\nRESUME ROLE DETECTION")
    print("=" * 50)

    for role in detect_resume_roles(
        sample_resume_skills
    ):
        print(role)

    print("\nAI/ML JOB RECOMMENDATIONS")
    print("=" * 50)

    ai_ml_jd_skills = [
        "python",
        "machine learning",
        "deep learning",
        "pandas",
        "scikit-learn",
    ]

    jobs = recommend_jobs(
        resume_skills=sample_resume_skills,
        job_description_skills=ai_ml_jd_skills,
    )

    for job in jobs:

        print(
            f"{job['company']} | "
            f"{job['job_role']} | "
            f"{job['category']} | "
            f"{job['hiring_status']} | "
            f"{job['match_percentage']}%"
        )
