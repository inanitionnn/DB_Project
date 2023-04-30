import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product.interfaces";

interface ProductState {
  products: IProduct[];
}
const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductState(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setProductLogoutState(state) {
      state.products = [];
    },
  },
});

export const { setProductLogoutState, setProductState } = productSlice.actions;
export default productSlice.reducer;
