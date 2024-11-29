const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors')
require('dotenv').config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Allow local frontend
    'https://front-end.vercel.app' // Allow deployed frontend
  ],
  optionsSuccessStatus: 200,
}

// Apply CORS middleware before defining routes
app.use(cors(corsOptions));


const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
  console.log(MONGO_URI);
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

