import api from './api';

// Fetch all employees
export const fetchEmployees = async () => {
    try {
        const response = await api.get('/employee/employees'); // Matches GET /api/v1/employee/employees
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error; // Rethrow for the caller to handle
    }
};

// Fetch a single employee by ID
export const fetchEmployeeById = async (id) => {
    try {
        const response = await api.get(`/employee/employees/${id}`); // Matches GET /api/v1/employee/employees/:id
        return response.data;
    } catch (error) {
        console.error(`Error fetching employee with ID ${id}:`, error);
        throw error;
    }
};

// Add a new employee
export const addEmployee = async (data) => {
    try {
        const response = await api.post('/employee/employees', data); // Matches POST /api/v1/employee/employees
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

// Update an existing employee
export const updateEmployee = async (id, data) => {
    try {
        const response = await api.put(`/employee/employees/${id}`, data); // Matches PUT /api/v1/employee/employees/:id
        return response.data;
    } catch (error) {
        console.error(`Error updating employee with ID ${id}:`, error);
        throw error;
    }
};

// Delete an employee
export const deleteEmployee = async (id) => {
    try {
        const response = await api.delete(`/employee/employees/${id}`); // Matches DELETE /api/v1/employee/employees/:id
        return response.data;
    } catch (error) {
        console.error(`Error deleting employee with ID ${id}:`, error);
        throw error;
    }
};
