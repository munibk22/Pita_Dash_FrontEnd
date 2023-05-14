import React,{useState,useEffect} from 'react'
import DrinkSelection from './DrinkSelection'
import FriesSelection from './FriesSelection';
import { useDispatch,useSelector} from 'react-redux';
import { cartActions } from '../Redux/store';

const Product = ({props}) => {
 console.log(props);
 // const {id,title,image,description,price} = "props";
 const {id,name,image,description,price} = {props};
 console.log(name);
const [mealPrice,setMealPrice] = useState(+props.price.raw+3);
const [shwarmaMeal,setShwarmaMeal] = useState(false);
const dispatch = useDispatch();
const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const storeItems = useSelector(state => state.cart.items);
    const [qty,setQty] = useState(totalQuantity);
    
    // useEffect(()=>{
    //   setQty(totalQuantity);
    // },[qty]);


function addToCartHandler(id) {
  dispatch(cartActions.addItem(id));
  // dispatch(cartActions.increaseQuantity(id));
};

const removeItemHandler= (id) => {
  dispatch(cartActions.removeItem(id))
};

const decreaseQuantityHandler= (id) => {
  // dispatch(cartActions.decreaseQuantity(id));
  dispatch(cartActions.removeItem(id))
};

function increaseQuantityHandler(id) {
  dispatch(cartActions.increaseQuantity(id));
}

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
 <section key={props.id} className="card-container ">
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

{shwarmaMeal && <div className='submenu'>
<span>  <DrinkSelection /></span> <span> <FriesSelection /></span> 
</div>   }

    </form> 
    {/* id,name,image,description,price */}
   <div className="card-body width-90 ">     
    <span className=" add-to-cart">
     <button className="btn-red-remove" onClick={() => removeItemHandler(props)}>-</button>
     <button className="cart-btn btn-green-login" onClick={() => addToCartHandler(props)}>Add To Cart</button>
     <input readOnly placeholder='0' value={totalQuantity}
      type="text" className="width-55 font-medium" />
     <button className="btn-blue-add" onClick={() => addToCartHandler(props)}>+</button>
     </span> 
     {/* <div>
      <input value="" placeholder='Items in Cart'
      type="text" className="" />
      </div> */}
   </div>
</section>
  )
}

export default Product