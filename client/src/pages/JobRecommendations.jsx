import React, { useEffect, useMemo, useState } from "react";

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [visibleSkills, setVisibleSkills] = useState({});

  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  useEffect(() => {
    try {
      let userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        try {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          userEmail = user.email || user.userEmail || "";
        } catch {
          userEmail = "";
        }
      }

      const savedAnalysis = userEmail
        ? localStorage.getItem(`resumeAnalysis_${userEmail}`)
        : null;

      const analysisData =
        savedAnalysis || localStorage.getItem("resumeAnalysis");

      if (!analysisData) {
        setError(
          "No resume analysis found. Please upload your resume and analyze it first."
        );
        return;
      }

      const analysis = JSON.parse(analysisData);
      const recommendations =
        analysis.job_recommendations ||
        analysis.jobRecommendations ||
        [];

      if (!Array.isArray(recommendations)) {
        setError(
          "Job recommendations are not available. Please analyze your resume again."
        );
        return;
      }

      setJobs(
        recommendations
          .filter((job) => {
            const company = String(job?.company || "").trim().toLowerCase();
            // Exclude the known unavailable listing, including stale cached analyses.
            return company !== "growthgear";
          })
          .sort((a, b) => getPercentage(b) - getPercentage(a))
      );
    } catch (err) {
      console.error("Error loading job recommendations:", err);
      setError(
        "Unable to load job recommendations. Please analyze your resume again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  function getPercentage(job) {
    const value = Number(
      job?.match_percentage ?? job?.matchPercentage ?? 0
    );

    return Number.isFinite(value)
      ? Math.max(0, Math.min(100, value))
      : 0;
  }

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "#15803d";
    if (percentage >= 60) return "#2563eb";
    if (percentage >= 40) return "#d97706";
    return "#dc2626";
  };

  const getMatchLabel = (percentage) => {
    if (percentage >= 80) return "Strong Match";
    if (percentage >= 60) return "Good Match";
    if (percentage >= 40) return "Moderate Match";
    return "Low Match";
  };

  const getApplicationUrl = (job) =>
    job.application_url ||
    job.applicationUrl ||
    job.apply_url ||
    job.url ||
    "";

  const getMatchedSkills = (job) => {
    if (Array.isArray(job.matched_skills)) return job.matched_skills;
    if (Array.isArray(job.matchedSkills)) return job.matchedSkills;
    return [];
  };

  const getRequiredSkills = (job) => {
    if (Array.isArray(job.required_skills)) return job.required_skills;
    if (Array.isArray(job.requiredSkills)) return job.requiredSkills;
    return [];
  };

  const getMissingSkills = (job) => {
    const existing = job.missing_skills || job.missingSkills;

    if (Array.isArray(existing)) return existing;

    const matched = new Set(
      getMatchedSkills(job).map((skill) =>
        String(skill).toLowerCase().trim()
      )
    );

    return getRequiredSkills(job).filter(
      (skill) => !matched.has(String(skill).toLowerCase().trim())
    );
  };

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs
      .filter((job) => {
        const title = String(
          job.job_role || job.jobRole || ""
        ).toLowerCase();
        const company = String(job.company || "").toLowerCase();

        return !query || title.includes(query) || company.includes(query);
      })
      .sort((a, b) => getPercentage(b) - getPercentage(a));
  }, [jobs, search]);

  const strongMatches = jobs.filter(
    (job) => getPercentage(job) >= 80
  ).length;

  const averageMatch = jobs.length
    ? Math.round(
        jobs.reduce((sum, job) => sum + getPercentage(job), 0) /
          jobs.length
      )
    : 0;

  const BackButton = () => (
    <button
      type="button"
      onClick={goToDashboard}
      style={styles.backButton}
    >
      ← Back to Dashboard
    </button>
  );

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <BackButton />
          <div style={styles.messageCard}>
            <div style={styles.spinner} />
            <h2>Finding your opportunities</h2>
            <p>Loading your personalized job recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <BackButton />
          <div style={styles.messageCard}>
            <div style={styles.messageIcon}>!</div>
            <h2>Unable to Load Recommendations</h2>
            <p style={styles.errorText}>{error}</p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/resume-upload";
              }}
              style={styles.primaryButton}
            >
              Analyze Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <BackButton />
          <div style={styles.messageCard}>
            <div style={styles.messageIcon}>⌕</div>
            <h2>No Job Recommendations Found</h2>
            <p>
              Analyze your resume first to discover jobs that match your
              skills and experience.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/resume-upload";
              }}
              style={styles.primaryButton}
            >
              Analyze Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <BackButton />

        <header style={styles.header}>
          <div style={styles.eyebrow}>YOUR NEXT CAREER MOVE</div>
          <h1 style={styles.heading}>Job Recommendations</h1>
          <p style={styles.subtitle}>
            Discover opportunities aligned with your resume, skills,
            and career goals.
          </p>
          <div style={styles.headerBadge}>
            <span style={styles.badgeDot} />
            {jobs.length} personalized opportunities
          </div>
        </header>

        <section style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>▤</div>
            <div>
              <p style={styles.statLabel}>Total Opportunities</p>
              <h2 style={styles.statNumber}>{jobs.length}</h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, ...styles.greenIcon }}>✓</div>
            <div>
              <p style={styles.statLabel}>Strong Matches</p>
              <h2 style={styles.statNumber}>{strongMatches}</h2>
              <span style={styles.statHint}>80% match or higher</span>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, ...styles.blueIcon }}>↗</div>
            <div>
              <p style={styles.statLabel}>Average Match</p>
              <h2 style={styles.statNumber}>{averageMatch}%</h2>
              <span style={styles.statHint}>Across all recommendations</span>
            </div>
          </div>
        </section>

        <section style={styles.filterPanel}>
          <div style={styles.filterHeading}>
            <div>
              <h2 style={styles.filterTitle}>Explore Opportunities</h2>
              <p style={styles.filterSubtitle}>
                Search by job title or company. Results are ranked by resume match.
              </p>
            </div>
            <span style={styles.resultCount}>{filteredJobs.length} results</span>
          </div>

          <div style={styles.filterGrid}>
            <label style={styles.field}>
              <span style={styles.fieldLabel}>Search jobs</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Job title or company..."
                style={styles.input}
              />
            </label>
          </div>

          {search && (
            <button
              type="button"
              style={styles.clearButton}
              onClick={() => setSearch("")}
            >
              Clear search ×
            </button>
          )}
        </section>

        {filteredJobs.length === 0 ? (
          <div style={styles.noResults}>
            <h3>No jobs match your search</h3>
            <p>Try another job title or company name.</p>
            <button
              type="button"
              style={styles.primaryButton}
              onClick={() => setSearch("")}
            >
              Show All Jobs
            </button>
          </div>
        ) : (
          <div style={styles.jobGrid}>
            {filteredJobs.map((job, index) => {
              const percentage = getPercentage(job);
              const matchedSkills = getMatchedSkills(job);
              const requiredSkills = getRequiredSkills(job);
              const missingSkills = getMissingSkills(job);
              const applicationUrl = getApplicationUrl(job);
              const jobTitle =
                job.job_role || job.jobRole || "Job Opportunity";

              const expanded = Boolean(visibleSkills[index]);
              const displayedRequired = expanded
                ? requiredSkills
                : requiredSkills.slice(0, 8);

              return (
                <article
                  key={`${job.company || "company"}-${jobTitle}-${index}`}
                  style={styles.jobCard}
                >
                  <div style={styles.cardTopLine}>
                    <div style={styles.companyIcon}>
                      {String(job.company || "J")
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <span
                      style={{
                        ...styles.scorePill,
                        color: getMatchColor(percentage),
                        backgroundColor: `${getMatchColor(percentage)}12`,
                      }}
                    >
                      {percentage >= 80 ? "★ " : ""}
                      {getMatchLabel(percentage)}
                    </span>
                  </div>

                  <h2 style={styles.jobTitle}>{jobTitle}</h2>
                  <p style={styles.companyName}>
                    {job.company || "Company not specified"}
                  </p>

                  <div style={styles.jobMeta}>
                    <span>📍 {job.location || "Location not specified"}</span>
                    {job.category && <span>• {job.category}</span>}
                  </div>

                  <div style={styles.matchSection}>
                    <div style={styles.matchHeader}>
                      <span style={styles.matchHeading}>Resume Match</span>
                      <strong
                        style={{
                          ...styles.matchPercentage,
                          color: getMatchColor(percentage),
                        }}
                      >
                        {percentage.toFixed(2)}%
                      </strong>
                    </div>
                    <div
                      style={styles.progressBackground}
                      role="progressbar"
                      aria-label={`${jobTitle} resume match`}
                      aria-valuenow={percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${percentage}%`,
                          backgroundColor: getMatchColor(percentage),
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.skillsSection}>
                    <h3 style={styles.sectionTitle}>
                      <span style={styles.greenDot} />
                      Matched Skills
                      <span style={styles.skillCount}>{matchedSkills.length}</span>
                    </h3>
                    {matchedSkills.length ? (
                      <div style={styles.skillList}>
                        {matchedSkills.map((skill, skillIndex) => (
                          <span
                            key={`${skill}-${skillIndex}`}
                            style={styles.matchedSkill}
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p style={styles.mutedText}>No matched skills provided.</p>
                    )}
                  </div>

                  {requiredSkills.length > 0 && (
                    <div style={styles.skillsSection}>
                      <h3 style={styles.sectionTitle}>
                        Required Skills
                        <span style={styles.skillCount}>{requiredSkills.length}</span>
                      </h3>
                      <div style={styles.skillList}>
                        {displayedRequired.map((skill, skillIndex) => (
                          <span
                            key={`${skill}-${skillIndex}`}
                            style={styles.requiredSkill}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {requiredSkills.length > 8 && (
                        <button
                          type="button"
                          style={styles.showMoreButton}
                          onClick={() =>
                            setVisibleSkills((previous) => ({
                              ...previous,
                              [index]: !previous[index],
                            }))
                          }
                        >
                          {expanded
                            ? "Show fewer skills"
                            : `Show ${requiredSkills.length - 8} more skills`}
                        </button>
                      )}
                    </div>
                  )}

                  {missingSkills.length > 0 && (
                    <div style={styles.missingSection}>
                      <h3 style={styles.sectionTitle}>
                        <span style={styles.amberDot} />
                        Skills to Develop
                      </h3>
                      <div style={styles.skillList}>
                        {missingSkills.slice(0, 5).map((skill, skillIndex) => (
                          <span
                            key={`${skill}-${skillIndex}`}
                            style={styles.missingSkill}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {missingSkills.length > 5 && (
                        <p style={styles.mutedText}>
                          +{missingSkills.length - 5} additional skills
                        </p>
                      )}
                    </div>
                  )}

                  <div style={styles.cardFooter}>
                    {applicationUrl ? (
                      <a
                        href={applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.applyButton}
                      >
                        View Application ↗
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        title="No application URL was provided for this listing."
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
        )}

        <p style={styles.disclaimer}>
          Match percentages indicate estimated skill overlap and do not
          guarantee selection. Missing skills are inferred from the
          available recommendation data. Verify each listing and its
          application details before applying.
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px 22px 44px",
    background: "linear-gradient(180deg, #f7f9ff 0%, #f1f5fb 100%)",
    boxSizing: "border-box",
    color: "#172554",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  container: { maxWidth: "1240px", margin: "0 auto" },
  backButton: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    marginBottom: "25px", padding: "10px 15px",
    border: "1px solid #dbe3f0", borderRadius: "10px",
    background: "#fff", color: "#1d4ed8", fontSize: "13px",
    fontWeight: "700", cursor: "pointer",
    boxShadow: "0 3px 10px rgba(15, 23, 42, 0.04)",
  },
  header: { textAlign: "center", margin: "0 auto 28px", maxWidth: "720px" },
  eyebrow: { marginBottom: "10px", color: "#4f46e5", fontSize: "11px", fontWeight: "800", letterSpacing: "2px" },
  heading: { margin: "0 0 10px", color: "#172554", fontSize: "clamp(27px, 4vw, 36px)", lineHeight: "1.2", fontWeight: "800", letterSpacing: "-1px" },
  subtitle: { margin: "0 auto 17px", maxWidth: "600px", color: "#64748b", fontSize: "14px", lineHeight: "1.8" },
  headerBadge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 14px", borderRadius: "30px", background: "#e9edff", color: "#4338ca", fontSize: "12px", fontWeight: "700" },
  badgeDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#6366f1" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px", marginBottom: "22px" },
  statCard: { display: "flex", alignItems: "center", gap: "14px", padding: "20px", border: "1px solid #e3eaf5", borderRadius: "15px", background: "#fff", boxShadow: "0 5px 18px rgba(15, 23, 42, 0.035)" },
  statIcon: { display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: "45px", height: "45px", borderRadius: "13px", background: "#eef2ff", color: "#4338ca", fontSize: "22px", fontWeight: "800" },
  greenIcon: { background: "#dcfce7", color: "#15803d" },
  blueIcon: { background: "#dbeafe", color: "#1d4ed8" },
  statLabel: { margin: "0 0 5px", color: "#64748b", fontSize: "12px", fontWeight: "600" },
  statNumber: { margin: 0, color: "#172554", fontSize: "25px", fontWeight: "800" },
  statHint: { display: "block", marginTop: "4px", color: "#94a3b8", fontSize: "10px" },
  filterPanel: { marginBottom: "25px", padding: "23px", border: "1px solid #e0e7f2", borderRadius: "17px", background: "#fff", boxShadow: "0 5px 18px rgba(15, 23, 42, 0.035)" },
  filterHeading: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" },
  filterTitle: { margin: "0 0 5px", color: "#1e293b", fontSize: "18px", fontWeight: "800" },
  filterSubtitle: { margin: 0, color: "#64748b", fontSize: "12px" },
  resultCount: { padding: "7px 11px", borderRadius: "8px", background: "#f1f5f9", color: "#475569", fontSize: "12px", fontWeight: "700" },
  filterGrid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "14px", width: "100%" },
  field: { display: "flex", flexDirection: "column", gap: "8px", minWidth: 0, width: "100%" },
  fieldLabel: { color: "#475569", fontSize: "12px", fontWeight: "700" },
  input: { display: "block", width: "100%", maxWidth: "100%", minWidth: 0, height: "46px", boxSizing: "border-box", padding: "0 15px", border: "1px solid #cbd5e1", borderRadius: "10px", outline: "none", background: "#fff", color: "#334155", fontSize: "13px", lineHeight: "normal", boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)" },
  clearButton: { marginTop: "14px", padding: "7px 0", border: "none", background: "transparent", color: "#4f46e5", fontSize: "12px", fontWeight: "700", cursor: "pointer" },
  jobGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "20px", alignItems: "stretch" },
  jobCard: { display: "flex", flexDirection: "column", minWidth: 0, padding: "22px", border: "1px solid #e1e8f3", borderRadius: "17px", background: "#fff", boxShadow: "0 5px 20px rgba(15, 23, 42, 0.045)", transition: "box-shadow 0.2s ease, transform 0.2s ease" },
  cardTopLine: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "17px" },
  companyIcon: { display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: "45px", height: "45px", borderRadius: "13px", background: "#e8edff", color: "#4338ca", fontSize: "20px", fontWeight: "800" },
  scorePill: { maxWidth: "65%", padding: "7px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: "800", textAlign: "center" },
  jobTitle: { margin: "0 0 7px", color: "#172554", fontSize: "18px", lineHeight: "1.45", fontWeight: "800", overflowWrap: "anywhere" },
  companyName: { margin: "0 0 10px", color: "#475569", fontSize: "13px", fontWeight: "600" },
  jobMeta: { display: "flex", flexWrap: "wrap", gap: "8px", color: "#64748b", fontSize: "11px", lineHeight: "1.6" },
  matchSection: { marginTop: "23px", padding: "15px", borderRadius: "12px", background: "#f8faff" },
  matchHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "11px" },
  matchHeading: { color: "#475569", fontSize: "12px", fontWeight: "700" },
  matchPercentage: { fontSize: "23px", fontWeight: "800" },
  progressBackground: { height: "7px", overflow: "hidden", borderRadius: "20px", background: "#e2e8f0" },
  progressFill: { height: "100%", borderRadius: "20px", transition: "width 0.3s ease" },
  skillsSection: { marginTop: "22px" },
  sectionTitle: { display: "flex", alignItems: "center", gap: "7px", margin: "0 0 12px", color: "#334155", fontSize: "12px", fontWeight: "800" },
  skillCount: { marginLeft: "auto", padding: "3px 7px", borderRadius: "20px", background: "#f1f5f9", color: "#64748b", fontSize: "10px" },
  greenDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#16a34a" },
  amberDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#d97706" },
  skillList: { display: "flex", flexWrap: "wrap", gap: "7px" },
  matchedSkill: { padding: "6px 9px", border: "1px solid #bbf7d0", borderRadius: "7px", background: "#f0fdf4", color: "#166534", fontSize: "10px", lineHeight: "1.5", overflowWrap: "anywhere" },
  requiredSkill: { padding: "6px 9px", border: "1px solid #e2e8f0", borderRadius: "7px", background: "#f8fafc", color: "#475569", fontSize: "10px", lineHeight: "1.5", overflowWrap: "anywhere" },
  missingSection: { marginTop: "19px", padding: "13px", border: "1px solid #fde68a", borderRadius: "11px", background: "#fffbeb" },
  missingSkill: { padding: "6px 9px", border: "1px solid #fed7aa", borderRadius: "7px", background: "#fff7ed", color: "#9a3412", fontSize: "10px", lineHeight: "1.5", overflowWrap: "anywhere" },
  mutedText: { margin: "8px 0 0", color: "#94a3b8", fontSize: "11px", lineHeight: "1.6" },
  showMoreButton: { marginTop: "11px", padding: "0", border: "none", background: "transparent", color: "#4338ca", fontSize: "11px", fontWeight: "800", cursor: "pointer" },
  cardFooter: { marginTop: "auto", paddingTop: "24px" },
  applyButton: { display: "block", padding: "12px 15px", border: "1px solid #2563eb", borderRadius: "10px", background: "#2563eb", color: "#fff", textAlign: "center", textDecoration: "none", fontSize: "12px", fontWeight: "800" },
  disabledButton: { width: "100%", boxSizing: "border-box", padding: "12px 9px", border: "1px solid #e2e8f0", borderRadius: "10px", background: "#f1f5f9", color: "#94a3b8", fontSize: "11px", cursor: "not-allowed" },
  primaryButton: { marginTop: "12px", padding: "11px 17px", border: "none", borderRadius: "9px", background: "#2563eb", color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer" },
  messageCard: { maxWidth: "600px", margin: "35px auto", padding: "35px 25px", border: "1px solid #e2e8f0", borderRadius: "17px", background: "#fff", boxShadow: "0 8px 25px rgba(15, 23, 42, 0.05)", textAlign: "center", color: "#64748b", lineHeight: "1.7" },
  messageIcon: { display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", margin: "0 auto 16px", borderRadius: "14px", background: "#e8edff", color: "#4338ca", fontSize: "24px", fontWeight: "800" },
  spinner: { width: "28px", height: "28px", margin: "0 auto 18px", border: "3px solid #e0e7ff", borderTop: "3px solid #4f46e5", borderRadius: "50%" },
  errorText: { color: "#b91c1c" },
  noResults: { padding: "35px 20px", border: "1px solid #e2e8f0", borderRadius: "15px", background: "#fff", textAlign: "center", color: "#64748b" },
  disclaimer: { maxWidth: "850px", margin: "30px auto 0", color: "#64748b", fontSize: "11px", lineHeight: "1.8", textAlign: "center" },
};

export default JobRecommendations;
