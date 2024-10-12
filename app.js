const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://Affan:Affskh%3F12345@cluster0.iqck3.mongodb.net/Assignment1?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
})

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/employee', employeeRoutes);

// Root endpoint:
app.get('/', (req, res) => {
  res.send('<h1>Welcome! This is my COMP3123-Assignment1</h1>');
});

// Server Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;