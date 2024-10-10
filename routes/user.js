const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to users.json file stroing users.
const userFilePath = path.join(__dirname, '../data/users.json');

// Reading users from users.json
const readUsers = () => {
    const userData = fs.readFileSync(userFilePath);
    return JSON.parse(userData);
}

// Writing user to user.json
const writeUsers = (users) => {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
};

// Route for signup.
router.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    // Reading data from users.json file
    const users = readUsers();

    const existingUser = users.find(user => user.email === email);
    // If exisitingUser returns true, user already exist.
    if (existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }

    // If user doesnot exist, create new user.
    const newUser = {id: users.length + 1, username, email, password};
    users.push(newUser);

    writeUsers(users);
    res.status(201).json({message: 'User created successfully', user: newUser});
})

// Route for login
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const users = readUsers();

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({message: 'Invalid email or password'});
    }
    
    res.status(200).json({message: 'Login successful'});
});

module.exports = router;
