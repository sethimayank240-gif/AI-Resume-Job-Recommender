import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
                email: email.trim(),
                password
            }
        );

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        localStorage.setItem(
            "userEmail",
            email.trim().toLowerCase()
        );

        console.log("Login successful");
        navigate("/dashboard");
    } catch (error) {
        console.error("Login error:", error);

        if (error.response) {
            setErrorMessage(
                error.response.data?.message ||
                error.response.data?.error ||
                "Login failed. Please check your email and password."
            );
        } else if (error.request) {
            setErrorMessage(
                "Cannot connect to the server. Ensure the backend is running on port 5000."
            );
        } else {
            setErrorMessage("Something went wrong. Please try again.");
        }
    } finally {
        setLoading(false);
    }
};

return (
    <div
        style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f4f7fb",
            padding: "20px",
            boxSizing: "border-box"
        }}
    >
        <div
            style={{
                width: "100%",
                maxWidth: "420px",
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                boxSizing: "border-box"
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h1
                    style={{
                        margin: "0 0 10px",
                        fontSize: "30px",
                        fontWeight: "700",
                        color: "#1f2937"
                    }}
                >
                    Welcome Back
                </h1>

                <p
                    style={{
                        margin: 0,
                        color: "#6b7280",
                        fontSize: "14px",
                        lineHeight: "1.6"
                    }}
                >
                    AI-Based Resume Screening & Job Recommendation System
                </p>
            </div>

            {errorMessage && (
                <div
                    role="alert"
                    style={{
                        background: "#fef2f2",
                        color: "#b91c1c",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "20px",
                        fontSize: "14px"
                    }}
                >
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: "20px" }}>
                    <label
                        htmlFor="login-email"
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#374151"
                        }}
                    >
                        Email
                    </label>

                    <input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "12px 14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "25px" }}>
                    <label
                        htmlFor="login-password"
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                            color: "#374151"
                        }}
                    >
                        Password
                    </label>

                    <input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "12px 14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "13px",
                        border: "none",
                        borderRadius: "8px",
                        background: loading ? "#93b4fa" : "#2563eb",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p
                style={{
                    textAlign: "center",
                    marginTop: "25px",
                    marginBottom: 0,
                    fontSize: "14px",
                    color: "#6b7280"
                }}
            >
                Don't have an account?{" "}
                <Link
                    to="/register"
                    style={{
                        color: "#2563eb",
                        fontWeight: "600",
                        textDecoration: "none"
                    }}
                >
                    Create an account
                </Link>
            </p>

            <p
                style={{
                    textAlign: "center",
                    marginTop: "22px",
                    marginBottom: 0,
                    fontSize: "13px",
                    color: "#6b7280"
                }}
            >
                Secure login with JWT authentication
            </p>
        </div>
    </div>
);

}

export default Login;
