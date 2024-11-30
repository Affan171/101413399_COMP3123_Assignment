const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the user model
const bcrypt = require('bcryptjs'); // For hashing the password
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

// User Signup
router.post("/signup",[
  // Data Validation:
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Email must be valid').notEmpty(),
  body('password').isLength({min : 6}).withMessage('Password must be atleast 6 characters long') 
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
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

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        }); 
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

// User Login
router.post('/login',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min : 6}).withMessage('Password must be atleast 6 characters long')
],async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
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

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

// Export the module
module.exports = router;

// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const router = express.Router();
// const User = require('../models/user'); // Import the user model
// const bcrypt = require('bcryptjs'); // For hashing the password
// const jwt = require('jsonwebtoken'); // For generating JWT

// // User Signup
// router.post("/signup", [
//     body('username').notEmpty().withMessage('Username is required'),
//     body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     const { username, email, password } = req.body;
    
//     try {
//         // Check if the user already exists
//         const userExists = await User.findOne({ email: email.toLowerCase() }); // Convert email to lowercase
//         if (userExists) {
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({
//             username,
//             email: email.toLowerCase(), // Store email in lowercase
//             password: hashedPassword,
//         });

//         // Save the user
//         await newUser.save();
//         res.status(201).json({ success: true, message: 'User created successfully', user_id: newUser._id }); 
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });

// // User Login
// router.post('/login', [
//     body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
//     body('password').notEmpty().withMessage('Password is required'),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         // Check if the user exists
//         const user = await User.findOne({ email: email.toLowerCase() }); // Convert email to lowercase

//         if (!user) {
//             return res.status(400).json({ success: false, message: 'Invalid email or password' });
//         }

//         // Check if the password is correct
//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ success: false, message: 'Invalid email or password' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ success: true, message: 'Login successful', token, user: { id: user._id, username: user.username, email: user.email } });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });

// // Export the module
// module.exports = router;
