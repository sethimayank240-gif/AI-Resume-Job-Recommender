# ============================================================
# AI-BASED RESUME SCREENING & JOB RECOMMENDATION SYSTEM
# Delhi NCR: AI/ML, Data Analytics, Frontend, Backend, Full Stack
# ============================================================
from __future__ import annotations
from typing import Any

JOB_ROLES: dict[str, list[str]] = {
    "Machine Learning Intern": ["python", "machine learning", "pandas", "numpy", "scikit-learn", "sql", "data analysis"],
    "Data Analyst Intern": ["python", "pandas", "numpy", "sql", "data analysis", "statistics"],
    "Python Developer Intern": ["python", "sql", "git", "rest api", "flask", "django"],
    "Frontend Developer Intern": ["html", "css", "javascript", "react", "typescript", "responsive design"],
    "Backend Developer Intern": ["node.js", "express.js", "python", "rest api", "sql", "mongodb"],
    "Full Stack Developer Intern": ["html", "css", "javascript", "react", "node.js", "express.js", "mongodb", "rest api", "git"],
    "Web Developer Intern": ["html", "css", "javascript", "web development", "git", "github"],
    "NLP Intern": ["python", "machine learning", "natural language processing", "nlp", "pandas", "scikit-learn"],
}
ROLE_CATEGORIES = {
    "Machine Learning Intern": "AI/ML",
    "Data Analyst Intern": "Data Analytics",
    "Python Developer Intern": "Backend Development",
    "Frontend Developer Intern": "Frontend Development",
    "Backend Developer Intern": "Backend Development",
    "Full Stack Developer Intern": "Full Stack Development",
    "Web Developer Intern": "Web Development",
    "NLP Intern": "AI/ML",
}

