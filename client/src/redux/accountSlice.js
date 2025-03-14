import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [],
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
      state.accounts.push(action.payload);
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
      const index = state.accounts.findIndex(
        (account) => account._id === action.payload._id
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
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
    deleteAccountSuccess: (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteAccountFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },


    accountListStart: (state) => {
      state.loading = true;
    },
    accountListSuccess: (state, action) => {
      state.accounts = action.payload;
      state.loading = false;
      state.error = null;
    },
    accountListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchAccounts = () => async (dispatch) => {
  dispatch(accountListStart());
  try {
    const response = await fetch("http://localhost:3000/api/accounts");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch accounts");
    }
    dispatch(accountListSuccess(data));
  } catch (error) {
    dispatch(accountListFailure(error.message));
  }
};

export const deleteAccount = (accountId) => async (dispatch) => {
  dispatch(deleteAccountStart());
  try {
    const response = await fetch(`http://localhost:3000/api/accounts/${accountId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete account');
    }

    dispatch(deleteAccountSuccess(accountId));
  } catch (error) {
    dispatch(deleteAccountFailure(error.message));
  }
};

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
  accountListStart,
  accountListSuccess,
  accountListFailure,
} = accountSlice.actions;

export default accountSlice.reducer;
