import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  createTransactionStart, 
  createTransactionSuccess, 
  createTransactionFailure 
} from '../../redux/transactionSlice';
import { 
  Container, Paper, Typography, TextField, MenuItem, Button, Snackbar, Alert, CircularProgress 
} from '@mui/material';

const transactionTypes = ['deposit', 'withdrawal', 'transfer', 'bill_payment']; 
const statusOptions = ['pending', 'completed', 'failed']; 

const CreateTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    account_id: '',
    amount: '',
    transaction_type: 'deposit',
    currency: 'USD',
    status: 'pending', 
  });

  const [accounts, setAccounts] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/accounts');
        const data = await response.json();
        console.log('Accounts data:', data); 
        if (Array.isArray(data)) {  
          setAccounts(data); 
        } else {
          setError('Invalid data structure for accounts');
        }
      } catch (err) {
        setError('Error fetching accounts');
      }
    };
    fetchAccounts();
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    dispatch(createTransactionStart());

    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        dispatch(createTransactionSuccess(data));
        setSuccessMessage('Transaction created successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/transactions'), 2000);
      } else {
        throw new Error(data.message || 'Failed to create transaction.');
      }
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
      dispatch(createTransactionFailure(err.message));
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
          💰 Create Transaction
        </Typography>
        <form onSubmit={handleSubmit}>
         
          <TextField
            select
            fullWidth
            label="Account ID"
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            margin="dense"
            required
          >
            {accounts.length === 0 ? (
              <MenuItem disabled>No accounts available</MenuItem>
            ) : (
              accounts.map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account.account_name || account._id} {/* Display account name or ID */}
                </MenuItem>
              ))
            )}
          </TextField>
          
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
            label="Transaction Type"
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
            margin="dense"
          >
            {transactionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </TextField>
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
            <MenuItem value="KES">KES</MenuItem>
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
            {statusOptions.map((status) => (
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
            {loading ? <CircularProgress size={24} /> : 'Create Transaction'}
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

export default CreateTransaction;
