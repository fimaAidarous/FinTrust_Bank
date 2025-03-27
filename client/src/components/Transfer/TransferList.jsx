import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransfers, deleteTransfer } from "../../redux/transferSlice";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TransferList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transfers, loading, error } = useSelector((state) => state.transfer);

  useEffect(() => {
    dispatch(fetchTransfers());
  }, [dispatch]);

  const handleDelete = async (transferId) => {
    if (window.confirm("Are you sure you want to delete this transfer?")) {
      dispatch(deleteTransfer(transferId));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const validTransfers = Array.isArray(transfers) ? transfers : [];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Paper sx={{ padding: "20px", borderRadius: "16px", boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="success">
          Transfer List
        </Typography>
        
        {error && (
          <Snackbar open={true} autoHideDuration={6000} onClose={() => dispatch({ type: 'transfer/errorHandled' })}>
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        )}

        <Box sx={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" onClick={() => navigate("/create-transfer")}>
            Add New Transfer
          </Button>
        </Box>

        <TableContainer sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Transfer ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Currency</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {validTransfers.map((transfer) => {
                const { _id, amount, currency, date } = transfer;
                return (
                  <TableRow hover key={_id}>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{_id}</TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{amount ? `$${amount.toLocaleString()}` : "N/A"}</TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{currency || "N/A"}</TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{date || "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ borderRadius: "10px" }}
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default TransferList;
