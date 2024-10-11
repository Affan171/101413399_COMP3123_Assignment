const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the user model
const bcrypt = require('bcryptjs'); // For hashing the password

// User Signup
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'User already Exists'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user
        await newUser.save();
        res.status(201).json({message: 'User created successfully', user_id: newUser}) 
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

// User Login
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json("Invalid email or password");
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Invalid email or password");
        }

        res.status(200).json({message: 'Login successful', user});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

// Export the module
module.exports = router;