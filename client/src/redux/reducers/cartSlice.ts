import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartResponse } from "../../interfaces/cart.interfaces";

const initialState: CartResponse = {
  total: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartState(state, action: PayloadAction<CartResponse>) {
      state.total = action.payload.total;
      state.products = action.payload.products;
    },
    setCartLogoutState(state) {
      state.total = 0;
      state.products = [];
    },
  },
});

export const { setCartState, setCartLogoutState } = cartSlice.actions;
export default cartSlice.reducer;
