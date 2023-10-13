import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("Cart")) || [],
  favorites: JSON.parse(localStorage.getItem("Fav")) || [],
  totalQuantityFav: 0,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ ...action.payload });
      }

      localStorage.setItem("Cart", JSON.stringify(state.cart));
    },

    addToFavorites: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.favorites.find((item) => item.id === id);

      if (!existingItem) {
        state.favorites.push({ ...action.payload });
        localStorage.setItem("Fav", JSON.stringify(state.favorites));
      }
    },

    getFavoritesTotal: (state) => {
      state.totalQuantityFav = state.favorites.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    getCartTotal: (state) => {
      state.cart.forEach((item) => {
        item.subtotal = item.price * item.quantity;
      });

      state.totalQuantity = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.cart
        .reduce((total, item) => total + item.subtotal, 0)
        .toFixed(2);
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);

      localStorage.setItem("Cart", JSON.stringify(state.cart));
    },

    removeFromFavorites: (state, action) => {
      const idToRemove = action.payload;
      state.favorites = state.favorites.filter(
        (item) => item.id !== idToRemove
      );
      localStorage.setItem("Fav", JSON.stringify(state.favorites));
    },

    resetCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;

      localStorage.setItem("Cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  removeItem,
  resetCart,
  addToFavorites,
  removeFromFavorites,
  getFavoritesTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
