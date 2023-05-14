import {configureStore, createSlice} from '@reduxjs/toolkit';
import {combinedReducers} from 'redux';

export const cartSlice = createSlice({
 name: 'cart',
 initialState: {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
 },
 reducers: {
  addItem: (state, action) => {
   const newItem = action.payload;
   const existingItem = state.items.find(item => item.id === newItem.id);
   // cartItems: state.items.push(action.payload);
   // total: state.total += action.payload.price;
   if (!existingItem) {
    state.items.push(
     // newItem
     {
      id: newItem.id,
      name: newItem.name,
      price: newItem.price.raw,
      quantity: 1,    }
      );
  } else {
    existingItem.quantity++;
  }
  state.totalQuantity++;
  state.totalPrice += newItem.price.raw;
  },
  removeItem: (state,action) => {
   // state.items.pop(action.payload);
   // state.total -= action.payload.price;
   const id = action.payload;
   const existingItem = state.items.find(item => item.id === id);
   if (existingItem.quantity === 1) {
     state.items = state.items.filter(item => item.id !== id);
   } else {
     existingItem.quantity--;
   }
   state.totalQuantity--;
   state.totalPrice -= existingItem.price;
  },
  clearCart(state) {
   state.totalQuantity  = [];
   state.totalPrice = 0;
  }
 },
});

export const store = configureStore({
 reducer: {
  cart: cartSlice.reducer,
}
});

export const cartActions = cartSlice.actions;

// export default store;
