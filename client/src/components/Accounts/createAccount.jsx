import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  createAccountStart, 
  createAccountSuccess, 
  createAccountFailure 
} from '../../redux/accountSlice';
import { 
  Container, Paper, Typography, TextField, MenuItem, Button, Snackbar, Alert, CircularProgress
} from '@mui/material';

const accountTypes = ['savings', 'checking'];
const accountStatuses = ['active', 'inactive'];

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    account_number: '',
    user_id: '',
    account_type: 'savings',
    balance: 0,
    currency: 'USD',
    status: 'active',
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
    dispatch(createAccountStart());

    try {
      const response = await fetch('http://localhost:3000/api/accounts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch(createAccountSuccess(data));
        setSuccessMessage('Account created successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/accounts'), 2000); 
      } else {
        throw new Error(data.message || 'Failed to create account.');
      }
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
      dispatch(createAccountFailure(err.message));
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
          🏦 Create Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Account Number"
            name="account_number"
            value={formData.account_number}
            onChange={handleChange}
            required
          />
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
            select
            fullWidth
            label="Account Type"
            name="account_type"
            value={formData.account_type}
            onChange={handleChange}
            margin="dense"
          >
            {accountTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            fullWidth
            label="Balance"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            select
            fullWidth
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            margin="dense"
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
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
            {accountStatuses.map((status) => (
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
            {loading ? <CircularProgress size={24} /> : 'Create Account'}
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

export default CreateAccount;
