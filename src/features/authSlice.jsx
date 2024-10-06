import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: false,
    token: null,
    userId: null,
    email:null,
    password:"",
    name:"",
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.token = payload?.Token;
      state.userId = payload?.result?._id;
      state.email=payload?.result?.email;
      state.name=payload?.result?.name;
      state.password=payload?.result?.password
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.token = payload?.Token;
      state.userId = payload?.result?._id;
      state.email = payload?.result?.email;
      state.name=payload?.result?.name;
      state.password=payload?.result?.password
    },

    updateSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.name=payload?.result?.name;
      state.password=payload?.result?.password
      state.userId = payload?.result?._id;
      state.email = payload?.result?.email;h

    },

    passwordUpdateSuccess:(state, { payload }) => {
      state.password=payload?.data?.result?.password
    },


    logoutSuccess: (state) => {
    state.loading= false;
    state.error= false;
    state.token= null;
    state.userId= null;
    state.email=null;
    state.name="";
    state.password="";
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  passwordUpdateSuccess,
  updateSuccess

} = authSlice.actions;

export default authSlice.reducer;
