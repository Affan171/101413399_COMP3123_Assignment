import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Services/authService";
import { TextField, Button, Box, Typography, Grid, Link } from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      setMessage("Signup successful! You can now log in.");
      setError("");
    } catch (err) {
      console.error("Signup failed:", err.response?.data);
      setError("Failed to sign up. Try again.");
      setMessage("");
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={4}>
        <Box
          sx={{
            p: 4,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          {message && (
            <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
              underline="hover"
              sx={{ cursor: "pointer", color: "primary.main" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
