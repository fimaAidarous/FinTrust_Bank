import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  deleteCardStart,
  deleteCardSuccess,
  deleteCardFailure,
} from "../../redux/cardSlice";
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

const CardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cards, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleEdit = (cardId) => {
    navigate(`/update-card/${cardId}`);
  };

  const handleDelete = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      dispatch(deleteCardStart());
      try {
        const response = await fetch(
          `http://localhost:3000/api/cards/${cardId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete card");
        }

        dispatch(deleteCardSuccess(cardId));
      } catch (error) {
        dispatch(deleteCardFailure(error.message));
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const validCards = Array.isArray(cards) ? cards : [];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Paper sx={{ padding: "20px", borderRadius: "16px", boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom color="success">
          Card List
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
            onClick={() => navigate("/create-card")}
          >
            Add New Card
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
                  Card Number
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
                  Card Type
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
              {validCards.map((card) => {
                const { _id, card_number, user_id, card_type, status } = card;
                return (
                  <TableRow hover key={_id}>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {card_number || "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {user_id && typeof user_id === "string" ? user_id : "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {card_type ? card_type.charAt(0).toUpperCase() + card_type.slice(1) : "N/A"}
                    </TableCell>
                    <TableCell sx={{ color: "#34495e", fontWeight: "500" }}>
                      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "N/A"}
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

export default CardList;
