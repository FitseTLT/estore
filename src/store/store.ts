import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import productSlice from "./features/productSlice";

const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
