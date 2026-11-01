const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store decoded user information in request
        req.user = decoded;

        // Continue to protected route
        next();

    } catch (error) {
        console.error("Auth middleware error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = protect;