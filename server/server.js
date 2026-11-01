const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const resumeRoutes = require("./routes/resume.routes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/resume", resumeRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Resume Job Recommender API is running"
    });
});

// Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();