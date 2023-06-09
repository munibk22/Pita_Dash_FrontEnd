import React from 'react';
import { useState,useEffect,useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Payment from './Stripe/Payment'
import CheckoutForm from './Stripe/CheckoutForm';
import {url} from './utils/AjaxCalls'
import {removeItem} from '../Components/Redux/cartSlice'
import Login from './utils/Login';

const ShoppingCart2 = ({onRemoveItem}) => {
  const storeItems = useSelector(state => state.cart.items);
  const customer = useSelector(state => state.customer)
  console.log(customer);
    const [items, setItems] = useState(['empty test cart']);
    const [cartItems, setCartItems] = useState([
      { id: 1, name: 'Item 1', price: 10,qty:1 },]
      // { id: 2, name: 'Item 2', price: 20,qty:1 },
      // { id: 3, name: 'Item 3', price: 30,qty:1 },
    );
    const {SHIPPING_DEFAULT,TAX_RATE } = [0,0]
    const [checkoutModal,setCheckoutModal] = useState(false);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    // const name = useSelector(state => state.cart.name)
    const [isOpen, setIsOpen] = useState(false);
    const [cs, setCS] = useState('');
    const [name,setNames] = useState([]);
    const [counter,setCounter] = useState(0);
    const checkoutModalRef = useRef(null);
    const cartDetailModal = useRef(null);
    const dispatch = useDispatch();
    const openModal = useRef(null);
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
      if(cartDetailModal.current != null)
      cartDetailModal.current.click();;
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

    const removeItemHandler = e=> {
      const updatedList = items.filter(item => item.id != e.target.value);
      setItems(updatedList);
    }
    
    const handleCheckout = async() => {
      const name = await cartItems.map(item => item.name)
      if(cartItems)   
      var itemAry=  cartItems.map(item => item.name)
      setNames(()=>itemAry); 

      if(customer.stripeId != ""){
      fetch(url+"payment/create-payment-intent", {
        headers:{'Content-Type':'application/json'},
          method: "POST",
          body: JSON.stringify({
            items: cartItems,
            currency: "usd",
            description:name.join(', '),
            amount: totalPrice,
           //stripeEmail:"cus_JUFRrOX9q3205v",
          stripeEmail:customer.stripeId,
           
          }),
        }).then(async (result) => {
          var {clientSecret}  = await result.json();
          await setCS(clientSecret);
        })
        .then(()=> {                  
           setCheckoutModal(!checkoutModal)           
          setTimeout(() => {            
           if(checkoutModalRef.current != null){
              // setCheckoutModal(!checkoutModal)
              checkoutModalRef.current.showModal();
           }
          }, 800);        
        })  
        .catch(error => console.error(error));
      } else {
        const loginButton = document.querySelector('.login-button');
        loginButton.click();

        // <Login openModal={openModal}/>
        // <Login isToggled={isToggled} toggleFunction={toggleFunction}/>
      }

      function openModal (){
        // toggleLogin();
      }
      


    };

    const handleToggle = () => {
      const detailsModal = document.querySelector('.cart-container');
      detailsModal.removeAttribute('open');
      };

      const closeStripeDialog= () => {
        // const detailsModal = document.querySelector('.checkoutModal');
        // detailsModal.removeAttribute('open');
        setCheckoutModal(!checkoutModal)
        };

        const handleRemoveItem= (product) =>{
          // e.preventDefault();
          console.log('removed objest clicked' + product);
          dispatch(removeItem(product));
          const updatedList = cartItems.filter(item => item.id != product.id);
          setCartItems(()=>[...updatedList]);
        };


 return (
  <div> 
    {cartItems.length > 1 ?<>
<details className='cart-container' ref={cartDetailModal}>
<summary > <span > 🛒 Shopping Cart Items </span> <span
 className='red font-larger font-bold '>
 {/* {cartItems.reduce((acc,item )=> acc +item.quantity,0)} */}
 {totalQuantity}
 </span> </summary>

      {  (      
      <ul className='cart-summary '>
          {cartItems.map((item) => {
            if(item.id)
           return (          
              <li key={item.id}>
              {item.name} - ${item.price} &nbsp;&nbsp;&nbsp;
              <button className='btn-red-cart' onClick={()=>handleRemoveItem(item)}>Remove</button>
            </li>
          )})}
        <div>
      <hr className="margin-top-10" />
      <p className="margin-top-5">Total Quantity: {totalQuantity}</p>
      <p>Total Price: $<span className="text-green">{totalPrice.toFixed(2)}</span></p>
        <button className='btn-blue margin-top-10' onClick={handleCheckout}>Checkout</button>
    </div>
    <button className="close-button2" aria-label="Close Details Box" onClick={handleToggle}>&times;</button>

        </ul>
      )}
</details></>  : <span symbol="🛒">  🛒 Your cart is empty {customer.firstName}</span>}
{checkoutModal && 
(<dialog id="my-dialog" className="checkoutModal" ref={checkoutModalRef}>
<div className="checkoutModal-content"> 
  <Payment 
  key={name}
  items={cartItems}
  description={name}
  amount={totalPrice}
  handleCheckout={handleCheckout}
  customer={customer}
  handleToggle={handleToggle}
  cs={cs}
  />
  
  <button id="close-dialog" className="checkoutModal-close red"
  aria-label="Close Payment Box"
   onClick={closeStripeDialog}>&times; </button>
  </div>
</dialog>)
}
</div>
 );
}

export default ShoppingCart2;