import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoans,
  deleteLoanStart,
  deleteLoanSuccess,
  deleteLoanFailure,
} from "../../redux/loanSlice";
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

const LoanList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loans, loading, error } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const handleEdit = (loanId) => {
    navigate(`/update-loan/${loanId}`);
  };

  const handleDelete = async (loanId) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      dispatch(deleteLoanStart());
      try {
        const response = await fetch(
          `http://localhost:3000/api/loans/${loanId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete loan");
        }

        dispatch(deleteLoanSuccess(loanId));
      } catch (error) {
        dispatch(deleteLoanFailure(error.message));
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const validLoans = Array.isArray(loans) ? loans : [];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Paper sx={{ padding: "20px", borderRadius: "16px", boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="success">
          Loan List
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
            onClick={() => navigate("/create-loan")}
          >
            Add New Loan
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
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  Loan Type
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
              {validLoans.map((loan) => {
                const { _id, user_id, amount, loan_type, status } = loan;
                return (
                  <TableRow hover key={_id}>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {user_id || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {amount ? `$${amount.toLocaleString()}` : "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {loan_type
                        ? loan_type.charAt(0).toUpperCase() + loan_type.slice(1)
                        : "N/A"}
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

export default LoanList;
