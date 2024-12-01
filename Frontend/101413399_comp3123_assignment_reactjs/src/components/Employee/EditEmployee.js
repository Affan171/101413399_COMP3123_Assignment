import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById, updateEmployee } from "../../Services/employeeService";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";

const EditEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState(null); // Employee data
  const [error, setError] = useState("");

  // Fetch the employee data when the component mounts
  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const employee = await fetchEmployeeById(id); // Fetch the employee by ID
        setFormData(employee); // Set the fetched employee data
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError("Failed to load employee data.");
      }
    };
    loadEmployee();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, formData); // Update the employee data
      navigate("/employees"); // Redirect to the employee list page
    } catch (err) {
      console.error("Error updating employee:", err);
      setError("Failed to update employee. Please try again.");
    }
  };

  // Render loading or error messages
  if (!formData) {
    return error ? (
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    ) : (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading employee data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          name="first_name"
          label="First Name"
          value={formData.first_name || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="last_name"
          label="Last Name"
          value={formData.last_name || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="position"
          label="Position"
          value={formData.position || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="salary"
          label="Salary"
          value={formData.salary || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="department"
          label="Department"
          value={formData.department || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            Update Employee
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditEmployee;
