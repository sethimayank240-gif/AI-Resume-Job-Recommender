const axios = require("axios");
const FormData = require("form-data");

const AI_SERVICE_URL = "http://127.0.0.1:8000";

async function analyzeResume(filePath, originalName, jobDescription) {
    try {
        const formData = new FormData();

        formData.append(
            "file",
            require("fs").createReadStream(filePath),
            {
                filename: originalName
            }
        );

        const response = await axios.post(
            `${AI_SERVICE_URL}/analyze-resume`,
            formData,
            {
                params: {
                    job_description: jobDescription || ""
                },

                headers: {
                    ...formData.getHeaders()
                },

                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        return response.data;

    } catch (error) {
        console.error(
            "AI service request failed:",
            error.response?.data || error.message
        );

        throw new Error("AI service analysis failed");
    }
}

module.exports = {
    analyzeResume
};