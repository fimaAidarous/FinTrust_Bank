import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loans: [],
  error: null,
  loading: false,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    createLoanStart: (state) => {
      state.loading = true;
    },
    createLoanSuccess: (state, action) => {
      state.loans.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createLoanFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateLoanStart: (state) => {
      state.loading = true;
    },
    updateLoanSuccess: (state, action) => {
      const index = state.loans.findIndex(
        (loan) => loan._id === action.payload._id
      );
      if (index !== -1) {
        state.loans[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateLoanFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteLoanStart: (state) => {
      state.loading = true;
    },
    deleteLoanSuccess: (state, action) => {
      state.loans = state.loans.filter((loan) => loan._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteLoanFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    loanListStart: (state) => {
      state.loading = true;
    },
    loanListSuccess: (state, action) => {
      state.loans = action.payload;
      state.loading = false;
      state.error = null;
    },
    loanListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchLoans = () => async (dispatch) => {
  dispatch(loanListStart());
  try {
    const response = await fetch("http://localhost:3000/api/loans");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch loans");
    }
    dispatch(loanListSuccess(data));
  } catch (error) {
    dispatch(loanListFailure(error.message));
  }
};

export const deleteLoan = (loanId) => async (dispatch) => {
  dispatch(deleteLoanStart());
  try {
    const response = await fetch(`http://localhost:3000/api/loans/${loanId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete loan');
    }

    dispatch(deleteLoanSuccess(loanId));
  } catch (error) {
    dispatch(deleteLoanFailure(error.message));
  }
};

export const {
  createLoanStart,
  createLoanSuccess,
  createLoanFailure,
  updateLoanStart,
  updateLoanSuccess,
  updateLoanFailure,
  deleteLoanStart,
  deleteLoanSuccess,
  deleteLoanFailure,
  loanListStart,
  loanListSuccess,
  loanListFailure,
} = loanSlice.actions;

export default loanSlice.reducer;