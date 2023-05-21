import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 id:null,
 firstName: "Not Logged In",
 lastName: "in",
 email:"test@gmail.com",
 address:"123 apple st",
 zipCode:"43528",
 phone:"555-555-3219",
 stripeId:"",
};

const customerSlice = createSlice({
 name: 'customer',
 initialState,
 reducers: {
  addCustomer:(state,action) => {
   const user = action.payload;

   state.id = user.id;
   state.firstName = user.firstName;
   state.lastName = user.lastName;
   state.email = user.email;
   state.address = user.address;
   state.zipCode = user.zipCode;
   state.phone = user.phone;
   state.stripeId = user.stripeId;  
  },
  removeCustomer:(state)=>{
   state.customers = initialState;
  }
 }
});

export const {addCustomer,removeCustomer} = customerSlice.actions;
export default customerSlice.reducer;


