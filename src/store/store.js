import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import wishListSlice from "./wishListSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    wishList:wishListSlice
  },
});

export default store;
