import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: { type: string; payload: boolean }) {
      const { payload } = action;
      localStorage.setItem("isLoggedIn", payload.toString());
      state.isAuthenticated = payload;
    },
    logout(state) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      state.isAuthenticated = false;
    },
  },
});

export const { setIsAuthenticated, logout } = authSlice.actions;
export default authSlice;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthState = (state: RootState) => state.auth;
