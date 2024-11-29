import React, { useEffect, useState } from "react";
import { deleteEmployee, fetchEmployees } from "../../Services/employeeService";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState("");

  // Fetch employees when the component mounts
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const employees = await fetchEmployees();
      console.log('Data received from backend:', employees);
      setEmployees(employees);
    } catch (error) {
      console.log("Error fetching employees:", error);
      setError("Failed to fetch employees. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      // Why dont we call loadEmployees here to show the updated list
      // because when we delete the employee it would be deleted from
      // the database? Making another call to API would cause server load and network latency.
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to delete employee.");
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <AddEmployee onEmployeeAdded={loadEmployees} />

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
            {employees.map((employee) => {
              <tr key={employee._id}>
                <td>
                  {employee.first_name} {employee.last_name}
                </td>
                <td>{employee.email} </td>
                <td>{employee.position} </td>
                <td>
                  <button onClick={() => setEditingEmployee(employee)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      ) : (
        <p>No employees found</p>
      )}

      {editingEmployee && (
        <EditEmployee
          employee={editingEmployee}
          onEmployeeAdded={loadEmployees}
          onClose={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
