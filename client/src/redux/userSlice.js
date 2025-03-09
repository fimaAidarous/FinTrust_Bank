import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,  
  loading: false,     
  error: null,        
  token: null,        
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null; 
    },

    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token; 
      state.loading = false;  
      state.error = null;    
    },

    loginFailure: (state, action) => {
      state.error = action.payload;  
      state.loading = false;  
    },


    logout: (state) => {
      state.currentUser = null;  
      state.token = null;        
      state.loading = false;     
      state.error = null;        
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
