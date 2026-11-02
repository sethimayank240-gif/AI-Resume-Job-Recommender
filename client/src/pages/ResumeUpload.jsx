
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResumeUpload = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  const storageKey = userEmail
    ? `resumeAnalysis_${userEmail}`
    : "resumeAnalysis";

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setError("");
    setSuccess("");
    setAnalysis(null);

    if (!file) return;

    const allowedExtensions = [".pdf", ".doc", ".docx"];

    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError("Please select a PDF, DOC or DOCX file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAnalysis(null);
    setError("");
    setSuccess("");

    const input = document.getElementById("resume-file");

    if (input) input.value = "";
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setError("");
    setSuccess("");
    setAnalysis(null);
    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("resume", selectedFile);
      formData.append("job_description", jobDescription);

      const response = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData
      );

      console.log("Resume analysis response:", response.data);

      if (response.data.success) {
        const result = response.data.analysis;

        if (!result) {
          throw new Error(
            "Analysis data was not returned by the server."
          );
        }

        localStorage.setItem(
          storageKey,
          JSON.stringify(result)
        );

        if (userEmail) {
          localStorage.setItem(
            `resumeFileName_${userEmail}`,
            selectedFile.name
          );

          localStorage.setItem(
            `jobDescription_${userEmail}`,
            jobDescription
          );
        }

        setAnalysis(result);
        setSuccess("Resume analyzed successfully!");
      } else {
        setError(
          response.data.message || "Resume analysis failed."
        );
      }
    } catch (err) {
      console.error("Resume upload error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to connect to the backend server."
      );
    } finally {
      setUploading(false);
    }
  };

  // Analysis data

  const matching = analysis?.matching || {};

  // Prefer the explicit ATS score returned by the backend.
  const matchScore = Number(
    matching.ats_score ??
      matching.overall_match_score ??
      matching.skill_match_percentage ??
      0
  );

  const resumeSkills = analysis?.resume?.skills || [];
  const matchedSkills = matching.matched_skills || [];
  const missingSkills = matching.missing_skills || [];

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Strong Match";
    if (score >= 40) return "Moderate Match";

    return "Needs Improvement";
  };

  const getScoreClass = (score) => {
    if (score >= 80) return "excellent";
    if (score >= 60) return "strong";
    if (score >= 40) return "moderate";

    return "low";
  };

  // Use the category returned by the backend when available.
  const atsCategory =
    matching.score_category || getScoreLabel(matchScore);

  const clampedScore = Math.max(
    0,
    Math.min(100, matchScore)
  );

  return (
    <>
      <style>{`
        /* GENERAL PAGE */

        .resume-page {
          min-height: 100vh;
          padding-bottom: 50px;
          background: #f4f7fc;
          color: #172033;
          font-family: Inter, Arial, sans-serif;
        }

        .resume-header {
          background: #ffffff;
          border-bottom: 1px solid #e7ecf4;
        }

        .resume-header-inner {
          max-width: 1180px;
          margin: auto;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand-title {
          margin: 0;
          color: #172554;
          font-size: 25px;
          font-weight: 800;
        }

        .brand-subtitle {
          margin: 6px 0 0;
          color: #718096;
          font-size: 13px;
        }

        .header-pill {
          padding: 9px 15px;
          border-radius: 30px;
          background: #eef4ff;
          color: #2459c5;
          font-size: 13px;
          font-weight: 700;
        }

        .resume-main {
          max-width: 1080px;
          margin: auto;
          padding: 42px 26px;
        }

        .page-heading {
          text-align: center;
          margin-bottom: 30px;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 10px;
          color: #3568d4;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .page-title {
          margin: 0;
          color: #172554;
          font-size: 36px;
          font-weight: 800;
        }

        .page-description {
          max-width: 680px;
          margin: 12px auto 0;
          color: #718096;
          font-size: 15px;
          line-height: 1.7;
        }

        /* UPLOAD SECTION */

        .upload-card,
        .analysis-card,
        .score-card {
          background: #ffffff;
          border: 1px solid #e5eaf2;
          border-radius: 17px;
          box-shadow: 0 8px 28px rgba(31, 55, 90, 0.045);
        }

        .upload-card {
          padding: 30px;
        }

        .upload-area {
          padding: 35px 20px;
          border: 2px dashed #c9d7ed;
          border-radius: 15px;
          text-align: center;
          background: #f8faff;
          transition: 0.2s ease;
        }

        .upload-area:hover {
          border-color: #4778df;
          background: #f3f7ff;
        }

        .upload-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 15px;
          border-radius: 17px;
          display: grid;
          place-items: center;
          background: #e6efff;
          color: #2861d5;
          font-size: 30px;
          font-weight: bold;
        }

        .upload-title {
          margin: 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 750;
        }

        .upload-description {
          margin: 8px 0 18px;
          color: #77849a;
          font-size: 13px;
        }

        .file-label,
        .upload-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border: none;
          border-radius: 10px;
          padding: 12px 20px;
          background: #2862dc;
          color: white;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .file-label:hover,
        .upload-button:hover {
          background: #1e4fb8;
        }

        .file-input {
          display: none;
        }

        .supported-files {
          margin: 15px 0 0;
          color: #97a3b5;
          font-size: 12px;
        }

        .selected-file {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-top: 18px;
          padding: 15px;
          border: 1px solid #c9dcff;
          border-radius: 12px;
          background: #f2f7ff;
        }

        .file-name {
          margin: 0;
          color: #244b91;
          font-size: 14px;
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .file-size {
          margin: 5px 0 0;
          color: #78879c;
          font-size: 12px;
        }

        .remove-button {
          border: none;
          background: transparent;
          color: #d04444;
          font-weight: 700;
          cursor: pointer;
        }

        /* JOB DESCRIPTION */

        .jd-section {
          margin-top: 25px;
        }

        .jd-label {
          display: block;
          margin-bottom: 8px;
          color: #25324a;
          font-size: 14px;
          font-weight: 750;
        }

        .jd-description {
          margin: 0 0 10px;
          color: #8490a3;
          font-size: 13px;
        }

        .jd-textarea {
          width: 100%;
          min-height: 145px;
          padding: 14px;
          border: 1px solid #d7deea;
          border-radius: 11px;
          outline: none;
          resize: vertical;
          color: #263247;
          background: white;
          font: 14px/1.6 Arial, sans-serif;
          box-sizing: border-box;
        }

        .jd-textarea:focus {
          border-color: #5681df;
          box-shadow: 0 0 0 3px rgba(40, 98, 220, 0.1);
        }

        /* MESSAGES AND BUTTONS */

        .error-message,
        .success-message {
          margin-top: 17px;
          padding: 12px 15px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
        }

        .error-message {
          color: #b42318;
          background: #fff1f0;
          border: 1px solid #ffd2ce;
        }

        .success-message {
          color: #137547;
          background: #edfff5;
          border: 1px solid #bcebd0;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }

        .back-button {
          padding: 11px 17px;
          border: 1px solid #d5dce8;
          border-radius: 10px;
          background: white;
          color: #42516a;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .back-button:hover {
          background: #f7f9fc;
        }

        .upload-button:disabled {
          background: #aebbd2;
          cursor: not-allowed;
        }

        /* ANALYSIS RESULTS */

        .analysis-section {
          margin-top: 42px;
        }

        .analysis-heading {
          margin-bottom: 20px;
          text-align: center;
        }

        .analysis-title {
          margin: 0;
          color: #172554;
          font-size: 28px;
          font-weight: 800;
        }

        .analysis-subtitle {
          margin: 7px 0 0;
          color: #8290a5;
          font-size: 13px;
          line-height: 1.6;
        }

        /* ATS MATCH SCORE */

        .score-card {
          position: relative;
          overflow: hidden;
          padding: 28px;
          margin-bottom: 17px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff, #f5f8ff);
        }

        .score-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 5px;
          background: #3972e5;
        }

        .score-label {
          margin: 0;
          color: #718096;
          font-size: 14px;
          font-weight: 650;
        }

        .score-value {
          margin: 8px 0 2px;
          color: #2862dc;
          font-size: 55px;
          line-height: 1.1;
          font-weight: 850;
        }

        .score-recommendation {
          margin: 8px 0 0;
          color: #263b63;
          font-size: 15px;
          font-weight: 800;
        }

        .score-track {
          width: min(430px, 100%);
          height: 9px;
          margin: 18px auto 0;
          overflow: hidden;
          border-radius: 99px;
          background: #e5ebf5;
        }

        .score-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #4e83ee, #245bd0);
          transition: width 0.35s ease;
        }

        .score-card.excellent .score-value {
          color: #13834f;
        }

        .score-card.strong .score-value {
          color: #2862dc;
        }

        .score-card.moderate .score-value {
          color: #c17a12;
        }

        .score-card.low .score-value {
          color: #c43d3d;
        }

        .score-note {
          max-width: 600px;
          margin: 15px auto 0;
          color: #8290a5;
          font-size: 12px;
          line-height: 1.6;
        }

        /* STATISTICS */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 17px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px;
          border: 1px solid #e5eaf2;
          border-radius: 15px;
          background: white;
          box-shadow: 0 5px 20px rgba(31, 55, 90, 0.035);
        }

        .stat-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          font-size: 19px;
          font-weight: 800;
        }

        .stat-icon.match {
          color: #13834f;
          background: #e7f8ef;
        }

        .stat-icon.missing {
          color: #c43d3d;
          background: #fff0ef;
        }

        .stat-number {
          margin: 0;
          color: #1f2d45;
          font-size: 23px;
          font-weight: 800;
        }

        .stat-label {
          margin: 3px 0 0;
          color: #7c899d;
          font-size: 12px;
        }

        /* SKILL CARDS */

        .analysis-card {
          padding: 23px 24px;
          margin-bottom: 16px;
        }

        .card-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .card-heading h4 {
          margin: 0;
          color: #24324a;
          font-size: 16px;
          font-weight: 800;
        }

        .card-count {
          padding: 5px 9px;
          border-radius: 999px;
          background: #f0f4fb;
          color: #66758d;
          font-size: 11px;
          font-weight: 750;
        }

        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border: 1px solid #d7e5ff;
          border-radius: 999px;
          background: #f0f6ff;
          color: #2859b4;
          font-size: 12px;
          font-weight: 700;
        }

        .matched-tag {
          border-color: #c5ecd5;
          background: #edfbf3;
          color: #16804c;
        }

        .missing-tag {
          border-color: #ffd2ce;
          background: #fff3f2;
          color: #bd3932;
        }

        .empty-text {
          margin: 0;
          color: #8995a7;
          font-size: 13px;
        }

        /* RESPONSIVE DESIGN */

        @media (max-width: 650px) {
          .resume-header-inner {
            padding: 17px 19px;
          }

          .brand-title {
            font-size: 21px;
          }

          .header-pill {
            display: none;
          }

          .resume-main {
            padding: 30px 16px;
          }

          .page-title {
            font-size: 29px;
          }

          .upload-card {
            padding: 19px;
          }

          .upload-area {
            padding: 30px 15px;
          }

          .actions {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .back-button,
          .upload-button {
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .analysis-card {
            padding: 19px;
          }

          .selected-file {
            align-items: flex-start;
          }

          .score-value {
            font-size: 46px;
          }
        }
      `}</style>

      <div className="resume-page">
        {/* HEADER */}

        <header className="resume-header">
          <div className="resume-header-inner">
            <div>
              <h1 className="brand-title">
                Resume Analysis
              </h1>

              <p className="brand-subtitle">
                AI-Based Resume Screening &amp; Job Recommendation
                System
              </p>
            </div>

            <div className="header-pill">
              AI Resume Insights
            </div>
          </div>
        </header>

        <main className="resume-main">
          {/* PAGE HEADING */}

          <section className="page-heading">
            <span className="eyebrow">
              Resume Intelligence
            </span>

            <h2 className="page-title">
              Analyse Your Resume
            </h2>

            <p className="page-description">
              Upload your resume and add a job description to identify
              your skills, measure compatibility, and explore suitable
              job roles.
            </p>
          </section>

          {/* UPLOAD FORM */}

          <section className="upload-card">
            <div className="upload-area">
              <div className="upload-icon">↑</div>

              <h3 className="upload-title">
                Upload Your Resume
              </h3>

              <p className="upload-description">
                Choose a resume file from your computer to get started.
              </p>

              <label
                htmlFor="resume-file"
                className="file-label"
              >
                Choose Resume
              </label>

              <input
                id="resume-file"
                type="file"
                className="file-input"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />

              <p className="supported-files">
                Supported formats: PDF, DOC, DOCX · Maximum size: 5 MB
              </p>
            </div>

            {/* SELECTED FILE */}

            {selectedFile && (
              <div className="selected-file">
                <div>
                  <p className="file-name">
                    {selectedFile.name}
                  </p>

                  <p className="file-size">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={handleRemoveFile}
                >
                  Remove
                </button>
              </div>
            )}

            {/* JOB DESCRIPTION */}

            <div className="jd-section">
              <label
                htmlFor="job-description"
                className="jd-label"
              >
                Job Description
              </label>

              <p className="jd-description">
                Paste the job description you want to compare with your
                resume.
              </p>

              <textarea
                id="job-description"
                className="jd-textarea"
                placeholder="Enter the job description here..."
                value={jobDescription}
                onChange={(event) => {
                  setJobDescription(event.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>

            {/* ERROR */}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            {/* ACTION BUTTONS */}

            <div className="actions">
              <button
                type="button"
                className="back-button"
                onClick={() => navigate("/dashboard")}
              >
                ← Back to Dashboard
              </button>

              <button
                type="button"
                className="upload-button"
                disabled={!selectedFile || uploading}
                onClick={handleUpload}
              >
                {uploading
                  ? "Analysing Resume..."
                  : "Analyse Resume →"}
              </button>
            </div>
          </section>

          {/* ANALYSIS RESULTS */}

          {analysis && (
            <section className="analysis-section">
              <div className="analysis-heading">
                <span className="eyebrow">
                  Your Results
                </span>

                <h3 className="analysis-title">
                  AI Analysis Results
                </h3>

                <p className="analysis-subtitle">
                  A summary of your resume skills and job-description
                  match.
                </p>
              </div>

              {/* ATS SCORE */}

              <div
                className={`score-card ${getScoreClass(matchScore)}`}
              >
                <p className="score-label">
                  ATS Compatibility Score
                </p>

                <div className="score-value">
                  {matchScore.toFixed(2)}%
                </div>

                <p className="score-recommendation">
                  {atsCategory}
                </p>

                <div
                  className="score-track"
                  role="progressbar"
                  aria-label="ATS compatibility score"
                  aria-valuenow={clampedScore}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="score-fill"
                    style={{
                      width: `${clampedScore}%`,
                    }}
                  />
                </div>

                <p className="score-note">
                  This score represents the percentage of required job
                  skills identified in your resume. It is an indicative
                  skill-match score, not a guarantee of passing an
                  employer's ATS screening.
                </p>
              </div>

              {/* SKILL STATISTICS */}

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon match">
                    ✓
                  </div>

                  <div>
                    <p className="stat-number">
                      {matchedSkills.length}
                    </p>

                    <p className="stat-label">
                      Matched Skills
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon missing">
                    !
                  </div>

                  <div>
                    <p className="stat-number">
                      {missingSkills.length}
                    </p>

                    <p className="stat-label">
                      Skills to Improve
                    </p>
                  </div>
                </div>
              </div>

              {/* RESUME SKILLS */}

              <div className="analysis-card">
                <div className="card-heading">
                  <h4>
                    Skills Identified in Your Resume
                  </h4>

                  <span className="card-count">
                    {resumeSkills.length} Skills
                  </span>
                </div>

                <div className="skill-list">
                  {resumeSkills.length > 0 ? (
                    resumeSkills.map((skill, index) => (
                      <span
                        className="skill-tag"
                        key={`${skill}-${index}`}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-text">
                      No skills detected.
                    </p>
                  )}
                </div>
              </div>

              {/* MATCHED SKILLS */}

              <div className="analysis-card">
                <div className="card-heading">
                  <h4>Matched Skills</h4>

                  <span className="card-count">
                    {matchedSkills.length} Found
                  </span>
                </div>

                <div className="skill-list">
                  {matchedSkills.length > 0 ? (
                    matchedSkills.map((skill, index) => (
                      <span
                        className="skill-tag matched-tag"
                        key={`${skill}-${index}`}
                      >
                        ✓ {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-text">
                      No matched skills found.
                    </p>
                  )}
                </div>
              </div>

              {/* MISSING SKILLS */}

              <div className="analysis-card">
                <div className="card-heading">
                  <h4>Missing Skills</h4>

                  <span className="card-count">
                    {missingSkills.length} To Develop
                  </span>
                </div>

                <div className="skill-list">
                  {missingSkills.length > 0 ? (
                    missingSkills.map((skill, index) => (
                      <span
                        className="skill-tag missing-tag"
                        key={`${skill}-${index}`}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="empty-text">
                      No missing skills identified.
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default ResumeUpload;
