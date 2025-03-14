import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAccountStart, 
    updateAccountSuccess,
     updateAccountFailure
} from '../../redux/accountSlice';
import { Container, Paper, Typography, 
    TextField, MenuItem, 
    Button, CircularProgress,
     Snackbar, Alert 
} from '@mui/material';

const accountTypes = ['savings', 'checking'];
const accountStatuses = ['active', 'inactive'];

const UpdateAccount = () => {
  const { accountId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accounts, loading, error } = useSelector((state) => state.account);
  const account = accounts.find(acc => acc._id === accountId);
  if (!account) {
    return <CircularProgress />;
  }

  const [formData, setFormData] = useState({
    account_number: '',
    user_id: '',
    account_type: 'savings',
    balance: 0,
    currency: 'USD',
    status: 'active',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (account) {
      setFormData({
        account_number: account.account_number,
        user_id: account.user_id._id || account.user_id, 
        account_type: account.account_type,
        balance: account.balance,
        currency: account.currency,
        status: account.status,
      });
    }
  }, [account]); 
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateAccountStart());
    try {
      const response = await fetch(`http://localhost:3000/api/accounts/${accountId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch(updateAccountSuccess(data));
        setSuccessMessage('Account updated successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/accounts'), 2000); 
      } else {
        throw new Error(data.message || 'Failed to update account.');
      }
    } catch (err) {
      dispatch(updateAccountFailure(err.message));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px' }}>
        <Typography variant="h5" align="center" gutterBottom>
        ✨  Update Account
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
            {loading ? <CircularProgress size={24} /> : 'Update Account'}
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

export default UpdateAccount;
