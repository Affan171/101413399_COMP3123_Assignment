import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchEmployees } from './Services/employeeService'; 

function App() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  // Fetch employees when the component mounts
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetchEmployees();
        setEmployees(response.data); // Store employees in state
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to fetch employees. Check the console for details.');
      }
    };

    loadEmployees();
  }, []);

  return (
    <div className="App">
      <h1>API Test: Fetch Employees</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}
      {employees.length > 0 ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              {employee.first_name} {employee.last_name} - {employee.position}
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found or API is not working.</p>
      )}
    </div>
  );
}

export default App;
