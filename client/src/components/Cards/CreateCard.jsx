import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  createCardStart, 
  createCardSuccess, 
  createCardFailure 
} from '../../redux/cardSlice'; 
import { 
  Container, Paper, Typography, TextField, MenuItem, Button, Snackbar, Alert, CircularProgress 
} from '@mui/material';

const cardTypes = ['debit', 'credit'];
const cardStatuses = ['active', 'blocked', 'expired'];

const CreateCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: '',
    card_number: '',
    card_type: 'debit',
    cvv: '',
    expiry_date: '',
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
    dispatch(createCardStart());

    try {
      const response = await fetch('http://localhost:3000/api/Cards', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch(createCardSuccess(data));
        setSuccessMessage('Card created successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/cards'), 2000); // Navigate to the cards page after success
      } else {
        throw new Error(data.message || 'Failed to create card.');
      }
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
      dispatch(createCardFailure(err.message));
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
          💳 Create Card
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
            label="Card Number"
            name="card_number"
            value={formData.card_number}
            onChange={handleChange}
            required
          />
          <TextField
            select
            fullWidth
            label="Card Type"
            name="card_type"
            value={formData.card_type}
            onChange={handleChange}
            margin="dense"
          >
            {cardTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="CVV"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
          <TextField
            type="date"
            fullWidth
            label="Expiry Date"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={handleChange}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
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
            {cardStatuses.map((status) => (
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
            {loading ? <CircularProgress size={24} /> : 'Create Card'}
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

export default CreateCard;
