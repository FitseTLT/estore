import { createSlice } from "@reduxjs/toolkit";

export interface Cart {
    id: number;
    name: string;
    price: number;
    amount: number;
    img: string;
}

const initialState: Cart[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, amount, name, price, img } = action.payload;
            const product = state.find((cart) => cart.id === id);
            if (product) {
                product.amount += amount;
            } else {
                state.push({ id, name, price, amount, img });
            }
        },
        deleteCart: (state, action) => {
            const id = action.payload;

            return state.filter((cart) => id !== cart.id);
        },
    },
});

export const { addToCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;
