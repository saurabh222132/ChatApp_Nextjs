"use client";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Signup, Login, LoginByGoogle, checkAuth } from "./AuthAPI";

const initialState = {
  status: "ideal",
  message: null,
  totalUsers: [],
  loggedInuser: null,
  OnlineUsers: [],
  selectedUser: null,
  // socketInstance: null,
  usersMessagees: [], // [ {email : abc@gmail.com, name : " name " , hisMessages: [] , mineMessages : [] } , .... ]
};

export const createUserAsync = createAsyncThunk(
  "Auth/createuser",
  async (userdata) => {
    const response = await Signup(userdata);
    return response;
  }
);

export const LoginUserAsync = createAsyncThunk(
  "Auth/loginuser",
  async (userdata) => {
    const response = await Login(userdata);
    console.log("response ", response);
    return response;
  }
);

export const LoginUserByGoogleAsync = createAsyncThunk(
  "Auth/loginUserByGoolge",
  async () => {
    const response = await LoginByGoogle();
    return response;
  }
);
export const checkAuthAsync = createAsyncThunk(
  "Auth/checkAuthAsync",
  async () => {
    const response = await checkAuth();
    return response;
  }
);

const AuthSlice = createSlice({
  name: "authSlcie",
  initialState,
  reducers: {
    addOnlineUsers: (state, action) => {
      console.log("Action into the slice", action);
      state.OnlineUsers = action.payload;
    },
    setSlectedUser: (state, action) => {
      console.log("action payload of setselctedusr", action.payload);
      state.selectedUser = action.payload;
    },
    // setSocketInstance: (state, action) => {
    //   state.socketInstance = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          console.log(" action.payload is here", action.payload);
          state.status = "fulfilled";
          state.message = action.payload.message;
        } else {
          state.status = "fulfilled";
          state.message = action.payload.message;
        }
      })
      .addCase(LoginUserAsync.pending, (state, action) => {
        state.status = "pening";
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        console.log("login success", action.payload);
        state.status = "fulfilled";
        action.payload.user ? (state.loggedInuser = action.payload.user) : "";
        state.message = action.payload.message;

        action.payload.totalUsers
          ? (state.totalUsers = [...action.payload.totalUsers])
          : "";
      })
      .addCase(LoginUserByGoogleAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(LoginUserByGoogleAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        action.payload.user ? (state.loggedInuser = action.payload.user) : "";
        state.message = action.payload.message;

        action.payload.totalUsers
          ? (state.totalUsers = [...action.payload.totalUsers])
          : "";
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        console.log("Check Auth API called", action.payload);
        state.loggedInuser = action.payload.user;
        state.totalUsers = action.payload.totalUsers;
      });
  },
});

// export const { addValue, subValue, addByAmount } = AuthSlice.actions;
export const { addOnlineUsers, setSlectedUser, setSocketInstance } =
  AuthSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInuser;
export const selectTotalUsers = (state) => state.auth.totalUsers;
export const selectLoginMessage = (state) => state.auth.message;
export const selectLogingSuccess = (state) => state.auth.success;
export const selectOnlineUsers = (state) => state.auth.OnlineUsers;
export const selectSelectedUser = (state) => state.auth.selectedUser;
// export const selectSocketInstance = (state) => state.auth.socketInstance;

export const AuthReducer = AuthSlice.reducer;
