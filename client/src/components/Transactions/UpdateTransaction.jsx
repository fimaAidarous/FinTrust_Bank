import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  updateTransactionStart, 
  updateTransactionSuccess, 
  updateTransactionFailure 
} from '../../redux/transactionSlice';
import { 
  Container, Paper, Typography, TextField, MenuItem, Button, Snackbar, Alert, CircularProgress 
} from '@mui/material';

const transactionTypes = ['deposit', 'withdrawal', 'transfer', 'bill_payment'];
const statusOptions = ['pending', 'completed', 'failed'];

const UpdateTransaction = () => {
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions, loading, error } = useSelector((state) => state.transaction);
  const transaction = transactions.find((tran) => tran._id === transactionId);

  if (!transaction) {
    return <CircularProgress />;
  }

  const [formData, setFormData] = useState({
    account_id: '',
    amount: '',
    transaction_type: 'deposit',
    currency: 'USD',
    status: 'pending',
  });

  const [accounts, setAccounts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/accounts');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAccounts(data);
        } else {
          throw new Error('Invalid data structure for accounts');
        }
      } catch (err) {
        console.error('Error fetching accounts:', err);
      }
    };

    if (transaction) {
      setFormData({
        account_id: transaction.account_id._id || transaction.account_id,
        amount: transaction.amount,
        transaction_type: transaction.transaction_type,
        currency: transaction.currency,
        status: transaction.status,
      });
    }

    fetchAccounts();
  }, [transaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateTransactionStart());
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateTransactionSuccess(data));
        setSuccessMessage('Transaction updated successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/transactions'), 2000);
      } else {
        throw new Error(data.message || 'Failed to update transaction.');
      }
    } catch (err) {
      dispatch(updateTransactionFailure(err.message));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          ✨ Update Transaction
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
            {loading ? <CircularProgress size={24} /> : 'Update Transaction'}
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

export default UpdateTransaction;
