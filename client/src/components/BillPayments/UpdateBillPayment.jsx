import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBillPaymentStart, updateBillPaymentSuccess, updateBillPaymentFailure } from '../../redux/billPaymentSlice';
import { Container, Paper, Typography, TextField, MenuItem, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

const billTypes = ['electricity', 'water', 'internet', 'insurance'];
const paymentStatuses = ['pending', 'paid'];

const UpdateBillPayment = () => {
  const { billPaymentId } = useParams(); // Use billPaymentId instead of billId
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { billPayments, loading, error } = useSelector((state) => state.billPayment);
  const billPayment = billPayments.find(b => b._id === billPaymentId); // Find billPayment by billPaymentId
  
  if (!billPayment) {
    return <CircularProgress />;
  }

  const [formData, setFormData] = useState({
    user_id: '',
    account_id: '',
    bill_type: 'electricity',
    amount: 0,
    status: 'pending',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (billPayment) {
      console.log(billPayment.account_id); 
      setFormData({
        user_id: billPayment.user_id._id || billPayment.user_id,
        account_id: billPayment.account_id._id || billPayment.account_id.id,
        bill_type: billPayment.bill_type,
        amount: billPayment.amount,
        status: billPayment.status,
      });
    }
  }, [billPayment]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateBillPaymentStart());
    try {
      const response = await fetch(`http://localhost:3000/api/BillPayments/${billPaymentId}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch(updateBillPaymentSuccess(data));
        setSuccessMessage('Bill Payment updated successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/billPayments'), 2000); 
      } else {
        throw new Error(data.message || 'Failed to update bill payment.');
      }
    } catch (err) {
      dispatch(updateBillPaymentFailure(err.message));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          ✨  Update Bill Payment
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
            variant="outlined"
            margin="dense"
            fullWidth
            label="Account ID"
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            required
          />
          <TextField
            select
            fullWidth
            label="Bill Type"
            name="bill_type"
            value={formData.bill_type}
            onChange={handleChange}
            margin="dense"
          >
            {billTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            margin="dense"
          >
            {paymentStatuses.map((status) => (
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
            {loading ? <CircularProgress size={24} /> : 'Update Bill Payment'}
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

export default UpdateBillPayment;
