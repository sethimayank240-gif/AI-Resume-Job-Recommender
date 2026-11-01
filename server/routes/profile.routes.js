const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/profile.controller");


// GET PROFILE
router.get("/profile", protect, getProfile);


// UPDATE PROFILE
router.put("/profile", protect, updateProfile);


module.exports = router;