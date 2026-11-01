import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token means the user is not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.user);
      } catch (err) {
        console.error("Profile error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Unable to load profile information.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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

        .profile-page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* =========================
           HEADER
        ========================= */

        .profile-header {
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .profile-header-inner {
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

        .brand-title {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .brand-subtitle {
          margin: 7px 0 0;
          font-size: 14px;
          color: #6b7280;
        }

        .profile-navigation {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-button {
          padding: 10px 15px;
          border: none !important;
          border-radius: 9px;
          background: transparent !important;
          color: #6b7280;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: none !important;
          transition: all 0.2s ease;
        }

        .nav-button:hover {
          background: #f3f4f6 !important;
          color: #111827;
        }

        .nav-button.active {
          background: #eff6ff !important;
          color: #2563eb;
        }

        .logout-button {
          color: #dc2626;
        }

        .logout-button:hover {
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

        /* =========================
           MAIN
        ========================= */

        .profile-main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 55px 32px 70px;
        }

        .page-heading {
          margin-bottom: 30px;
        }

        .page-title {
          margin: 0;
          font-size: 36px;
          font-weight: 700;
          color: #111827;
        }

        .page-description {
          margin: 10px 0 0;
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
        }

        /* =========================
           PROFILE CARD
        ========================= */

        .profile-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 35px;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.05);
        }

        .profile-top {
          display: flex;
          align-items: center;
          gap: 22px;
          padding-bottom: 30px;
          border-bottom: 1px solid #e5e7eb;
        }

        .avatar {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background: #dbeafe;
          color: #2563eb;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 30px;
          font-weight: 700;

          flex-shrink: 0;
        }

        .profile-name {
          margin: 0;
          font-size: 25px;
          font-weight: 700;
          color: #111827;
        }

        .profile-role {
          margin: 7px 0 0;
          color: #6b7280;
          font-size: 14px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          margin-top: 10px;
          padding: 6px 11px;

          border-radius: 999px;
          background: #dcfce7;
          color: #15803d;

          font-size: 12px;
          font-weight: 600;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
        }

        /* =========================
           INFORMATION
        ========================= */

        .information-title {
          margin: 30px 0 20px;
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .information-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .information-item {
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fafafa;
        }

        .information-label {
          margin: 0 0 7px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .information-value {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          word-break: break-word;
        }

        /* =========================
           ACTIONS
        ========================= */

        .profile-actions {
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid #e5e7eb;

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .dashboard-button {
          padding: 11px 18px;
          border: 1px solid #d1d5db !important;
          border-radius: 9px;
          background: #ffffff !important;
          color: #374151;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: none !important;
        }

        .dashboard-button:hover {
          background: #f9fafb !important;
        }

        .main-logout-button {
          padding: 11px 18px;
          border: none !important;
          border-radius: 9px;
          background: #dc2626 !important;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: none !important;
        }

        .main-logout-button:hover {
          background: #b91c1c !important;
        }

        /* =========================
           LOADING / ERROR
        ========================= */

        .message-card {
          padding: 40px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          text-align: center;
          color: #6b7280;
        }

        .error-message {
          color: #dc2626;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 1100px) {
          .career-badge {
            display: none;
          }
        }

        @media (max-width: 800px) {
          .profile-navigation {
            display: none;
          }

          .information-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .profile-header-inner {
            padding: 18px 20px;
          }

          .profile-main {
            padding: 35px 20px 50px;
          }

          .brand-title {
            font-size: 24px;
          }

          .page-title {
            font-size: 30px;
          }

          .profile-card {
            padding: 25px;
          }

          .profile-top {
            align-items: flex-start;
          }

          .avatar {
            width: 65px;
            height: 65px;
            font-size: 24px;
          }

          .profile-name {
            font-size: 21px;
          }

          .profile-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .dashboard-button,
          .main-logout-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="profile-page">

        {/* =========================
            HEADER
        ========================= */}

        <header className="profile-header">

          <div className="profile-header-inner">

            <div className="brand-section">

              <h1 className="brand-title">
                Profile
              </h1>

              <p className="brand-subtitle">
                AI-Based Resume Screening & Job Recommendation System
              </p>

            </div>

            <nav className="profile-navigation">

              <button
                type="button"
                className="nav-button"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>

              <button
                type="button"
                className="nav-button active"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>

              <button
                type="button"
                className="nav-button logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </nav>

            <div className="career-badge">
              Career Assistant
            </div>

          </div>

        </header>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="profile-main">

          <section className="page-heading">

            <h2 className="page-title">
              Your Profile
            </h2>

            <p className="page-description">
              View your account information and manage your Career Assistant account.
            </p>

          </section>

          {/* Loading */}
          {loading && (
            <div className="message-card">
              Loading profile...
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="message-card error-message">
              {error}
            </div>
          )}

          {/* Profile */}
          {!loading && !error && user && (

            <section className="profile-card">

              {/* Profile header */}
              <div className="profile-top">

                <div className="avatar">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div>

                  <h3 className="profile-name">
                    {user.name || "User"}
                  </h3>

                  <p className="profile-role">
                    Career Assistant User
                  </p>

                  <div className="status-badge">

                    <span className="status-dot"></span>

                    Account Active

                  </div>

                </div>

              </div>

              {/* Information */}
              <h3 className="information-title">
                Account Information
              </h3>

              <div className="information-grid">

                <div className="information-item">

                  <p className="information-label">
                    Full Name
                  </p>

                  <p className="information-value">
                    {user.name || "Not available"}
                  </p>

                </div>

                <div className="information-item">

                  <p className="information-label">
                    Email Address
                  </p>

                  <p className="information-value">
                    {user.email || "Not available"}
                  </p>

                </div>

              </div>

              {/* Actions */}
              <div className="profile-actions">

                <button
                  type="button"
                  className="dashboard-button"
                  onClick={() => navigate("/dashboard")}
                >
                  ← Back to Dashboard
                </button>

                <button
                  type="button"
                  className="main-logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            </section>

          )}

        </main>

      </div>
    </>
  );
};

export default Profile;