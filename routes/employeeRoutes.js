const express = require('express');
const router = express.Router();
const Employee = require('../models/employee'); // Import the employee model

// Get All employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        if (employees.length == 0) {
            return res.status(400).json({message: "No employees found"});
        }
        res.status(200).json(employees);
    } catch (error) {
        console.log("Error fetching employees", error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// Create a new Employee
router.post('/employees', async(req, res) => {
    const {first_name, last_name, email, position, salary, department } = req.body;

    try {
        const employeeExists = await Employee.findOne({email});
        if (employeeExists) {
            return res.status(400).json({message: 'Employee already exists'});
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
        res.status(201).json({message: 'Employee created successfully', newEmployee});
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});

// Get Employee by Id
router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({message: 'Employee not found'});
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

// Update Employee
router.put('/employees/:id', async (req, res) => {
    const {first_name, last_name, email, position, salary, department} = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {first_name, last_name, email, position, salary, department },
            {new: true}
        );

        if (!updatedEmployee) {
            return res.status(404).json({message: 'Employee not found'});
        }

        res.status(200).json({message: 'Employee Updated', updatedEmployee});

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// Delete Employee
router.delete('/employees/:id', async(req, res) => {
    try {
       const deletedEmployee = await Employee.findByIdAndDelete(req.params.id); 
       if (!deletedEmployee) {
            return res.status(404).json({message:'Employee not found'});
       }

       res.status(204).json({message: 'Employee deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// Export the module
module.exports = router;