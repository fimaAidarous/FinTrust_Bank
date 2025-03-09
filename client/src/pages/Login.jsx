import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Paper,
  Snackbar,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      dispatch(loginSuccess(data)); 
      localStorage.setItem("token", data.token); 

      setSuccessMessage("Login successful!");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/dashboard"); 
      }, 1000);
    } catch (error) {
      setError(error.message);
      dispatch(loginFailure());
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: "20px",
            borderRadius: "30px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login Bank Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              sx={{
                borderRadius: "8px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              sx={{
                borderRadius: "8px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading} 
              sx={{
                marginTop: "20px",
                boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"} 
            </Button>
          </form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={error ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {error ? error : successMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
