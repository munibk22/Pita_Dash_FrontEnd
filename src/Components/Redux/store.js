import {configureStore, createSlice} from '@reduxjs/toolkit';
import {combinedReducers} from 'redux';

export const cartSlice = createSlice({
 name: 'cart',
 initialState: {
  items: [],
  quantity: 0,
  total: 0,
 },
 reducers: {
  addItem: (state, action) => {
   const newItem = action.payload;
   const existingItem = state.items.find(item => item.id === newItem.id);
   // cartItems: state.items.push(action.payload);
   // total: state.total += action.payload.price;
   if (!existingItem) {
    state.items.push({
      id: newItem.id,
      name: newItem.name,
      price: newItem.price,
      quantity: 1,
    });
  } else {
    existingItem.quantity++;
  }
  state.totalQuantity++;
  state.totalPrice += newItem.price;
  },
  removeItem: (state,payload) => {
   state.items.pop(action.payload);
   state.total -= action.payload.price;
  },
  clearCart(state) {
   state.items = [];
   state.total = 0;
  }
 },
});

const rootReducer = combinedReducers({
 cart: cart.Slice.reducer,
});

