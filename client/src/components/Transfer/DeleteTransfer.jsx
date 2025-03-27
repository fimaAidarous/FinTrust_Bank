import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransfer } from '../../redux/transferSlice';
import { Button, Snackbar, Alert, CircularProgress } from '@mui/material';

const DeleteTransfer = ({ transferId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    setError('');
    setLoading(true);
    try {
      await dispatch(deleteTransfer(transferId));
      setSuccessMessage('Transfer deleted successfully!');
      setSnackbarOpen(true);
    } catch (err) {
      setError('Failed to delete transfer');
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Delete Transfer'}
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error : successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteTransfer;
