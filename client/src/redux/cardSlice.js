import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  error: null,
  loading: false,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    createCardStart: (state) => {
      state.loading = true;
    },
    createCardSuccess: (state, action) => {
      state.cards.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createCardFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateCardStart: (state) => {
      state.loading = true;
    },
    updateCardSuccess: (state, action) => {
      const index = state.cards.findIndex(
        (card) => card._id === action.payload._id
      );
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateCardFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteCardStart: (state) => {
      state.loading = true;
    },
    deleteCardSuccess: (state, action) => {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCardFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    cardListStart: (state) => {
      state.loading = true;
    },
    cardListSuccess: (state, action) => {
      state.cards = action.payload;
      state.loading = false;
      state.error = null;
    },
    cardListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const fetchCards = () => async (dispatch) => {
  dispatch(cardListStart());
  try {
    const response = await fetch("http://localhost:3000/api/Cards");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch cards");
    }
    dispatch(cardListSuccess(data));
  } catch (error) {
    dispatch(cardListFailure(error.message));
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  dispatch(deleteCardStart());
  try {
    const response = await fetch(`http://localhost:3000/api/Cards/${cardId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete card');
    }

    dispatch(deleteCardSuccess(cardId));
  } catch (error) {
    dispatch(deleteCardFailure(error.message));
  }
};

export const {
  createCardStart,
  createCardSuccess,
  createCardFailure,
  updateCardStart,
  updateCardSuccess,
  updateCardFailure,
  deleteCardStart,
  deleteCardSuccess,
  deleteCardFailure,
  cardListStart,
  cardListSuccess,
  cardListFailure,
} = cardSlice.actions;

export default cardSlice.reducer;
