import React, { useState } from "react";
import { updateEmployee } from "../../Services/employeeService";

const EditEmployee = ({ employee, onEmployeeUpdated, onClose }) => {
  const [formData, setFormData] = useState(employee);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(employee._id, formData);
      onEmployeeUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
      />
      <input
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />
      <button type="submit">Update Employee</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditEmployee;
