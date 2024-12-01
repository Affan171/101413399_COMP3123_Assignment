import React, { useEffect, useState } from 'react';
import { fetchEmployees, deleteEmployee } from '../../Services/employeeService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const loadEmployees = async () => {
            const response = await fetchEmployees();
            setEmployees(response);
        };
        loadEmployees();
    }, []);

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        setEmployees(employees.filter((employee) => employee._id !== id));
    };

    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee._id}>
                            <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary" style={{ marginRight: '10px' }}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(employee._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeList;
