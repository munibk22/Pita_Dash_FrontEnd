import React, { useState, useEffect } from 'react';
import {Products,Header,ShoppingCart2} from './Components/ComponentIndex';
import {commerceService} from './lib/commerce.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [products,setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10,qty:1 },
    { id: 2, name: 'Item 2', price: 20,qty:1 },
    { id: 3, name: 'Item 3', price: 30,qty:1 },
  ]);

  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10,qty:1 },
    { id: 2, name: 'Item 2', price: 20,qty:1 },
    { id: 3, name: 'Item 3', price: 30,qty:1 },
  ]);

  const fetchProducts = async() =>{
const {data} = await commerceService.products.list();
// console.log(data);
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

  console.log(products);

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
 <Products products={products}  items={cartItems} onRemove={handleRemoveItem}
  removeItem={removeItem}/>
  <ToastContainer />
 </div>
  );
}

export default App;
