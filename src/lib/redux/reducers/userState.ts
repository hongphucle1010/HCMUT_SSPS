import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role, User } from "./types";

interface AuthorizationState {
  value: {
    name: string;
    role: Role;
  };
}

const authorization = createSlice({
  name: "authorization",
  initialState: {
    value: {
      name: "",
      role: "GUEST" as Role,
    },
  },
  reducers: {
    logOutReducer: (state: AuthorizationState) => {
      state.value.name = "";
      state.value.role = "GUEST";
    },
    logInReducer: (state: AuthorizationState, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { logOutReducer, logInReducer } =
  authorization.actions;

export default authorization.reducer;
