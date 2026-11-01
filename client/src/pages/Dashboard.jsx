import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Go to Profile page
  const handleProfile = () => {
    navigate("/profile");
  };

  // Go to Resume Upload page
  const handleResumeAnalysis = () => {
    navigate("/resume-upload");
  };

  // Go to Job Recommendations page
  const handleJobRecommendations = () => {
    navigate("/job-recommendations");
  };

  // Go to Career Roadmap page
  const handleCareerRoadmap = () => {
    navigate("/career-roadmap");
  };

  // Logout using the existing JWT token
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          min-height: 100vh;
          width: 100%;
          background: #f5f7fb;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
          text-align: left;
        }

        .dashboard-header {
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .dashboard-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .brand-section {
          min-width: 0;
        }

        .dashboard-title {
          margin: 0;
          font-size: 28px;
          line-height: 1.2;
          font-weight: 700;
          color: #111827;
        }

        .dashboard-subtitle {
          margin: 7px 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: #6b7280;
        }

        .dashboard-navigation {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-item {
          padding: 10px 15px;
          border: none !important;
          border-radius: 9px;
          background: transparent !important;
          color: #6b7280;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: none !important;
        }

        .nav-item:hover {
          background: #f3f4f6 !important;
          color: #111827;
        }

        .nav-item.active {
          background: #eff6ff !important;
          color: #2563eb;
        }

        .profile-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .profile-icon,
        .logout-icon {
          width: 17px !important;
          height: 17px !important;
          max-width: 17px !important;
          max-height: 17px !important;
          display: block;
        }

        .logout-nav {
          color: #dc2626;
        }

        .logout-nav:hover {
          background: #fef2f2 !important;
          color: #b91c1c;
        }

        .career-badge {
          padding: 9px 16px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
        }

        .dashboard-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 50px 32px 60px;
        }

        .welcome-section {
          margin-bottom: 42px;
        }

        .welcome-title {
          margin: 0;
          font-size: 36px;
          line-height: 1.2;
          font-weight: 700;
          color: #111827;
        }

        .welcome-text {
          max-width: 720px;
          margin: 12px 0 0;
          font-size: 16px;
          line-height: 1.7;
          color: #6b7280;
        }

        .section-title {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          color: #111827;
        }

        .section-description {
          margin: 7px 0 0;
          font-size: 14px;
          color: #6b7280;
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 24px;
        }

        .dashboard-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 28px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.10);
        }

        .icon-box {
          width: 52px;
          height: 52px;
          min-width: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
        }

        .icon-blue {
          background: #dbeafe;
          color: #2563eb;
        }

        .icon-green {
          background: #dcfce7;
          color: #16a34a;
        }

        .icon-purple {
          background: #f3e8ff;
          color: #9333ea;
        }

        .dashboard-icon {
          width: 25px !important;
          height: 25px !important;
          max-width: 25px !important;
          max-height: 25px !important;
          display: block;
        }

        .card-title {
          margin: 0;
          font-size: 20px;
          line-height: 1.4;
          font-weight: 700;
          color: #111827;
        }

        .card-text {
          margin: 12px 0 0;
          font-size: 14px;
          line-height: 1.7;
          color: #6b7280;
        }

        .card-button {
          margin-top: auto;
          padding: 0;
          padding-top: 22px;
          border: none !important;
          background: transparent !important;
          color: #2563eb;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          box-shadow: none !important;
          outline: none;
        }

        .card-button:hover {
          color: #1d4ed8;
          background: transparent !important;
        }

        .green-button {
          color: #16a34a;
        }

        .green-button:hover {
          color: #15803d;
        }

        .purple-button {
          color: #9333ea;
        }

        .purple-button:hover {
          color: #7e22ce;
        }

        .career-section {
          margin-top: 30px;
          padding: 28px 30px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .career-title {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
          color: #111827;
        }

        .career-text {
          max-width: 750px;
          margin: 8px 0 0;
          font-size: 14px;
          line-height: 1.7;
          color: #6b7280;
        }

        .career-label {
          padding: 11px 16px;
          border-radius: 10px;
          background: #f3f4f6;
          color: #4b5563;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }

        @media (max-width: 1100px) {
          .career-badge {
            display: none;
          }
        }

        @media (max-width: 1000px) {
          .dashboard-navigation {
            display: none;
          }

          .cards-container {
            grid-template-columns: 1fr;
          }

          .dashboard-card {
            min-height: 250px;
          }
        }

        @media (max-width: 600px) {
          .dashboard-header-inner {
            padding: 18px 20px;
          }

          .dashboard-main {
            padding: 35px 20px 45px;
          }

          .welcome-title {
            font-size: 30px;
          }

          .dashboard-title {
            font-size: 24px;
          }

          .career-section {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="dashboard-page">

        {/* HEADER */}
        <header className="dashboard-header">
          <div className="dashboard-header-inner">

            <div className="brand-section">
              <h1 className="dashboard-title">
                Dashboard
              </h1>

              <p className="dashboard-subtitle">
                AI-Based Resume Screening & Job Recommendation System
              </p>
            </div>

            <nav className="dashboard-navigation">

              <button
                type="button"
                className="nav-item active"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>

              <button
                type="button"
                className="nav-item profile-nav"
                onClick={handleProfile}
              >
                <svg
                  className="profile-icon"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                </svg>

                Profile
              </button>

              <button
                type="button"
                className="nav-item profile-nav logout-nav"
                onClick={handleLogout}
              >
                <svg
                  className="logout-icon"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>

                Logout
              </button>

            </nav>

            <div className="career-badge">
              Career Assistant
            </div>

          </div>
        </header>

        {/* MAIN */}
        <main className="dashboard-main">

          <section className="welcome-section">

            <h2 className="welcome-title">
              Welcome back!
            </h2>

            <p className="welcome-text">
              Analyse your resume, discover relevant job opportunities,
              and identify the skills you need to build your career.
            </p>

          </section>

          <section>

            <h3 className="section-title">
              What would you like to do?
            </h3>

            <p className="section-description">
              Choose an option to get started.
            </p>

            <div className="cards-container">

              {/* Resume Analysis */}
              <div className="dashboard-card">

                <div className="icon-box icon-blue">

                  <svg
                    className="dashboard-icon"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="14" y2="17" />
                  </svg>

                </div>

                <h4 className="card-title">
                  Resume Analysis
                </h4>

                <p className="card-text">
                  Upload your resume and analyse your skills,
                  experience, and job compatibility.
                </p>

                <button
                  type="button"
                  className="card-button"
                  onClick={handleResumeAnalysis}
                >
                  Analyse Resume →
                </button>

              </div>

              {/* Job Recommendations */}
              <div className="dashboard-card">

                <div className="icon-box icon-green">

                  <svg
                    className="dashboard-icon"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="18"
                      height="13"
                      rx="2"
                    />

                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />

                    <line
                      x1="3"
                      y1="12"
                      x2="21"
                      y2="12"
                    />

                    <line
                      x1="10"
                      y1="16"
                      x2="14"
                      y2="16"
                    />

                  </svg>

                </div>

                <h4 className="card-title">
                  Job Recommendations
                </h4>

                <p className="card-text">
                  Find job opportunities that match your resume,
                  skills, and career interests.
                </p>

                <button
                  type="button"
                  className="card-button green-button"
                  onClick={handleJobRecommendations}
                >
                  Explore Jobs →
                </button>

              </div>

              {/* Career Roadmap */}
              <div className="dashboard-card">

                <div className="icon-box icon-purple">

                  <svg
                    className="dashboard-icon"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>

                </div>

                <h4 className="card-title">
                  Career Roadmap
                </h4>

                <p className="card-text">
                  Identify missing skills and get a basic roadmap
                  to improve your career readiness.
                </p>

                <button
                  type="button"
                  className="card-button purple-button"
                  onClick={handleCareerRoadmap}
                >
                  View Roadmap →
                </button>

              </div>

            </div>

          </section>

          {/* Career Information */}
          <section className="career-section">

            <div>

              <h3 className="career-title">
                Start your career journey
              </h3>

              <p className="career-text">
                Begin by analysing your resume and understanding
                how well your skills match your target roles.
              </p>

            </div>

            <div className="career-label">
              AI-powered career assistance
            </div>

          </section>

        </main>

      </div>
    </>
  );
};

export default Dashboard;