# Listings are leads, not guarantees of current vacancies. Verify each listing
# on its application page before applying.
JOB_LISTINGS: list[dict[str, Any]] = [
    # AI / ML
    {"company": "Bizhues Pvt. Ltd.", "job_role": "Python, Django, AI/ML Intern", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": False, "required_skills": ["python", "django", "machine learning", "numpy", "pandas", "scikit-learn", "tensorflow", "pytorch", "rest api", "data preprocessing"], "application_url": "https://in.linkedin.com/jobs/view/python-django-ai-ml-interns-paid-internship-at-bizhues-pvt-ltd-4157282191"},
    {"company": "AD&AR Technologies", "job_role": "Artificial Intelligence Intern", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": True, "required_skills": ["python", "artificial intelligence", "machine learning", "natural language processing", "nlp", "llm", "rag", "data analysis", "javascript", "c++"], "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-ad-ar-technologies-4417142600"},
    {"company": "eTeam", "job_role": "Artificial Intelligence Intern", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": True, "required_skills": ["python", "artificial intelligence", "machine learning", "llm", "rag", "prompt engineering", "ai agents", "apis"], "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-eteam-4472084536"},
    {"company": "Onified.ai", "job_role": "AI/ML Intern", "location": "Gurugram, Haryana", "category": "AI/ML", "hiring": False, "required_skills": ["python", "machine learning", "llm", "rag", "embeddings", "pytorch", "tensorflow", "scikit-learn", "hugging face", "fastapi", "vector databases", "nlp", "git"], "application_url": "https://in.linkedin.com/jobs/view/ai-ml-intern-at-onified-ai-4466844440"},
    {"company": "Tower Research Capital", "job_role": "Intern - AI/ML", "location": "Gurugram, Haryana", "category": "AI/ML", "hiring": True, "required_skills": ["python", "machine learning", "sql", "git", "linux", "tensorflow", "pytorch"], "application_url": "https://www.tower-research.com/careers/"},
    {"company": "HR Creations", "job_role": "Python Automation & Data Science Intern", "location": "Gurugram, Haryana", "category": "Data Analytics", "hiring": None, "required_skills": ["python", "data science", "data analysis", "machine learning", "data processing", "excel"], "application_url": "https://in.indeed.com/q-ai-ml-internships-l-gurugram%2C-haryana-jobs.html"},
    {"company": "Stealth Startup", "job_role": "AI/ML Intern", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": False, "required_skills": ["python", "machine learning", "llm", "rag", "embeddings", "computer vision", "git", "docker"], "application_url": "https://in.linkedin.com/jobs/view/ai-ml-interns-at-stealth-startup-4389577022"},
    {"company": "DivyaNetra AI", "job_role": "AI/ML Developer Intern", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": False, "required_skills": ["machine learning", "neural networks", "pattern recognition", "natural language processing", "nlp", "tensorflow", "pytorch"], "application_url": "https://in.linkedin.com/jobs/view/ai-ml-developer-intern-at-divyanetra-ai-4424341216"},
    {"company": "Line Code", "job_role": "Artificial Intelligence Intern", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": False, "required_skills": ["python", "machine learning", "generative ai", "llm", "vector databases", "embeddings", "sql", "apis", "rag"], "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-line-code-4446998494"},
    {"company": "CHIRAG Technologies", "job_role": "AI/ML Intern", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": False, "required_skills": ["python", "machine learning", "artificial intelligence", "data analysis"], "application_url": "https://in.linkedin.com/jobs/view/artificial-intelligence-intern-at-chirag-technologies-4228124287"},
    # Additional AI/ML and data company leads
    {"company": "IBM", "job_role": "AI / Research Software Intern", "location": "Gurugram, Haryana", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "artificial intelligence", "data structures", "algorithms", "sql", "pandas", "numpy", "git"], "application_url": "https://www.ibm.com/careers/"},
    {"company": "Accenture", "job_role": "AI/ML Analyst - Entry Level", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "artificial intelligence", "sql", "data analysis", "statistics", "scikit-learn", "data preprocessing"], "application_url": "https://www.accenture.com/in-en/careers"},
    {"company": "Park+", "job_role": "AI / Data Product Opportunity", "location": "Gurugram, Haryana", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "data analysis", "sql", "pandas", "numpy", "statistics", "data visualization"], "application_url": "https://parkplus.io/"},
    {"company": "Wadhwani AI", "job_role": "AI / Machine Learning Opportunity", "location": "New Delhi, Delhi", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "deep learning", "data science", "pandas", "numpy", "scikit-learn", "statistics", "research"], "application_url": "https://www.wadhwaniai.org/"},
    {"company": "Jarvis Technology and Strategy Consulting", "job_role": "Voice AI / AI Intern", "location": "New Delhi, Delhi", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Original Job Listing", "required_skills": ["python", "artificial intelligence", "natural language processing", "nlp", "machine learning", "apis", "sql"], "application_url": "https://in.linkedin.com/jobs/artificial-intelligence-intern-jobs-gurgaon"},
    {"company": "Genpact", "job_role": "Data Science / Machine Learning Opportunity", "location": "Gurugram, Haryana", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "sql", "statistics", "pandas", "numpy", "scikit-learn", "data analysis"], "application_url": "https://www.genpact.com/careers"},
    {"company": "Sprinklr", "job_role": "AI / Data Science Opportunity", "location": "Gurugram, Haryana", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "artificial intelligence", "sql", "data analysis", "statistics", "natural language processing", "nlp"], "application_url": "https://www.sprinklr.com/careers/"},
    {"company": "CARS24", "job_role": "Machine Learning / Data Science Opportunity", "location": "Gurugram, Haryana", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "sql", "pandas", "numpy", "statistics", "scikit-learn", "data analysis"], "application_url": "https://www.cars24.com/careers/"},
    {"company": "InnovationM", "job_role": "AI / ML Engineering Opportunity", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "artificial intelligence", "scikit-learn", "tensorflow", "pytorch", "rest api", "git"], "application_url": "https://www.innovationm.com/"},
    {"company": "WSP", "job_role": "AI / Data Science Opportunity", "location": "Noida, Uttar Pradesh", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "data analysis", "sql", "pandas", "numpy", "statistics", "data visualization"], "application_url": "https://www.wsp.com/en-in/careers"},
    {"company": "Chariot", "job_role": "AI Research / Software Engineering Opportunity", "location": "New Delhi, Delhi", "category": "AI/ML", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "machine learning", "deep learning", "artificial intelligence", "pytorch", "tensorflow", "algorithms", "git"], "application_url": "https://chariot.in/careers/"},
    {"company": "AuthBridge", "job_role": "Data Analytics / Data Science Opportunity", "location": "Gurugram, Haryana", "category": "Data Analytics", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "sql", "data analysis", "pandas", "numpy", "statistics", "excel", "data visualization"], "application_url": "https://authbridge.com/"},
    # Frontend / web development
    {"company": "Eduzent Infotech Private Limited", "job_role": "Frontend Developer Internship", "location": "Noida, Uttar Pradesh", "category": "Frontend Development", "hiring": True, "required_skills": ["html", "css", "javascript", "react", "responsive design", "web development", "git"], "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-internship-noida-at-eduzent-infotech-private-limited-4478404251"},
    {"company": "Microhub Technologies", "job_role": "Frontend Developer Intern", "location": "Noida, Uttar Pradesh", "category": "Frontend Development", "hiring": False, "required_skills": ["html", "css", "javascript", "react", "typescript", "git", "rest api"], "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-internship-noida-at-microhub-technologies-4461861742"},
    {"company": "Meritshot", "job_role": "Frontend Developer Intern", "location": "Noida, Uttar Pradesh", "category": "Frontend Development", "hiring": True, "required_skills": ["html", "css", "javascript", "react", "next.js", "git", "responsive design"], "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-intern-at-meritshot-4474272529"},
    {"company": "CodesIdea", "job_role": "Frontend Developer Intern", "location": "Gurugram, Haryana", "category": "Frontend Development", "hiring": True, "required_skills": ["html", "css", "javascript", "react", "next.js", "rest api", "git"], "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-internship-at-codesidea-4468366629"},
    {"company": "EMotorad", "job_role": "Frontend Intern - Web and Mobile", "location": "Gurugram, Haryana", "category": "Frontend Development", "hiring": True, "required_skills": ["react", "next.js", "javascript", "typescript", "html", "css", "rest api", "git"], "application_url": "https://in.linkedin.com/jobs/view/frontend-intern-web%2Bmobile-at-emotorad-4475580374"},
    {"company": "Anslation", "job_role": "Frontend Developer Intern (React.js)", "location": "Gurugram, Haryana", "category": "Frontend Development", "hiring": False, "required_skills": ["react", "javascript", "html", "css", "responsive design", "git", "rest api"], "application_url": "https://in.linkedin.com/jobs/view/tech-interns-at-anslation-4459914365"},
    {"company": "Stalwartsoft Technologies", "job_role": "Frontend Development Intern", "location": "New Delhi, Delhi", "category": "Frontend Development", "hiring": True, "required_skills": ["html", "css", "javascript", "react", "responsive design", "git"], "application_url": "https://in.linkedin.com/jobs/view/frontend-development-intern-at-stalwartsoft-technologies-4466677685"},
    {"company": "Credes", "job_role": "Frontend Developer Intern", "location": "Delhi, India (Remote)", "category": "Frontend Development", "hiring": False, "required_skills": ["react", "next.js", "javascript", "typescript", "html", "css", "rest api"], "application_url": "https://in.linkedin.com/jobs/view/frontend-developer-intern-at-credes-4458458865"},
    {"company": "At Buzz", "job_role": "Frontend / Web Development Intern", "location": "South Delhi, Delhi", "category": "Web Development", "hiring": True, "required_skills": ["html", "css", "javascript", "node.js", "mongodb", "rest api", "git"], "application_url": "https://in.linkedin.com/jobs/view/front-end-development-intern-at-at-buzz-4459931031"},
    {"company": "DigiBySR", "job_role": "Web Developer Intern", "location": "Delhi, India", "category": "Web Development", "hiring": True, "required_skills": ["html", "css", "javascript", "web development", "git", "responsive design"], "application_url": "https://in.linkedin.com/jobs/view/web-developer-intern-at-digibysr-4478875041"},
    {"company": "Roseknot Events & Marketing LLP", "job_role": "Website Developer Intern", "location": "New Delhi, Delhi", "category": "Web Development", "hiring": True, "required_skills": ["html", "css", "javascript", "web development", "responsive design", "rest api"], "application_url": "https://in.linkedin.com/jobs/view/website-developer-intern-at-roseknotevents-marketing-4478859355"},
    # Full stack development. GrowthGear intentionally excluded as its listing is unavailable.
    {"company": "NARBA", "job_role": "Full Stack Developer Intern", "location": "Noida, Uttar Pradesh", "category": "Full Stack Development", "hiring": None, "required_skills": ["html", "css", "javascript", "react", "node.js", "rest api", "mongodb", "git"], "application_url": "https://in.linkedin.com/jobs/view/full-stack-developer-intern-at-narba-4386874748"},
    {"company": "Tecnod8.AI", "job_role": "Full Stack Intern - Agentic AI Applications", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": True, "required_skills": ["react", "next.js", "javascript", "typescript", "html", "css", "python", "fastapi", "node.js", "rest api", "mongodb", "git"], "application_url": "https://in.linkedin.com/jobs/view/2026-b-tech-graduates-gurgaon-intern-full-stack-agentic-ai-applications-development-at-tecnod8-ai-4480238090"},
    {"company": "Spectent", "job_role": "Full Stack Developer Intern", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": True, "required_skills": ["javascript", "html", "css", "react", "node.js", "rest api", "mongodb", "mysql", "git"], "application_url": "https://in.linkedin.com/jobs/view/full-stack-developer-intern-at-spectent%E2%84%A2-4480260577"},
    {"company": "AIONOS", "job_role": "Full Stack Tech Intern", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": None, "required_skills": ["javascript", "react", "node.js", "rest api", "mongodb", "sql", "git"], "application_url": "https://in.linkedin.com/jobs/view/tech-interns-full-stack-at-aionos-4465810827"},
    {"company": "RegisterKaro", "job_role": "Full Stack Intern", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": True, "required_skills": ["html", "css", "javascript", "react", "node.js", "python", "sql", "mongodb", "rest api", "git"], "application_url": "https://in.linkedin.com/jobs/view/full-stack-intern-at-registerkaro-4469934241"},
    {"company": "InnovationM", "job_role": "Full Stack Developer - Fresher / Junior", "location": "Noida, Uttar Pradesh", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["html", "css", "javascript", "react", "node.js", "express.js", "mongodb", "rest api", "git"], "application_url": "https://www.innovationm.com/"},
    {"company": "CARS24", "job_role": "Software / Full Stack Engineering Opportunity", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["javascript", "react", "node.js", "rest api", "sql", "mongodb", "git", "data structures"], "application_url": "https://www.cars24.com/careers/"},
    {"company": "Sprinklr", "job_role": "Software Engineering / Web Development Opportunity", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["javascript", "react", "html", "css", "rest api", "sql", "git", "data structures"], "application_url": "https://www.sprinklr.com/careers/"},
    {"company": "IBM", "job_role": "Software Developer Intern", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["javascript", "python", "rest api", "sql", "git", "data structures", "algorithms"], "application_url": "https://www.ibm.com/careers/"},
    {"company": "Accenture", "job_role": "Application Development - Entry Level", "location": "Noida, Uttar Pradesh", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["javascript", "html", "css", "python", "sql", "rest api", "git", "data structures"], "application_url": "https://www.accenture.com/in-en/careers"},
    {"company": "Genpact", "job_role": "Software / Web Developer Opportunity", "location": "Gurugram, Haryana", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["javascript", "python", "html", "css", "sql", "rest api", "git"], "application_url": "https://www.genpact.com/careers"},
    {"company": "WSP", "job_role": "Software Developer Opportunity", "location": "Noida, Uttar Pradesh", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["javascript", "python", "sql", "rest api", "git", "html", "css"], "application_url": "https://www.wsp.com/en-in/careers"},
    {"company": "Chariot", "job_role": "Software Engineer / Web Application Opportunity", "location": "New Delhi, Delhi", "category": "Full Stack Development", "hiring": None, "hiring_status": "Status Unverified - Check Careers Page", "required_skills": ["python", "javascript", "rest api", "git", "sql", "html", "css"], "application_url": "https://chariot.in/careers/"},
]

ALIASES = {
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
    "full-stack development": "full stack development",
    "fullstack development": "full stack development",
    "web dev": "web development",
}

def normalize_skill(skill: str) -> str:
    if not isinstance(skill, str):
        return ""
    skill = " ".join(skill.lower().strip().split())
    return ALIASES.get(skill, skill)

def normalize_skills(skills: list[str] | None) -> set[str]:
    if not skills:
        return set()
    return {normalized for item in skills if (normalized := normalize_skill(item))}

JD_CATEGORY_INDICATORS = {
    "AI/ML": {"machine learning", "artificial intelligence", "deep learning", "natural language processing", "nlp", "generative ai", "computer vision", "neural networks", "tensorflow", "pytorch", "scikit-learn", "llm", "rag"},
    "Data Analytics": {"data analysis", "data analytics", "data analyst", "data science", "statistics", "data visualization", "power bi", "tableau", "excel"},
    "Frontend Development": {"frontend", "frontend development", "front end", "html", "css", "javascript", "react", "responsive design", "typescript"},
    "Full Stack Development": {"full stack", "fullstack", "full stack development", "mern stack", "mean stack"},
    "Backend Development": {"backend", "backend development", "back end", "python developer", "django", "flask", "node.js", "express.js", "rest api"},
    "Web Development": {"web development", "web developer", "website development"},
}

def detect_jd_category(jd_skills: list[str]) -> str | None:
    jd_set = normalize_skills(jd_skills)
    if not jd_set:
        return None

    # React + backend technology signals indicate a full-stack role.
    frontend_signals = {"html", "css", "javascript", "react", "typescript", "next.js"}
    backend_signals = {"node.js", "express.js", "python", "django", "flask", "rest api", "mongodb", "mysql", "sql"}
    if jd_set.intersection(frontend_signals) and jd_set.intersection(backend_signals):
        return "Full Stack Development"

    scores = {}
    for category, indicators in JD_CATEGORY_INDICATORS.items():
        matched = jd_set.intersection(normalize_skills(list(indicators)))
        if matched:
            scores[category] = len(matched)
    return max(scores, key=scores.get) if scores else None

def detect_resume_roles(resume_skills: list[str], min_match_ratio: float = 0.25) -> list[dict[str, Any]]:
    resume_set = normalize_skills(resume_skills)
    detected = []
    if not resume_set:
        return detected
    for role_name, role_skills in JOB_ROLES.items():
        required = normalize_skills(role_skills)
        matched = sorted(resume_set.intersection(required))
        score = len(matched) / len(required) * 100 if required else 0.0
        if score >= min_match_ratio * 100:
            detected.append({
                "role": role_name,
                "category": ROLE_CATEGORIES.get(role_name, "Web Development"),
                "match_percentage": round(score, 2),
                "matched_skills": matched,
            })
    return sorted(detected, key=lambda item: item["match_percentage"], reverse=True)

def _allowed_location(location: str) -> bool:
    location_lower = location.lower()
    return any(term in location_lower for term in ("delhi", "noida", "gurugram", "gurgaon", "greater noida", "ghaziabad", "faridabad", "ncr"))

def _hiring_status(job: dict[str, Any]) -> str:
    if job.get("hiring_status"):
        return str(job["hiring_status"])
    if job.get("hiring") is True:
        return "Listed as Hiring - Verify Current Status"
    if job.get("hiring") is False:
        return "Listed as Closed - Check for New Vacancies"
    return "Status Unverified - Check Careers Page"

def recommend_jobs(
    resume_skills: list[str],
    max_results: int = 20,
    include_closed: bool = True,
    job_description_skills: list[str] | None = None,
    selected_category: str | None = None,
) -> list[dict[str, Any]]:
    """Recommend NCR jobs using a selected/JD category and resume skill overlap.

    When selected_category or JD skills identify a category, only that category
    is returned. Without either, categories are inferred from resume skills.
    Results are always sorted by match percentage descending.
    """
    if max_results < 1:
        return []

    resume_set = normalize_skills(resume_skills)
    jd_category = detect_jd_category(job_description_skills or [])
    requested_category = selected_category or jd_category

    if requested_category:
        # Accept common shorthand labels while returning canonical categories.
        category_aliases = {
            "ai/ml": "AI/ML",
            "ai ml": "AI/ML",
            "data analytics": "Data Analytics",
            "frontend": "Frontend Development",
            "frontend development": "Frontend Development",
            "web development": "Web Development",
            "backend": "Backend Development",
            "backend development": "Backend Development",
            "full stack": "Full Stack Development",
            "full-stack": "Full Stack Development",
            "full stack development": "Full Stack Development",
        }
        requested_category = category_aliases.get(
            requested_category.strip().lower(), requested_category
        )
        allowed_categories = {requested_category}
    else:
        allowed_categories = {role["category"] for role in detect_resume_roles(resume_skills)}

    recommendations = []
    for job in JOB_LISTINGS:
        if not _allowed_location(job.get("location", "")):
            continue
        if not include_closed and job.get("hiring") is False:
            continue

        category = job.get("category", "Web Development")
        if allowed_categories and category not in allowed_categories:
            continue

        required = normalize_skills(job.get("required_skills", []))
        matched = sorted(resume_set.intersection(required))
        percentage = len(matched) / len(required) * 100 if required else 0.0
        hiring = job.get("hiring")
        recommendations.append({
            "company": job["company"],
            "job_role": job["job_role"],
            "location": job["location"],
            "category": category,
            "hiring": hiring,
            "hiring_status": _hiring_status(job),
            "match_percentage": round(percentage, 2),
            "is_full_match": percentage == 100.0 and hiring is True,
            "matched_skills": matched,
            "required_skills": sorted(required),
            "missing_skills": sorted(required - set(matched)),
            "application_url": job["application_url"],
        })

    recommendations.sort(
        key=lambda item: item["match_percentage"],
        reverse=True,
    )
    return recommendations[:max_results]

if __name__ == "__main__":
    sample_resume_skills = [
        "python", "machine learning", "pandas", "numpy", "scikit-learn",
        "sql", "git", "html", "css", "javascript", "react", "node.js",
        "express.js", "mongodb", "rest api",
    ]
    print("Job records:", len(JOB_LISTINGS))
    print("Full Stack test category:", detect_jd_category(["full stack", "react", "node.js", "mongodb"]))
    print("Full Stack recommendations:")
    for job in recommend_jobs(
        sample_resume_skills,
        max_results=50,
        job_description_skills=["full stack", "react", "node.js", "mongodb"],
    ):
        print(f"{job['company']} | {job['job_role']} | {job['location']} | {job['hiring_status']} | {job['match_percentage']}%")
