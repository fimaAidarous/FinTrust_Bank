import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBillPayments,
  deleteBillPaymentStart,
  deleteBillPaymentSuccess,
  deleteBillPaymentFailure,
} from "../../redux/billPaymentSlice";
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

const BillPaymentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { billPayments, loading, error } = useSelector(
    (state) => state.billPayment
  );

  useEffect(() => {
    dispatch(fetchBillPayments());
  }, [dispatch]);

  const handleEdit = (billPaymentId) => {
    navigate(`/update-billPayment/${billPaymentId}`);
  };

  const handleDelete = async (billPaymentId) => {
    if (window.confirm("Are you sure you want to delete this bill payment?")) {
      dispatch(deleteBillPaymentStart());
      try {
        const response = await fetch(
          `http://localhost:3000/api/BillPayments/${billPaymentId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete bill payment");
        }

        dispatch(deleteBillPaymentSuccess(billPaymentId));
      } catch (error) {
        dispatch(deleteBillPaymentFailure(error.message));
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const validBillPayments = Array.isArray(billPayments) ? billPayments : [];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Paper sx={{ padding: "20px", borderRadius: "16px", boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="success">
          Bill Payment List
        </Typography>
        {error && (
          <Typography color="error" align="center" variant="body1">
            {error}
          </Typography>
        )}

        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/create-bill-payment")}
          >
            Add New Bill Payment
          </Button>
        </Box>

        <TableContainer sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  User ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  Account ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  Bill Type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {validBillPayments.map((payment) => {
                const { _id, user_id, account_id, bill_type, amount, status } =
                  payment;
                return (
                  <TableRow hover key={_id || `temp-key-${Math.random()}`}>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {user_id?._id || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {account_id?._id || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {bill_type
                        ? bill_type.charAt(0).toUpperCase() + bill_type.slice(1)
                        : "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      $
                      {amount && !isNaN(amount)
                        ? amount.toLocaleString()
                        : "N/A"}{" "}
                      {/* Added check for valid amount */}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {status
                        ? status.charAt(0).toUpperCase() + status.slice(1)
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{ marginRight: "10px", borderRadius: "10px" }}
                        onClick={() => handleEdit(_id)}
                      >
                        Edit
                      </Button>
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

export default BillPaymentList;
