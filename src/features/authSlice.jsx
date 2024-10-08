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
    passcode:"",
    isVerified:""

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
      state.password=payload?.result?.password;
      state.passcode = payload?.passcode;
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
      state.email = payload?.result?.email;
      state.isVerified = payload?.result?.verified;
      state.authorization=payload?.result?.authorization
    },

    forgotPasswordTokenSuccess:(state, {payload})=>{
      state.token=payload?.Token

    },

    passwordUpdateSuccess:(state, { payload }) => {
      state.password=payload?.data?.result?.password
      state.name=payload?.data?.result?.name;
      state.password=payload?.data?.result?.password
      state.userId = payload?.data?.result?._id;
      state.email = payload?.data?.result?.email;
      state.isVerified = payload?.data?.result?.verified;
    },


    logoutSuccess: (state) => {
    state.loading= false;
    state.error= false;
    state.token= null;
    state.userId= null;
    state.email=null;
    state.name="";
    state.password="";
    state.passcode="";

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
  updateSuccess,
  forgotPasswordTokenSuccess

} = authSlice.actions;

export default authSlice.reducer;
