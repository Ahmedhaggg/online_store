import { createSlice } from "@reduxjs/toolkit";
import cookies from "../../services/cookies";
import { cartPriceKey, cartItemsKey } from "../../services/cookies/cookies_keys";

let defaultItems = () =>
    cookies.get(cartItemsKey) === undefined ? [] : JSON.parse(cookies.get(cartItemsKey));

let cartSlice = createSlice({
    name: "cart",
    initialState: { items: defaultItems(), totalPrice: parseInt(cookies.get(cartPriceKey)) || 0 },
    reducers: {
        addItemToCart: (state, action) => {
            let productInCart = state.items.find(item => item._id === action.payload._id);
            if (!productInCart) {
                state.items = [{ ...action.payload }]
                state.totalPrice += action.payload.price;
            }
            if (productInCart) {
                state.items = state.items.map(item => {
                    if (item._id === action.payload._id) {
                        item.quantity += action.payload.quantity;
                        state.totalPrice += action.payload.price;
                    }
                    return item;
                })
            }
            cookies.set(cartItemsKey, state.items);
            cookies.set(cartPriceKey, state.totalPrice);
        },
        deleteCart: (state, action) => {
            cookies.destroy(cartItemsKey)
            cookies.destroy(cartPriceKey);
            state.items = [];
            state.totalPrice = 0
        }
    }
})

export const { addItemToCart, deleteCart } = cartSlice.actions;

export default cartSlice.reducer;