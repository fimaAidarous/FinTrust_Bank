import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  createLoanStart, 
  createLoanSuccess, 
  createLoanFailure 
} from '../../redux/loanSlice';
import { 
  Container, Paper, Typography, TextField, MenuItem, Button, Snackbar, Alert, CircularProgress
} from '@mui/material';

const loanTypes = ['personal', 'business'];
const loanStatuses = ['pending', 'approved', 'rejected', 'paid'];

const CreateLoan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: '',
    amount: '',
    loan_type: 'personal',
    status: 'pending',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    dispatch(createLoanStart());

    try {
      const response = await fetch('http://localhost:3000/api/loans', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch(createLoanSuccess(data));
        setSuccessMessage('Loan created successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/loans'), 2000); 
      } else {
        throw new Error(data.message || 'Failed to create loan.');
      }
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
      dispatch(createLoanFailure(err.message));
    }
    
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" align="center" gutterBottom>
        💵  Create Loan
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
            {loading ? <CircularProgress size={24} /> : 'Create Loan'}
          </Button>
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error ? error : successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CreateLoan;
