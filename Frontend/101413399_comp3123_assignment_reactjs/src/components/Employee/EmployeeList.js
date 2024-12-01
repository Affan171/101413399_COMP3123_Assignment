import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, fetchEmployees } from "../../Services/employeeService";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // Stores employee data
  const [editingEmployee, setEditingEmployee] = useState(null); // Tracks the employee being edited
  const [error, setError] = useState(""); // Handles any errors
  const navigate = useNavigate(); // For navigation

  // Fetch employees when the component mounts
  useEffect(() => {
    loadEmployees();
  }, []);

  // Fetch employees from the backend
  const loadEmployees = async () => {
    try {
      const response = await fetchEmployees();
      console.log("Data received from backend:", response);
      setEmployees(response); // Set the employee data
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to fetch employees. Please try again.");
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id); // Call delete API
      // Filter out the deleted employee from the state
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Employee Management</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add Employee Form */}
      <AddEmployee onEmployeeAdded={loadEmployees} />

      {/* Employee Table */}
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the employees and render rows */}
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  {employee.first_name} {employee.last_name}
                </td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <button onClick={() => setEditingEmployee(employee)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found</p>
      )}

      {/* Edit Employee Form (Rendered Conditionally) */}
      {editingEmployee && (
        <EditEmployee
          employee={editingEmployee}
          onEmployeeUpdated={loadEmployees}
          onClose={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
