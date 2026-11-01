const { analyzeResume } = require("../services/ai.service");

const uploadResume = async (req, res) => {
    try {
        // Check whether a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume file uploaded"
            });
        }

        // Debug: check all form-data fields received by Node
        console.log("Request body received by Node:", req.body);

        // Get Job Description from request
        const jobDescription = req.body.job_description || "";

        // Debug: check Job Description
        console.log(
            "Job Description received by Node:",
            jobDescription
        );

        console.log(
            "Resume uploaded:",
            req.file.originalname
        );

        console.log(
            "Sending resume to AI service..."
        );

        // Send resume and JD to Python AI service
        const aiResult = await analyzeResume(
            req.file.path,
            req.file.originalname,
            jobDescription
        );

        console.log(
            "AI analysis completed successfully"
        );

        // Return upload + AI analysis result
        return res.status(200).json({
            success: true,
            message: "Resume uploaded and analyzed successfully",

            file: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            },

            analysis: aiResult
        });

    } catch (error) {
        console.error(
            "Resume upload/analysis error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Resume upload or AI analysis failed",
            error: error.message
        });
    }
};

module.exports = {
    uploadResume
};