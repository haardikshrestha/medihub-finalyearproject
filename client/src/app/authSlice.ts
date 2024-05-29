import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

// dummy auth mechanism
const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    role: string;
    email: string;
  };
}

const initialState: AuthState = {
  isAuthenticated,
  user: {
    id: "",
    firstname: "",
    lastname: "",
    role: "",
    email: "",
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(
      state: AuthState,
      action: { type: string; payload: { id: string; firstname: string; lastname: string; role: string; email: string } }
    ) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("accessToken")
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;


export const setInitialAuth = (dispatch: any) => {
  const token = localStorage.getItem("accessToken");
  if(!token){
    return 
  }
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");

  if (token && role && id ) {
    dispatch(setAuth({ id, role,email:"", firstname: "", lastname: ""}));
  }
  


}