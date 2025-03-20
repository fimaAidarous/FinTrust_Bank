import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  deleteTransactionStart, 
  deleteTransactionSuccess, 
  deleteTransactionFailure 
} from '../../redux/transactionSlice';
import { 
  Container, Paper, Typography, Button, Snackbar, Alert, CircularProgress 
} from '@mui/material';

const DeleteTransaction = ({ transactionId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!transactionId) {
      setError('Transaction ID is required');
      setSnackbarOpen(true);
    }
  }, [transactionId]);

  const handleDelete = async () => {
    if (!transactionId) return;

    setLoading(true);
    dispatch(deleteTransactionStart());

    try {
      const response = await fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(deleteTransactionSuccess(data));
        setSuccessMessage('Transaction deleted successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/transactions'), 2000);
      } else {
        throw new Error(data.message || 'Failed to delete transaction.');
      }
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
      dispatch(deleteTransactionFailure(err.message));
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
          🗑️ Delete Transaction
        </Typography>
        {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleDelete}
          disabled={loading}
          sx={{ marginTop: '16px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Delete Transaction'}
        </Button>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error ? error : successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default DeleteTransaction;
