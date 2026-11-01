import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log("Registration successful");
            console.log("Server response:", response.data);

            alert("Registration successful! Please login.");

            navigate("/login");

        } catch (error) {
            console.error("Registration error:", error);

            if (error.response) {
                console.log(
                    "Server response:",
                    error.response.data
                );

                alert(
                    error.response.data.message ||
                    "Registration failed"
                );
            } else {
                alert("Unable to connect to server");
            }
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
                padding: "20px"
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.1)"
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    <h1
                        style={{
                            margin: "0 0 10px",
                            fontSize: "30px",
                            color: "#1f2937"
                        }}
                    >
                        Create Account
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            color: "#6b7280",
                            fontSize: "14px"
                        }}
                    >
                        Create your account to use the
                        AI Resume Screening System
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        textAlign: "left"
                    }}
                >
                    {/* Name */}
                    <div
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#374151",
                                textAlign: "left"
                            }}
                        >
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "12px 14px",
                                border:
                                    "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "15px",
                                textAlign: "left"
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#374151",
                                textAlign: "left"
                            }}
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "12px 14px",
                                border:
                                    "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "15px",
                                textAlign: "left"
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div
                        style={{
                            marginBottom: "25px"
                        }}
                    >
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#374151",
                                textAlign: "left"
                            }}
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "12px 14px",
                                border:
                                    "1px solid #d1d5db",
                                borderRadius: "8px",
                                fontSize: "15px",
                                textAlign: "left"
                            }}
                        />
                    </div>

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "13px",
                            border: "none",
                            borderRadius: "8px",
                            background: "#2563eb",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        Create Account
                    </button>
                </form>

                {/* Login Link */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "25px",
                        color: "#6b7280",
                        fontSize: "14px"
                    }}
                >
                    Already have an account?{" "}

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                        style={{
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;