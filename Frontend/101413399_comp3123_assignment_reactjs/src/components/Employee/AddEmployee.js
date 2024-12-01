import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../Services/employeeService";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    department: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      navigate("/employees"); // Redirect to employee list after successful creation
    } catch (err) {
      console.error("Error adding employee:", err);
      setError("Failed to add employee. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Employee
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          name="first_name"
          label="First Name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="position"
          label="Position"
          value={formData.position}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="salary"
          label="Salary"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="department"
          label="Department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            Add Employee
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

export default AddEmployee;
