import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 items: [
  {quantity:0}
 ],
 totalQuantity: 0,
 totalPrice: 0,
};

export const cartSlice = createSlice({
 name:'cart',
 initialState,
 reducers:{
  addItem: (state,action) => {
   const newItem = action.payload;
   const existingItem = state.items.find(item => item.id == newItem.id);

   if(!existingItem)
    state.items.push({ // newItem    
     id: newItem.id,
     name: newItem.name,
     price: newItem.price.raw,
     quantity: 1,    
    });
   else
    existingItem.quantity++;

    state.totalQuantity++; //Increase total count every push
    state.totalPrice += newItem.price.raw; //update Total every push
  },
  removeItem: (state,action) => {
    // state.items.pop(action.payload);
   // state.total -= action.payload.price;

   const itemToRemoveId = action.payload;
   const existingItem = state.items.filter(item => item.id === itemToRemoveId.id)

   if (existingItem.quantity === 1) {
    state.items = state.items.filter(item => item.id !== itemToRemoveId.id);
  } else {
    existingItem.quantity = existingItem.quantity-1;
  }
    state.totalQuantity = state.totalQuantity-1;
    state.totalPrice = state.totalPrice - itemToRemoveId.price.raw;
  },
  clearCart: (state)=> {
    state.items = [];
    state.totalQuantity  = 0;
    state.totalPrice = 0;
  },
  getItem: (state,action) =>{
    // state.items.filter(item => item.id === action.payload)
    //  state.items
  },
  
 }
});

export const {addItem,removeItem,clearCart,getItem} = cartSlice.actions;
export default cartSlice.reducer;
