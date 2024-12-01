import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/authService";
import { TextField, Button, Box, Typography, Grid, Link } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      localStorage.setItem("token", response.data.token);
      navigate("/employees");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
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
            Login
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/signup")}
              underline="hover"
              sx={{ cursor: "pointer", color: "primary.main" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
