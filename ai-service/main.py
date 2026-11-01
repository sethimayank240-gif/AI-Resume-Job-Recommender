
from fastapi import FastAPI, UploadFile, File, HTTPException
from pathlib import Path
import tempfile

from resume_parser import extract_resume_text
from skill_extractor import extract_skills
from jd_analyzer import analyze_job_description
from matcher import calculate_skill_match
from recommendation import get_recommendation
from job_recommender import recommend_jobs
from career_roadmap import generate_career_roadmap
from resume_scorer import calculate_resume_score


app = FastAPI(
    title="AI Resume Job Recommender",
    description="AI service for resume screening and job recommendation",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "AI Resume Job Recommender AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "service": "ai-service",
        "status": "healthy"
    }


@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = ""
):
    """
    Upload a resume, extract its text and skills,
    calculate the overall resume score,
    analyze the job description, calculate skill matching,
    generate recommendations, recommend suitable jobs,
    and generate a career roadmap.
    """

    allowed_extensions = {".pdf", ".docx"}
    file_extension = Path(file.filename).suffix.lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX resumes are supported."
        )

    temp_file_path = None

    try:
        file_content = await file.read()

        if not file_content:
            raise HTTPException(
                status_code=400,
                detail="Uploaded resume is empty."
            )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=file_extension
        ) as temp_file:
            temp_file.write(file_content)
            temp_file_path = temp_file.name

        try:
            # Extract resume text
            extracted_text = extract_resume_text(temp_file_path)

            # Extract resume skills
            extracted_skills = extract_skills(extracted_text)

        finally:
            Path(temp_file_path).unlink(missing_ok=True)

        # Calculate overall resume score
        resume_score = calculate_resume_score(
            resume_text=extracted_text,
            extracted_skills=extracted_skills
        )

        # Analyze job description
        jd_result = analyze_job_description(job_description)

        # Calculate resume and job description skill matching
        match_result = calculate_skill_match(
            extracted_skills,
            jd_result["skills"]
        )

        # Generate job match recommendation
        recommendation = get_recommendation(
            match_result["overall_match_score"]
        )

        # Recommend jobs based on Job Description category
        job_recommendations = recommend_jobs(
            resume_skills=extracted_skills,
            job_description_skills=jd_result["skills"]
        )

        # Generate career roadmap using missing skills
        career_roadmap = generate_career_roadmap(
            match_result["missing_skills"]
        )

        return {
            "success": True,
            "filename": file.filename,

            # Overall Resume Analysis
            "resume_score": resume_score,

            # Extracted Resume Information
            "resume": {
                "text_length": len(extracted_text),
                "text": extracted_text,
                "skills": extracted_skills,
                "skill_count": len(extracted_skills)
            },

            # Job Description Analysis
            "job_description": {
                "skills": jd_result["skills"],
                "skill_count": jd_result["skill_count"]
            },

            # Resume and Job Description Matching
            "matching": match_result,

            # Job Match Recommendation
            "recommendation": recommendation,

            # Recommended Jobs
            "job_recommendations": job_recommendations,

            # Career Roadmap
            "career_roadmap": career_roadmap
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Resume processing failed: {str(error)}"
        )

    finally:
        if temp_file_path:
            Path(temp_file_path).unlink(missing_ok=True)
