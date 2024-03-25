import React, { useState, useEffect } from 'react';
import {Products,Header,Footer,Nav} from './Components/ComponentIndex';
import {commerceService} from './lib/commerce.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './assests/styles/media_query.css';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51Ir9CYBbKPDTbStSEP3nWgJPTtqXvsCs52VwZIRi4dN1YV8zpdf54HtpTHCVrE49JGrel5ftRh423Y4kKUiLAqH400uIDCTF79');

const App = () => {
  const [products,setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10,quantity:0 },
    { id: 2, name: 'Item 2', price: 20,quantity:0 },
    { id: 3, name: 'Item 3', price: 30,quantity:0 },
  ]);

  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10,quantity:0 },
    { id: 2, name: 'Item 2', price: 20,quantity:0 },
    { id: 3, name: 'Item 3', price: 30,quantity:0 },
  ]);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  const fetchProducts = async() =>{
const {data} = await commerceService.products.list();
console.log("Fethcing Data...");
setProducts(data);
  }
  useEffect(() =>{
    fetchProducts();
    
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      delay: 100,
    });

  },[]);

  const handleRemoveItem = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };
  const removeItem = e=> {
    const updatedList = items.filter(item => item.id != e.target.value);
    setItems(updatedList);
   }
  

  return(
 <div id="container">
 <Header items={cartItems} onRemove={handleRemoveItem} removeItem={removeItem}/>
 <section className='nav' data-aos="fade-right"><Nav /></section>
 <Products products={products}  items={cartItems} onRemove={handleRemoveItem}
  removeItem={removeItem}/>
  <ToastContainer />
  <div className=''> <Footer /></div>
 </div>
  );
}

export default App;
