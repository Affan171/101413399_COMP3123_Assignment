const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Employee = require('../models/employee'); // Import the employee model
const authenticateToken = require('../middleware/authMiddleware'); // Import the auth middleware

// Get All Employees (Protected)
router.get('/employees', authenticateToken, async (req, res) => {
    try {
        const employees = await Employee.find();
        if (employees.length === 0) {
            return res.status(400).json({ message: "No employees found" });
        }
        res.status(200).json(employees);
    } catch (error) {
        console.log("Error fetching employees", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create a New Employee (Protected)
router.post('/employees', [
    authenticateToken, // Protect this route
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('department').notEmpty().withMessage('Department is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, position, salary, department } = req.body;

    try {
        const employeeExists = await Employee.findOne({ email });
        if (employeeExists) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            department
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', newEmployee });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Get Employee by ID (Protected)
router.get('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update Employee (Protected)
router.put('/employees/:id', [
    authenticateToken, // Protect this route
    body('first_name').optional().notEmpty().withMessage('First name is required'),
    body('last_name').optional().notEmpty().withMessage('Last name is required'),
    body('email').optional().isEmail().withMessage('Email must be valid'),
    body('position').optional().notEmpty().withMessage('Position is required'),
    body('salary').optional().isNumeric().withMessage('Salary must be a number'),
    body('department').optional().notEmpty().withMessage('Department is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { first_name, last_name, email, position, salary, department } = req.body;

    try {
        if (email) {
            const existingEmployee = await Employee.findOne({ email: email.toLowerCase(), _id: { $ne: req.params.id } });
            if (existingEmployee) {
                return res.status(400).json({ message: 'Email already in use by another employee' });
            }
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, email, position, salary, department },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee Updated', updatedEmployee });

    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Delete Employee (Protected)
router.delete('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Export the module
module.exports = router;
