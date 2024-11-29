import api from './api';

// Fetch all employees
export const fetchEmployees = () => {
    return api.get('/employee/employees'); // Matches GET /api/v1/employee/employees
}

// Fetch a single employee by ID
export const fetchEmployeeById = (id) => {
    return api.get(`/employee/employees/${id}`); // Matches GET /api/v1/employee/employees/:id
}

// Add a new employee
export const addEmployee = (data) => {
    return api.post('/employee/employees', data); // Matches POST /api/v1/employee/employees
}

// Update an existing employee
export const updateEmployee = (id, data) => {
    return api.put(`/employee/employees/${id}`, data); // Matches PUT /api/v1/employee/employees/:id
}

// Delete an employee
export const deleteEmployee = (id) => {
    return api.delete(`/employee/employees/${id}`); // Matches DELETE /api/v1/employee/employees/:id
}
