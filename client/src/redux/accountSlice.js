import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: null,
  error: null,
  loading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    createAccountStart: (state) => {
      state.loading = true;
    },
    createAccountSuccess: (state, action) => {
      state.account = action.payload;
      state.loading = false;
      state.error = null;
    },
    createAccountFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateAccountStart: (state) => {
      state.loading = true;
    },
    updateAccountSuccess: (state, action) => {
      state.account = { ...state.account, ...action.payload };
      state.loading = false;
      state.error = null;
    },
    updateAccountFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteAccountStart: (state) => {
      state.loading = true;
    },
    deleteAccountSuccess: (state) => {
      state.account = null;
      state.loading = false;
      state.error = null;
    },
    deleteAccountFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  createAccountStart,
  createAccountSuccess,
  createAccountFailure,
  updateAccountStart,
  updateAccountSuccess,
  updateAccountFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
} = accountSlice.actions;

export default accountSlice.reducer;
