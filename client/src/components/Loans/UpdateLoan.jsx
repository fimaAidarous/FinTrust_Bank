import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateLoanStart, updateLoanSuccess, updateLoanFailure } from '../../redux/loanSlice';
import { Container, Paper, Typography, TextField, MenuItem, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

const loanTypes = ['personal', 'business'];
const loanStatuses = ['pending', 'approved', 'rejected', 'paid'];

const UpdateLoan = () => {
  const { loanId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loans, loading } = useSelector((state) => state.loan);

  const loan = loans.find(ln => ln._id === loanId);
  
  const [formData, setFormData] = useState({
    user_id: '',
    amount: '',
    loan_type: 'personal',
    status: 'pending',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (loan) {
      setFormData({
        user_id: loan.user_id?._id || loan.user_id || '',
        amount: loan.amount || '',
        loan_type: loan.loan_type || 'personal',
        status: loan.status || 'pending',
      });
    }
  }, [loan]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateLoanStart());
    try {
      const response = await fetch(`http://localhost:3000/api/loans/${loanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update loan.');

      dispatch(updateLoanSuccess(data));
      setSuccessMessage('Loan updated successfully!');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/loans'), 2000);

    } catch (err) {
      dispatch(updateLoanFailure(err.message));
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  if (!loan) return <CircularProgress />;

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          ✨ Update Loan
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="User ID"
            name="user_id"
            value={formData.user_id}
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
            label="Loan Type"
            name="loan_type"
            value={formData.loan_type}
            onChange={handleChange}
            margin="dense"
          >
            {loanTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            margin="dense"
          >
            {loanStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={loading}
            sx={{ marginTop: '16px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Loan'}
          </Button>
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UpdateLoan;
