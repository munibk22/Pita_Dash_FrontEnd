import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import customerReduer from './customerSlice';

export const store = configureStore({
 reducer: {
  customer: customerReduer,
  cart: cartReducer,
 },
});