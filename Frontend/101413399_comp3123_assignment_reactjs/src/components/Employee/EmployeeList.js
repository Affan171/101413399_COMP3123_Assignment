import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, fetchEmployees } from "../../Services/employeeService";
import {
  AppBar,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // Stores employee data
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered employees
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [error, setError] = useState(""); // Handles any errors
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Tracks the employee to be deleted
  const [openDialog, setOpenDialog] = useState(false); // Tracks dialog state
  const navigate = useNavigate(); // For navigation

  // Fetch employees when the component mounts
  useEffect(() => {
    loadEmployees();
  }, []);

  // Fetch employees from the backend
  const loadEmployees = async () => {
    try {
      const response = await fetchEmployees();
      setEmployees(response); // Set the employee data
      setFilteredEmployees(response); // Initialize filtered employees
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to fetch employees. Please try again.");
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter employees based on the query
    const filtered = employees.filter(
      (employee) =>
        employee.first_name.toLowerCase().includes(query) ||
        employee.last_name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  // Handle delete operation
  const handleDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee._id); // Call delete API
      setEmployees(employees.filter((employee) => employee._id !== selectedEmployee._id));
      setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== selectedEmployee._id));
      setOpenDialog(false); // Close the dialog
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee.");
    }
  };

  // Open confirmation dialog
  const confirmDelete = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  // Close confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Dropdown menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>
          <Typography sx={{ marginRight: 2 }}>
            {localStorage.getItem("userEmail") || "User"}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Employee List
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search Employees"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />

        {/* Add Employee Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/employees/add")}
          sx={{ marginBottom: 2 }}
        >
          Add Employee
        </Button>

        {/* Employee Table */}
        {error && <Typography color="error">{error}</Typography>}
        {filteredEmployees.length > 0 ? (
          <TableContainer component={Paper}>
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
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>
                      {employee.first_name} {employee.last_name}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        onClick={() => navigate(`/employees/edit/${employee._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => confirmDelete(employee)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No employees found</Typography>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>
              {selectedEmployee?.first_name} {selectedEmployee?.last_name}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
