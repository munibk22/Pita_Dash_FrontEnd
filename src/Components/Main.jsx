import React from 'react';
import RatingSystem from './Products/RatingsSystem';
// import { scrollIntoView } from 'scroll-into-view-if-needed';
import Aos from 'aos';

/**
 * @param props  
 * @return  
 */
const Main = (props) => {
  const {products} = props;
  console.log(products);

/* css class to add drop shadow */
  const shadow = {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
  } ;
  return (
  <>
  {products.map(product =>{
    const {id,title,description,price,category,image,rating} = product;
    // if (product.id == 1) return;
    if (title == null) title = "Loading Products...";
    return (
    <div data-aos="fade-down" key={id} className='
    product-grid align-center 
    margin-bottom-2
    padding-4 product-style
    align-center text-center '>
      <h3 data-aos="fade-down"  className='item-title' title={title}>{title}</h3>

      <span>
     <img src={image} alt='product image' className='item-image '></img>
     <div className='margin-top-4'> <RatingSystem rating={rating.rate} /> </div>     
     </span>

     <div> 
      <span className='item-price' >- {category} <span style={{color:'green'}}> $</span>{price} -   
     </span>
     </div>

     <div>           
     <span> <button className= "btn-green">Add to Cart</button> 
     </span>
     </div>

     <article className='item-description' title={description}>{description}</article>    
     
     
     </div>)
  })}
  </>
 )
}

export default Main;