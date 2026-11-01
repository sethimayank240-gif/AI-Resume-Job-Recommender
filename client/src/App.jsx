import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import JobRecommendations from "./pages/JobRecommendations";
import CareerRoadmap from "./pages/CareerRoadmap";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Register */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Resume Upload & Analysis */}
      <Route
        path="/resume-upload"
        element={<ResumeUpload />}
      />

      {/* Job Recommendations */}
      <Route
        path="/job-recommendations"
        element={<JobRecommendations />}
      />

      {/* Career Roadmap */}
      <Route
        path="/career-roadmap"
        element={<CareerRoadmap />}
      />
    </Routes>
  );
}

export default App;