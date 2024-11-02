// controllers/userController.js
import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userSchema.js";


const router = express.Router();

router.post("/register", asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
}));



router.get("/", asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
}));

// Login route (validate user credentials while logging)
router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User does not exist. Please check your email or sign up." });
    }

    // Calling the matchPassword method on the user instance
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password. Please try again." });
    }

    // Return success response if credentials are valid
    res.status(200).json({ message: "Login successful", user });
}));


export default router;
