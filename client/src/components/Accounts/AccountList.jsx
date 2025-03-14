import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
} from "../../redux/accountSlice";
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

const AccountList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accounts, loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleEdit = (accountId) => {
    navigate(`/update-account/${accountId}`);
  };

  const handleDelete = async (accountId) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      dispatch(deleteAccountStart());
      try {
        const response = await fetch(
          `http://localhost:3000/api/accounts/${accountId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete account");
        }

        dispatch(deleteAccountSuccess(accountId));
      } catch (error) {
        dispatch(deleteAccountFailure(error.message));
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const validAccounts = Array.isArray(accounts) ? accounts : [];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Paper sx={{ padding: "20px", borderRadius: "16px", boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="success">
          Account List
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
            onClick={() => navigate("/create-account")}
          >
            Add New Account
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
                  Account Number
                </TableCell>
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
                  Balance
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
              {validAccounts.map((account) => {
                const { _id, account_number, user_id, balance } = account;
                return (
                  <TableRow hover key={_id}>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {account_number || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {user_id && typeof user_id === "string" ? user_id : "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {balance ? `$${balance.toLocaleString()}` : "N/A"}
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

export default AccountList;
