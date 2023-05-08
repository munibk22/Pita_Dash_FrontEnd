import React from 'react';
import { useState } from 'react';

 const ShoppingCart2 = ({onRemoveItem}) => {
 const [items, setItems] = useState([
  { id: 1, name: 'Item 1', price: 10,qty:1 },
  { id: 2, name: 'Item 2', price: 20,qty:1 },
  { id: 3, name: 'Item 3', price: 30,qty:1 },]);
 const [cartItems, setCartItems] = useState([
  { id: 1, name: 'Item 1', price: 10,qty:1 },
  { id: 2, name: 'Item 2', price: 20,qty:1 },
  { id: 3, name: 'Item 3', price: 30,qty:1 },
]);


 


 const addItem = (e,productId,qty)=>{
  const products = [...setCartItems]; // create a shallow copy of the array
  const index = products.findIndex((p) => p.id === productId);
  
  if (index !== -1) {
    products[index].qty += qty;
  } else {
    products.push({ id: productId, qty });
  }

   setItems(...items,e.target.value);
 };

 const removeItem = e=> {
  const updatedList = items.filter(item => item.id != e.target.value);
  setItems(updatedList);
 }

 return (
<details className='cart-container'>
<summary >Shopping Cart</summary>
      {items.length === 0 ? (
        <span className='cart-summary '>Your cart is empty.</span>
      ) : (      
      <ul className='cart-summary '>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} &nbsp;&nbsp;&nbsp;
              <button className='btn-red-cart' onClick={() => onRemoveItem(item)}>Remove</button>
            </li>
          ))}
        <button className='btn-blue margin-top-10'>Checkout</button>
        </ul>
      )}
</details>
 );
}

export default ShoppingCart2;