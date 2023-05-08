import React,{useState,useEffect} from 'react'
import DrinkSelection from './DrinkSelection'
import FriesSelection from './FriesSelection'

const Product = ({props}) => {
 console.log(props);
 // const {id,title,image,description,price} = "props";
 const {id,name,image,description,price} = {props};
 console.log(name);
const [mealPrice,setMealPrice] = useState(+props.price.raw+3);
const [shwarmaMeal,setShwarmaMeal] = useState(false);

const handleMealSelections = (async (e,type) =>{
 // e.preventDefault();
 console.log(type?.description);

 await e.target.value =='sandwhich-meal' ? setShwarmaMeal(true):setShwarmaMeal(false);
console.log(e.target.value=='sandwhich-meal' );

});

const handleSingleSelections = (async (e,type) =>{
 // e.preventDefault();
 console.log(type?.description);

  let test = await e.target.value =='sandwhich-only' ? setShwarmaMeal(false):setShwarmaMeal(true);
console.log(e.target.value=='sandwhich-only' );

});

// console.log(props);
  return (   
 <>
   <h2 className="card-title drop-shadow4">{props.name}</h2>
   <img src= {props.image.url} alt="Image" 
   className="card-img drop-shadow4" 
   width='250px' height='220px' />  
   <form className="card-text meal-selection  width-100">
   
<label title= {props.title + ' Only'}>
    <input onChange={e=>handleSingleSelections(e,{description})}
    type="radio" name="meal-selection-group" value="sandwhich-only" />  
    {"   "}{props.title} Only - 
</label>
<span><strong>${props.price.raw}</strong></span>
<label title = 'Includes Fries and Drink'>
    <input onChange={e=>handleMealSelections(e,{description})}
    type="radio" name="meal-selection-group" value="sandwhich-meal" />  
    {"   "} {props.title} w/Meal  - 
</label>
<span><strong>${mealPrice}</strong></span>
<div>
{shwarmaMeal && <div className='submenu'>
 <DrinkSelection /> <FriesSelection />
</div>   }
</div>

 
    </form> 
    
   <div className="card-body width-90 text-center">     
    <span className=" add-to-cart">
     <button className="btn-red-remove">-</button>
     <button className="cart-btn btn-green-login">Add To Cart</button>
     <input  placeholder='0'
      type="text" className="width-55 font-medium" />
     <button className="btn-blue-add">+</button>
     </span> 
     {/* <div>
      <input value="" placeholder='Items in Cart'
      type="text" className="" />
      </div> */}
   </div>
</>
  )
}

export default Product