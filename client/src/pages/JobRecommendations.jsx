
import React, { useEffect, useState } from "react";

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Navigate back to the dashboard.
  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  useEffect(() => {
    try {
      // Get the logged-in user's email.
      let userEmail = localStorage.getItem("userEmail");

      // Fallback: get the email from the stored user object.
      if (!userEmail) {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          userEmail = user.email || user.userEmail || "";
        } catch {
          userEmail = "";
        }
      }

      // Load the analysis associated with the current user.
      const savedAnalysis = userEmail
        ? localStorage.getItem(`resumeAnalysis_${userEmail}`)
        : null;

      // Fallback for the existing general analysis key.
      const analysisData =
        savedAnalysis || localStorage.getItem("resumeAnalysis");

      if (!analysisData) {
        setJobs([]);
        setError(
          "No resume analysis found. Please upload your resume and analyze it first."
        );
        return;
      }

      const analysis = JSON.parse(analysisData);

      // Support both existing recommendation property names.
      const recommendations =
        analysis.job_recommendations ||
        analysis.jobRecommendations ||
        [];

      if (!Array.isArray(recommendations)) {
        setJobs([]);
        setError(
          "Job recommendations are not available. Please analyze your resume again."
        );
        return;
      }

      // Sort by match percentage, highest first.
      // Hiring status is not displayed.
      const sortedJobs = [...recommendations].sort((a, b) => {
        const matchA = Number(
          a.match_percentage ?? a.matchPercentage ?? 0
        );

        const matchB = Number(
          b.match_percentage ?? b.matchPercentage ?? 0
        );

        return matchB - matchA;
      });

      setJobs(sortedJobs);
    } catch (err) {
      console.error("Error loading job recommendations:", err);

      setError(
        "Unable to load job recommendations. Please analyze your resume again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "#15803d";
    if (percentage >= 60) return "#2563eb";
    if (percentage >= 40) return "#d97706";
    return "#dc2626";
  };

  const getMatchLabel = (percentage) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Strong Match";
    if (percentage >= 40) return "Moderate Match";
    return "Low Match";
  };

  const getApplicationUrl = (job) => {
    return (
      job.application_url ||
      job.applicationUrl ||
      job.apply_url ||
      job.url ||
      ""
    );
  };

  const getMatchedSkills = (job) => {
    return Array.isArray(job.matched_skills)
      ? job.matched_skills
      : Array.isArray(job.matchedSkills)
        ? job.matchedSkills
        : [];
  };

  const getRequiredSkills = (job) => {
    return Array.isArray(job.required_skills)
      ? job.required_skills
      : Array.isArray(job.requiredSkills)
        ? job.requiredSkills
        : [];
  };

  // Reusable Back to Dashboard button.
  const BackToDashboardButton = () => (
    <button
      type="button"
      onClick={goToDashboard}
      style={styles.backButton}
    >
      ← Back to Dashboard
    </button>
  );

  // Loading screen.
  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <BackToDashboardButton />

          <div style={styles.messageCard}>
            <p>Loading job recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error screen.
  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <BackToDashboardButton />

          <div style={styles.messageCard}>
            <h2>Job Recommendations</h2>
            <p style={styles.errorText}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty recommendations screen.
  if (jobs.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <BackToDashboardButton />

          <div style={styles.messageCard}>
            <h2>No Job Recommendations Found</h2>

            <p>
              No matching job listings are available for your current
              resume analysis. Try analyzing your resume with relevant
              skills.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main job recommendations page.
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Back to Dashboard */}
        <BackToDashboardButton />

        {/* Page heading */}
        <div style={styles.header}>
          <h1 style={styles.heading}>Job Recommendations</h1>

          <p style={styles.subtitle}>
            Explore jobs selected according to your resume skills and
            match percentage.
          </p>

          <div style={styles.summary}>
            <span style={styles.summaryNumber}>{jobs.length}</span>
            <span>recommended job listings</span>
          </div>
        </div>

        {/* Job cards */}
        <div style={styles.jobGrid}>
          {jobs.map((job, index) => {
            const percentage = Math.max(
              0,
              Math.min(
                100,
                Number(
                  job.match_percentage ??
                    job.matchPercentage ??
                    0
                )
              )
            );

            const matchedSkills = getMatchedSkills(job);
            const requiredSkills = getRequiredSkills(job);
            const applicationUrl = getApplicationUrl(job);

            return (
              <article
                key={`${job.company || "company"}-${
                  job.job_role || job.jobRole || "role"
                }-${index}`}
                style={styles.jobCard}
              >
                {/* Company and job details */}
                <div style={styles.cardHeader}>
                  <div style={styles.companyIcon}>
                    {(job.company || "J")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div style={styles.titleSection}>
                    <h2 style={styles.jobTitle}>
                      {job.job_role ||
                        job.jobRole ||
                        "Job Opportunity"}
                    </h2>

                    <p style={styles.companyName}>
                      {job.company || "Company not specified"}
                    </p>

                    <p style={styles.location}>
                      📍 {job.location || "Location not specified"}
                    </p>
                  </div>
                </div>

                {/* Job category */}
                {job.category && (
                  <div style={styles.categoryWrapper}>
                    <span style={styles.categoryBadge}>
                      {job.category}
                    </span>
                  </div>
                )}

                {/* Resume match percentage */}
                <div style={styles.matchSection}>
                  <div style={styles.matchHeader}>
                    <span style={styles.matchHeading}>
                      Resume Match
                    </span>

                    <span
                      style={{
                        ...styles.matchPercentage,
                        color: getMatchColor(percentage),
                      }}
                    >
                      {percentage.toFixed(2)}%
                    </span>
                  </div>

                  <div style={styles.progressBackground}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${percentage}%`,
                        backgroundColor: getMatchColor(percentage),
                      }}
                    />
                  </div>

                  <span
                    style={{
                      ...styles.matchLabel,
                      color: getMatchColor(percentage),
                    }}
                  >
                    {getMatchLabel(percentage)}
                  </span>
                </div>

                {/* Matched skills */}
                {matchedSkills.length > 0 && (
                  <div style={styles.skillsSection}>
                    <h3 style={styles.sectionTitle}>
                      Matched Skills
                    </h3>

                    <div style={styles.skillList}>
                      {matchedSkills.map((skill, skillIndex) => (
                        <span
                          key={`${skill}-${skillIndex}`}
                          style={styles.matchedSkill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Required skills */}
                {requiredSkills.length > 0 && (
                  <div style={styles.skillsSection}>
                    <h3 style={styles.sectionTitle}>
                      Required Skills
                    </h3>

                    <div style={styles.skillList}>
                      {requiredSkills.map((skill, skillIndex) => (
                        <span
                          key={`${skill}-${skillIndex}`}
                          style={styles.requiredSkill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Application button */}
                <div style={styles.cardFooter}>
                  {applicationUrl ? (
                    <a
                      href={applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.applyButton}
                    >
                      Apply Now ↗
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      style={styles.disabledButton}
                    >
                      Application Link Unavailable
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p style={styles.disclaimer}>
          Match percentages indicate skill overlap, not a guarantee
          of selection. Job availability may change. Please verify
          the listing on the external application website before
          applying.
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px 20px",
    backgroundColor: "#f4f7fb",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
    padding: "11px 18px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    backgroundColor: "#ffffff",
    color: "#1e40af",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(15, 23, 42, 0.05)",
  },

  header: {
    marginBottom: "30px",
    textAlign: "center",
  },

  heading: {
    margin: "0 0 10px",
    color: "#172554",
    fontSize: "30px",
    fontWeight: "700",
  },

  subtitle: {
    margin: "0 0 18px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.6",
  },

  summary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 15px",
    borderRadius: "10px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    fontSize: "14px",
  },

  summaryNumber: {
    fontSize: "20px",
    fontWeight: "700",
  },

  jobGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
    alignItems: "stretch",
  },

  jobCard: {
    display: "flex",
    flexDirection: "column",
    padding: "22px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
    minWidth: 0,
  },

  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "13px",
  },

  companyIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "46px",
    height: "46px",
    borderRadius: "12px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    fontSize: "21px",
    fontWeight: "700",
  },

  titleSection: {
    flex: 1,
    minWidth: 0,
  },

  jobTitle: {
    margin: "0 0 7px",
    color: "#1e293b",
    fontSize: "17px",
    lineHeight: "1.45",
    overflowWrap: "anywhere",
  },

  companyName: {
    margin: "0 0 6px",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "600",
  },

  location: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },

  categoryWrapper: {
    marginTop: "15px",
  },

  categoryBadge: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "20px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    fontSize: "12px",
    fontWeight: "600",
  },

  matchSection: {
    marginTop: "22px",
  },

  matchHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "10px",
  },

  matchHeading: {
    color: "#334155",
    fontSize: "14px",
    fontWeight: "600",
  },

  matchPercentage: {
    fontSize: "21px",
    fontWeight: "700",
  },

  progressBackground: {
    height: "8px",
    overflow: "hidden",
    borderRadius: "10px",
    backgroundColor: "#e2e8f0",
  },

  progressFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },

  matchLabel: {
    display: "inline-block",
    marginTop: "8px",
    fontSize: "12px",
    fontWeight: "600",
  },

  skillsSection: {
    marginTop: "20px",
  },

  sectionTitle: {
    margin: "0 0 10px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
  },

  skillList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
  },

  matchedSkill: {
    padding: "5px 9px",
    borderRadius: "6px",
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
  },

  requiredSkill: {
    padding: "5px 9px",
    borderRadius: "6px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    fontSize: "12px",
  },

  cardFooter: {
    marginTop: "auto",
    paddingTop: "22px",
  },

  applyButton: {
    display: "block",
    padding: "12px 16px",
    borderRadius: "9px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "700",
  },

  disabledButton: {
    width: "100%",
    padding: "12px 10px",
    border: "none",
    borderRadius: "9px",
    backgroundColor: "#cbd5e1",
    color: "#475569",
    fontSize: "13px",
    cursor: "not-allowed",
  },

  messageCard: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "30px",
    borderRadius: "14px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
    textAlign: "center",
    color: "#475569",
    lineHeight: "1.6",
  },

  errorText: {
    color: "#b91c1c",
  },

  disclaimer: {
    marginTop: "30px",
    color: "#64748b",
    fontSize: "12px",
    lineHeight: "1.7",
    textAlign: "center",
  },
};

export default JobRecommendations;