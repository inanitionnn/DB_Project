import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "../../interfaces/auth.interfaces";

interface UserState {
  user: { id: string; name: string; email: string };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: { id: "", name: "", email: "" },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload;
      state.isLoggedIn = action.payload.id !== "";
    },
    setlogOutState(state) {
      state.user = { id: "", name: "", email: "" };
      state.isLoggedIn = false;
    },
  },
});

export const { setUserState, setlogOutState } = userSlice.actions;
export default userSlice.reducer;
