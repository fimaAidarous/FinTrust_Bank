import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transfers: [],
  error: null,
  loading: false,
};

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    createTransferStart: (state) => {
      state.loading = true;
    },
    createTransferSuccess: (state, action) => {
      state.transfers.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTransferFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteTransferStart: (state) => {
      state.loading = true;
    },
    deleteTransferSuccess: (state, action) => {
      state.transfers = state.transfers.filter(
        (transfer) => transfer._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteTransferFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    transferListStart: (state) => {
      state.loading = true;
    },
    transferListSuccess: (state, action) => {
      state.transfers = action.payload;
      state.loading = false;
      state.error = null;
    },
    transferListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchTransfers = () => async (dispatch) => {
  dispatch(transferListStart());
  try {
    const response = await fetch("http://localhost:3000/api/transfers");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch transfers");
    }
    dispatch(transferListSuccess(data));
  } catch (error) {
    dispatch(transferListFailure(error.message));
  }
};

export const deleteTransfer = (transferId) => async (dispatch) => {
  dispatch(deleteTransferStart());
  try {
    const response = await fetch(`http://localhost:3000/api/transfers/${transferId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete transfer");
    }

    dispatch(deleteTransferSuccess(transferId));
  } catch (error) {
    dispatch(deleteTransferFailure(error.message));
  }
};

export const {
  createTransferStart,
  createTransferSuccess,
  createTransferFailure,
  deleteTransferStart,
  deleteTransferSuccess,
  deleteTransferFailure,
  transferListStart,
  transferListSuccess,
  transferListFailure,
} = transferSlice.actions;

export default transferSlice.reducer;
