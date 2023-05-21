import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Payment from './Stripe/Payment'
import CheckoutForm from './Stripe/CheckoutForm';

const ShoppingCart2 = ({onRemoveItem}) => {
  const storeItems = useSelector(state => state.cart.items);
  const customer = useSelector(state => state.customer)
  
    const [items, setItems] = useState(['empty test cart']);
    const [cartItems, setCartItems] = useState([]
      // { id: 1, name: 'Item 1', price: 10,qty:1 },
      // { id: 2, name: 'Item 2', price: 20,qty:1 },
      // { id: 3, name: 'Item 3', price: 30,qty:1 },
    );
    const {SHIPPING_DEFAULT,TAX_RATE } = [0,0]
    const [checkoutModal,setCheckoutModal] = useState(false);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const name = useSelector(state => state.cart.name)
    const [isOpen, setIsOpen] = useState(false);

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
    
    const handleCheckout = () => setCheckoutModal(!checkoutModal);

    const handleToggle = () => {
      const detailsModal = document.querySelector('.cart-container');
      detailsModal.removeAttribute('open');
      };


 return (
  <span> 
<details className='cart-container'>
<summary >{cartItems.length > 0 ? (<><span > 🛒 Shopping Cart Items </span> <span
 className='red font-larger font-bold '>
 {cartItems.reduce((acc,item )=> acc +item.quantity,0)}</span></>) : (<span symbol="🛒">
   🛒 Your cart is empty {customer.firstName}</span>) } </summary>
      {  (      
      <ul className='cart-summary '>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} &nbsp;&nbsp;&nbsp;
              <button className='btn-red-cart' onClick={() => onRemoveItem(item)}>Remove</button>
            </li>
          ))}
        <div>
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button className='btn-blue margin-top-10' onClick={handleCheckout}>Checkout</button>
    </div>
    <button className="close-button2" aria-label="Close Details Box" onClick={handleToggle}>&times;</button>

        </ul>
      )}
</details>
{checkoutModal && 
(<dialog id="my-dialog" className="checkoutModal">
<div className="checkoutModal-content"> 
  <Payment 
  items={cartItems}
  description={name}
  amount={totalPrice}
  handleCheckout={handleCheckout}
  customer={customer}
  handleToggle={handleToggle}
  />
  
  <button id="close-dialog" className="checkoutModal-close red"
  aria-label="Close Payment Box"
   onClick={handleCheckout}>&times; </button>
  </div>
</dialog>)
}
</span>
 );
}

export default ShoppingCart2;