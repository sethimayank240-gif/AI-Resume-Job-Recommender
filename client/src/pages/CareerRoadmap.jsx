import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CareerRoadmap() {
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState([]);
  const [expandedSkills, setExpandedSkills] = useState({});

  const toggleSkill = (index) => {
    setExpandedSkills((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  useEffect(() => {
    // Get logged-in user's email.
    let userEmail = localStorage.getItem("userEmail");

    // Fallback: get email from the stored user object.
    if (!userEmail) {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        userEmail = user.email || user.userEmail || "";
      } catch {
        userEmail = "";
      }
    }

    // Get the current user's resume analysis.
    const analysisStorageKey = userEmail
      ? `resumeAnalysis_${userEmail}`
      : "resumeAnalysis";

    const savedAnalysis =
      localStorage.getItem(analysisStorageKey) ||
      localStorage.getItem("resumeAnalysis");

    if (savedAnalysis) {
      try {
        const analysis = JSON.parse(savedAnalysis);

        const careerRoadmap = analysis.career_roadmap || [];

        setRoadmap(
          Array.isArray(careerRoadmap) ? careerRoadmap : []
        );
      } catch (error) {
        console.error("Failed to load career roadmap:", error);
      }
    }
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Back to Dashboard */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e0e7ff";
            e.currentTarget.style.borderColor = "#a5b4fc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <span style={styles.backArrow}>←</span>
          Back to Dashboard
        </button>

        {/* Page Header */}
        <header style={styles.header}>
          <div style={styles.headerIcon}>✦</div>

          <div style={styles.headerBadge}>
            PERSONALIZED LEARNING PLAN
          </div>

          <h1 style={styles.heading}>Career Roadmap</h1>

          <p style={styles.subtitle}>
            Build the skills employers are looking for.
            Follow your personalized learning steps to strengthen
            your resume and improve your job match.
          </p>

          {roadmap.length > 0 && (
            <div style={styles.roadmapSummary}>
              <div style={styles.summaryItem}>
                <span style={styles.summaryNumber}>
                  {roadmap.length}
                </span>
                <span style={styles.summaryLabel}>
                  Skills to Develop
                </span>
              </div>

              <div style={styles.summaryDivider} />

              <div style={styles.summaryItem}>
                <span style={styles.summaryNumber}>
                  {roadmap.reduce(
                    (total, item) =>
                      total +
                      (Array.isArray(item.learning_steps)
                        ? item.learning_steps.length
                        : 0),
                    0
                  )}
                </span>
                <span style={styles.summaryLabel}>
                  Learning Steps
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Section Heading */}
        {roadmap.length > 0 && (
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionHeading}>
                Your Learning Plan
              </h2>

              <p style={styles.sectionSubtitle}>
                Focus on these skills to strengthen your professional profile.
              </p>
            </div>

            <span style={styles.skillCount}>
              {roadmap.length} {roadmap.length === 1 ? "Skill" : "Skills"}
            </span>
          </div>
        )}

        {/* Empty Roadmap */}
        {roadmap.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>◎</div>

            <h2 style={styles.emptyHeading}>
              Your Career Roadmap Awaits
            </h2>

            <p style={styles.emptyText}>
              Upload and analyze your resume to identify skills
              you can improve and generate your personalized
              learning roadmap.
            </p>

            <button
              type="button"
              onClick={() => navigate("/resume-upload")}
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Analyze Resume →
            </button>
          </div>
        ) : (
          /* Learning Roadmap Cards */
          <div style={styles.roadmapList}>
            {roadmap.map((item, index) => {
              const learningSteps = Array.isArray(item.learning_steps)
                ? item.learning_steps
                : [];

              return (
                <article
                  key={`${item.skill || "skill"}-${index}`}
                  style={styles.roadmapCard}
                >
                  {/* Click the skill header to expand or collapse its learning steps. */}
                  <button
                    type="button"
                    onClick={() => toggleSkill(index)}
                    aria-expanded={Boolean(expandedSkills[index])}
                    aria-controls={`learning-steps-${index}`}
                    style={styles.skillHeaderButton}
                  >
                    <div style={styles.skillHeader}>
                      <div style={styles.skillNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div style={styles.skillTitleContainer}>
                        <span style={styles.skillEyebrow}>
                          SKILL TO DEVELOP
                        </span>

                        <h3 style={styles.skillTitle}>
                          {item.skill || "Recommended Skill"}
                        </h3>
                      </div>

                      <div style={styles.headerRight}>
                        <div style={styles.stepCountBadge}>
                          {learningSteps.length}{" "}
                          {learningSteps.length === 1 ? "Step" : "Steps"}
                        </div>
                        <span
                          style={{
                            ...styles.expandIcon,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.2s ease",
                            transform: expandedSkills[index]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            fontSize: "16px",
                          }}
                          aria-hidden="true"
                        >
                          ▼
                        </span>
                      </div>
                    </div>
                  </button>

                  {expandedSkills[index] && (
                    <>
                      <div style={styles.cardDivider} />

                      <div
                        id={`learning-steps-${index}`}
                        style={styles.learningSection}
                      >
                        <h4 style={styles.learningHeading}>
                          Learning Steps
                        </h4>

                        {learningSteps.length > 0 ? (
                          <div style={styles.stepsList}>
                            {learningSteps.map((step, stepIndex) => (
                              <div key={stepIndex} style={styles.stepItem}>
                                <div style={styles.stepNumber}>
                                  {stepIndex + 1}
                                </div>
                                <p style={styles.stepText}>{step}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p style={styles.noStepsText}>
                            No learning steps are available for this skill yet.
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Small, consistent learning steps can make a meaningful
            difference in your career development.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={styles.footerButton}
          >
            ← Return to Dashboard
          </button>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fb",
    padding: "28px 24px 40px",
    boxSizing: "border-box",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#1e293b",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    marginBottom: "22px",
    padding: "11px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#334155",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease, border-color 0.2s ease",
  },

  backArrow: {
    fontSize: "18px",
    lineHeight: 1,
  },

  header: {
    position: "relative",
    overflow: "hidden",
    padding: "42px 32px 34px",
    marginBottom: "32px",
    border: "1px solid #e8edf5",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
    boxShadow: "0 10px 35px rgba(15, 23, 42, 0.05)",
    textAlign: "center",
  },

  headerIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    margin: "0 auto 17px",
    borderRadius: "14px",
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    fontSize: "26px",
  },

  headerBadge: {
    display: "inline-block",
    marginBottom: "13px",
    padding: "7px 12px",
    borderRadius: "20px",
    backgroundColor: "#eef2ff",
    color: "#4338ca",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.2px",
  },

  heading: {
    margin: "0 0 13px",
    color: "#172554",
    fontSize: "clamp(30px, 5vw, 42px)",
    lineHeight: 1.2,
    fontWeight: "750",
    letterSpacing: "-1px",
  },

  subtitle: {
    maxWidth: "650px",
    margin: "0 auto",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.8,
  },

  roadmapSummary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "25px",
    marginTop: "28px",
    padding: "16px 25px",
    border: "1px solid #e0e7ff",
    borderRadius: "14px",
    backgroundColor: "#ffffff",
  },

  summaryItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },

  summaryNumber: {
    color: "#3730a3",
    fontSize: "23px",
    fontWeight: "750",
  },

  summaryLabel: {
    color: "#64748b",
    fontSize: "12px",
  },

  summaryDivider: {
    width: "1px",
    height: "38px",
    backgroundColor: "#e2e8f0",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "20px",
  },

  sectionHeading: {
    margin: "0 0 6px",
    color: "#172554",
    fontSize: "22px",
    fontWeight: "750",
  },

  sectionSubtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
    lineHeight: 1.6,
  },

  skillCount: {
    flexShrink: 0,
    padding: "8px 12px",
    borderRadius: "9px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    fontSize: "12px",
    fontWeight: "700",
  },

  roadmapList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  roadmapCard: {
    padding: "27px 30px",
    border: "1px solid #e5eaf2",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 22px rgba(15, 23, 42, 0.045)",
    transition: "box-shadow 0.2s ease",
  },

  skillHeaderButton: {
    display: "block",
    width: "100%",
    padding: 0,
    border: "none",
    background: "transparent",
    color: "inherit",
    textAlign: "left",
    cursor: "pointer",
  },

  skillHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },

  expandIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "9px",
    backgroundColor: "#eef2ff",
    color: "#3730a3",
    fontSize: "22px",
    fontWeight: "700",
  },

  skillNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    backgroundColor: "#eef2ff",
    color: "#4338ca",
    fontSize: "18px",
    fontWeight: "800",
  },

  skillTitleContainer: {
    flex: 1,
    minWidth: 0,
  },

  skillEyebrow: {
    display: "block",
    marginBottom: "5px",
    color: "#94a3b8",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  skillTitle: {
    margin: 0,
    color: "#1d4ed8",
    fontSize: "23px",
    fontWeight: "750",
    lineHeight: 1.35,
    overflowWrap: "anywhere",
    textTransform: "capitalize",
  },

  stepCountBadge: {
    flexShrink: 0,
    padding: "7px 11px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    color: "#64748b",
    fontSize: "11px",
    fontWeight: "650",
  },

  cardDivider: {
    height: "1px",
    margin: "23px 0",
    backgroundColor: "#edf1f7",
  },

  learningSection: {
    paddingLeft: "2px",
  },

  learningHeading: {
    margin: "0 0 17px",
    color: "#334155",
    fontSize: "15px",
    fontWeight: "750",
  },

  stepsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  stepItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "13px",
    padding: "13px 15px",
    border: "1px solid #edf1f7",
    borderRadius: "11px",
    backgroundColor: "#fafbfe",
  },

  stepNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "27px",
    height: "27px",
    borderRadius: "8px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    fontSize: "12px",
    fontWeight: "800",
  },

  stepText: {
    margin: "3px 0 0",
    color: "#475569",
    fontSize: "14px",
    lineHeight: 1.7,
    overflowWrap: "anywhere",
  },

  noStepsText: {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: 1.7,
  },

  emptyCard: {
    padding: "48px 28px",
    border: "1px solid #e5eaf2",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 28px rgba(15, 23, 42, 0.05)",
    textAlign: "center",
  },

  emptyIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "65px",
    height: "65px",
    margin: "0 auto 20px",
    borderRadius: "18px",
    backgroundColor: "#eef2ff",
    color: "#4338ca",
    fontSize: "34px",
  },

  emptyHeading: {
    margin: "0 0 12px",
    color: "#172554",
    fontSize: "23px",
    fontWeight: "750",
  },

  emptyText: {
    maxWidth: "500px",
    margin: "0 auto",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.8,
  },

  primaryButton: {
    marginTop: "25px",
    padding: "13px 23px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    marginTop: "35px",
    padding: "25px 15px 5px",
    borderTop: "1px solid #e2e8f0",
    textAlign: "center",
  },

  footerText: {
    maxWidth: "550px",
    margin: 0,
    color: "#64748b",
    fontSize: "12px",
    lineHeight: 1.8,
  },

  footerButton: {
    padding: "11px 19px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    backgroundColor: "#ffffff",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "650",
    cursor: "pointer",
  },
};

export default CareerRoadmap;