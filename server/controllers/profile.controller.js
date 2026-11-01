const User = require("../models/user.model");

// ===============================
// GET PROFILE
// ===============================
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile accessed successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ===============================
// UPDATE PROFILE
// ===============================
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { name, email } = req.body;

        // Check fields
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        // Find logged-in user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check whether email is already used
        const existingUser = await User.findOne({
            email: email,
            _id: { $ne: userId }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered"
            });
        }

        // Update user information
        user.name = name;
        user.email = email;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};