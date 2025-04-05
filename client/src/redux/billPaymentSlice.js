import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billPayments: [],
  error: null,
  loading: false,
};

const billPaymentSlice = createSlice({
  name: "billPayment",
  initialState,
  reducers: {
    createBillPaymentStart: (state) => {
      state.loading = true;
    },
    createBillPaymentSuccess: (state, action) => {
      state.billPayments.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createBillPaymentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateBillPaymentStart: (state) => {
      state.loading = true;
    },
    updateBillPaymentSuccess: (state, action) => {
      const index = state.billPayments.findIndex(
        (payment) => payment._id === action.payload._id
      );
      if (index !== -1) {
        state.billPayments[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateBillPaymentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteBillPaymentStart: (state) => {
      state.loading = true;
    },
    deleteBillPaymentSuccess: (state, action) => {
      state.billPayments = state.billPayments.filter(
        (payment) => payment._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteBillPaymentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    billPaymentListStart: (state) => {
      state.loading = true;
    },
    billPaymentListSuccess: (state, action) => {
      state.billPayments = action.payload;
      state.loading = false;
      state.error = null;
    },
    billPaymentListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchBillPayments = () => async (dispatch) => {
  dispatch(billPaymentListStart());
  try {
    const response = await fetch("http://localhost:3000/api/billPayments");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch bill payments");
    }
    dispatch(billPaymentListSuccess(data));
  } catch (error) {
    dispatch(billPaymentListFailure(error.message));
  }
};

export const deleteBillPayment = (billPaymentId) => async (dispatch) => {
  dispatch(deleteBillPaymentStart());
  try {
    const response = await fetch(`http://localhost:3000/api/BillPayments/${billPaymentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete bill payment');
    }

    dispatch(deleteBillPaymentSuccess(billPaymentId));
  } catch (error) {
    dispatch(deleteBillPaymentFailure(error.message));
  }
};

export const {
  createBillPaymentStart,
  createBillPaymentSuccess,
  createBillPaymentFailure,
  updateBillPaymentStart,
  updateBillPaymentSuccess,
  updateBillPaymentFailure,
  deleteBillPaymentStart,
  deleteBillPaymentSuccess,
  deleteBillPaymentFailure,
  billPaymentListStart,
  billPaymentListSuccess,
  billPaymentListFailure,
} = billPaymentSlice.actions;

export default billPaymentSlice.reducer;
