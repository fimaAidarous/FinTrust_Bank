import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createTransferStart,
  createTransferSuccess,
  createTransferFailure,
} from "../../redux/transferSlice";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

const CreateTransfer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from_account: "",
    to_account: "",
    amount: "",
    currency: "USD",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    dispatch(createTransferStart());

    try {
      const response = await fetch("http://localhost:3000/api/transfers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_account: formData.from_account,
          to_account: formData.to_account,
          amount: Number(formData.amount), // Ensure it's sent as a number
          currency: formData.currency,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(createTransferSuccess(data));
        setSuccessMessage("Transfer created successfully!");
        setSnackbarOpen(true);
        setTimeout(() => navigate("/transfers"), 2000);
      } else {
        throw new Error(data.message || "Failed to create transfer.");
      }
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
      dispatch(createTransferFailure(err.message));
    }

    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: "20px", borderRadius: "16px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          💸 Create Transfer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="From Account"
            name="from_account"
            value={formData.from_account}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="To Account"
            name="to_account"
            value={formData.to_account}
            onChange={handleChange}
            required
          />
          <TextField
            type="number"
            fullWidth
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            margin="dense"
            required
          />
          <TextField
            select
            fullWidth
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            margin="dense"
            SelectProps={{ native: true }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="KES">KES</option>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={loading}
            sx={{ marginTop: "16px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Create Transfer"}
          </Button>
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert
            onClose={handleCloseSnackbar}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CreateTransfer;
