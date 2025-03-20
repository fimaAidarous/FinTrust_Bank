import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, deleteTransaction } from "../../redux/transactionSlice";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TransactionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions, loading, error } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleEdit = (transactionId) => {
    navigate(`/update-transaction/${transactionId}`);
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(transactionId));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const validTransactions = Array.isArray(transactions) ? transactions : [];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Paper sx={{ padding: "20px", borderRadius: "16px", boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="success">
          Transaction List
        </Typography>
        {error && (
          <Typography color="error" align="center" variant="body1">
            {error}
          </Typography>
        )}

        <Box sx={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" onClick={() => navigate("/create-transaction")}>
            Add New Transaction
          </Button>
        </Box>

        <TableContainer sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Transaction ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Account Number</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px", color: "#2c3e50" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {validTransactions.map((transaction) => {
                const { _id, account_number, amount, date } = transaction;
                return (
                  <TableRow hover key={_id}>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{_id}</TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{account_number || "N/A"}</TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{amount ? `$${amount.toLocaleString()}` : "N/A"}</TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>{date || "N/A"}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="success" sx={{ marginRight: "10px", borderRadius: "10px" }} onClick={() => handleEdit(_id)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" sx={{ borderRadius: "10px" }} onClick={() => handleDelete(_id)}>
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

export default TransactionList;
