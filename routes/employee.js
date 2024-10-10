const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

employeeFilePath = path.join(__dirname, '../data/employees.json');

// Read Employees:
const readEmployees = () => {
    const employeeData = fs.readFileSync(employeeFilePath);
    return JSON.parse(employeeData);
}

// Write Employees:
const writeEmployees = (employees) => {
    fs.writeFileSync(employeeFilePath, JSON.stringify(employees, null, 2))
}

// Route to get all employees
router.get('/employees', (req, res) => {
    const employees = readEmployees();
    res.status(200).json(employees);
})

// Route to create a new employee
router.post('/employees', (req,res) => {
    const {first_name, last_name, email, position, salary, date_of_joining, department} = req.body;
    const employees = readEmployees();

    const newEmployee = {
        id: employees.length+1,
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department
    };

    employees.push(newEmployee);
    writeEmployees(employees);
    res.status(200).json({message: 'Employee created successfully', employee: newEmployee});
});

// Getting employee with the specific id:
router.get('/employees/:eid', (req, res) => {
    const employees = readEmployees();
    const employee = employees.find(emp => emp.id === parseInt(req.params.eid));

    if (!employee) {
        return res.status(404).json({message: 'Employee not found'});
    }

    res.status(200).json(employee);
});



module.exports = router;
