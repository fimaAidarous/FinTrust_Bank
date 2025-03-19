import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  error: null,
  loading: false,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    createTransactionStart: (state) => {
      state.loading = true;
    },
    createTransactionSuccess: (state, action) => {
      state.transactions.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTransactionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateTransactionStart: (state) => {
      state.loading = true;
    },
    updateTransactionSuccess: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction._id === action.payload._id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateTransactionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteTransactionStart: (state) => {
      state.loading = true;
    },
    deleteTransactionSuccess: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteTransactionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    transactionListStart: (state) => {
      state.loading = true;
    },
    transactionListSuccess: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
      state.error = null;
    },
    transactionListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchTransactions = () => async (dispatch) => {
  dispatch(transactionListStart());
  try {
    const response = await fetch("http://localhost:3000/api/transactions");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch transactions");
    }
    dispatch(transactionListSuccess(data));
  } catch (error) {
    dispatch(transactionListFailure(error.message));
  }
};

export const deleteTransaction = (transactionId) => async (dispatch) => {
  dispatch(deleteTransactionStart());
  try {
    const response = await fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }

    dispatch(deleteTransactionSuccess(transactionId));
  } catch (error) {
    dispatch(deleteTransactionFailure(error.message));
  }
};

export const {
  createTransactionStart,
  createTransactionSuccess,
  createTransactionFailure,
  updateTransactionStart,
  updateTransactionSuccess,
  updateTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  deleteTransactionFailure,
  transactionListStart,
  transactionListSuccess,
  transactionListFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;
