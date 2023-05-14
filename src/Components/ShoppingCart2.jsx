import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

const ShoppingCart2 = ({onRemoveItem}) => {
  const storeItems = useSelector(state => state.cart.items);
  
    const [items, setItems] = useState([
      // { id: 1, name: 'Item 1', price: 10,qty:1 },
      // { id: 2, name: 'Item 2', price: 20,qty:1 },
      // { id: 3, name: 'Item 3', price: 30,qty:1 },
    ]);
    const [cartItems, setCartItems] = useState([]
      // { id: 1, name: 'Item 1', price: 10,qty:1 },
      // { id: 2, name: 'Item 2', price: 20,qty:1 },
      // { id: 3, name: 'Item 3', price: 30,qty:1 },
    );
    const {SHIPPING_DEFAULT,TAX_RATE } = [0,0]
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);

    function calculateTotal(items, {shipping = SHIPPING_DEFAULT=0, discount =0} = {}) {
      //  
      if (items == null || items.length === 0) return 0;

      const itemCost = items.reduce((total, item) => {
        return total + item.price * item.quantity
      },0);

       const discountRate = 1 - discount;
       return itemCost * discountRate * TAX_RATE + shipping;
    }

    
    useEffect(()=>{
      setCartItems(storeItems);

    },[storeItems]);

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
<summary >{cartItems.length > 0 ?"Shopping Cart Items  " +`<h1>TEST</h1>`+ cartItems.reduce((acc,item )=> acc +item.quantity,0): 'Your cart is empty' } </summary>
      {cartItems.length === 0 ? (
        <span className='cart-summary '>Your cart is empty.</span>
      ) : (      
      <ul className='cart-summary '>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} &nbsp;&nbsp;&nbsp;
              <button className='btn-red-cart' onClick={() => onRemoveItem(item)}>Remove</button>
            </li>
          ))}
        <button className='btn-blue margin-top-10'>Checkout</button>
        <div>
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
        </ul>
      )}
</details>
 );
}

export default ShoppingCart2;