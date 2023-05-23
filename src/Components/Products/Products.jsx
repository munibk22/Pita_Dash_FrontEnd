import React, { useState, useEffect } from 'react';
import Product from './Product';
import ShoppingCart2 from '../ShoppingCart2';
import { useSelector } from 'react-redux';

const Products = (props) =>{
  const products = props.products;
  // const storeItems = props.items;
  const storeItems = useSelector(state => state.cart.items);
  const [cartItems, setCartItems] = useState([] );
  useEffect(()=>{
    setCartItems(storeItems);

  },[storeItems]);
  // console.log(props.products);
// const products = [
//   {id:1, 
//   title: 'Shwarma Sandwich',
//   image:"https://imgur.com/hZ3UgXL.jpg", 
//   description:'Shwarma', 
//   price:'7'},
//   {id:2, 
//   title: 'Burger',  
//   image:"https://i.imgur.com/oF4K6o1.png"
//  , 
//   description:'Musroom burger', 
//   price:'9'},
//   {id:3,
//      title: 'Hummus', 
//      image:'https://imgur.com/eSgW0C3.jpg', 
//      description:'Hummus',
//      price:'7'},

// ]

 


 return(
  <div className='product-container' data-aos="fade-down">
{products && products.map(product =>
   <Product  product = {product}
   storeItems={storeItems}
   cartItems={cartItems}
   />
   ) }
   
  </div>
 
 )

};

export default Products;