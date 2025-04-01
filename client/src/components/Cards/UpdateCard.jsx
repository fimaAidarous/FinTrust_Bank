import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCardStart, updateCardSuccess, updateCardFailure } from '../../redux/cardSlice';
import { Container, Paper, Typography, TextField, MenuItem, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

const cardTypes = ['debit', 'credit'];
const cardStatuses = ['active', 'inactive'];

const UpdateCard = () => {
  const { cardId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cards, loading, error } = useSelector((state) => state.card);
  const card = cards.find(c => c._id === cardId);
  
  if (!card) {
    return <CircularProgress />;
  }

  const [formData, setFormData] = useState({
    card_number: '',
    user_id: '',
    card_type: 'debit',
    expiration_date: '',
    status: 'active',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (card) {
      setFormData({
        card_number: card.card_number,
        user_id: card.user_id._id || card.user_id, 
        card_type: card.card_type,
        expiration_date: card.expiration_date,
        status: card.status,
      });
    }
  }, [card]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateCardStart());
    try {
      const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        dispatch(updateCardSuccess(data));
        setSuccessMessage('Card updated successfully!');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/cards'), 2000); 
      } else {
        throw new Error(data.message || 'Failed to update card.');
      }
    } catch (err) {
      dispatch(updateCardFailure(err.message));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: '20px', borderRadius: '16px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          ✨  Update Card
        </Typography>
        <form onSubmit={handleSubmit}>
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
            type="date"
            fullWidth
            label="Expiration Date"
            name="expiration_date"
            value={formData.expiration_date}
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
            {loading ? <CircularProgress size={24} /> : 'Update Card'}
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

export default UpdateCard;
