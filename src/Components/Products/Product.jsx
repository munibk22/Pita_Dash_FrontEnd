import React,{useState,useEffect} from 'react'
import DrinkSelection from './DrinkSelection'
import FriesSelection from './FriesSelection';
import { useDispatch,useSelector} from 'react-redux';
import { addItem,removeItem,getItem } from '../Redux/cartSlice';
import {toast} from 'react-toastify';

const Product = (props) => {
  // const {id,title,image,description,price} = "props";
  const {id,name,image,description,price,storeItems,product,cartItems} = props;
  // console.log(cartItems);
  // console.log(props);
const [mealPrice,setMealPrice] = useState(+product.price.raw+3);
const [shwarmaMeal,setShwarmaMeal] = useState(false);
const dispatch = useDispatch();
const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    
    // const [cartItems,setCartItems] = useState([]);
    const [qty,setQty] = useState(0);
    
// useEffect(() => {
//   console.log(id);
  
  // console.log(itemQty);

    
  // console.log(itemQty?.quantity);
// }, [cartItems])

async function addToCartHandler(item) {
  console.log(item);
  await dispatch(addItem(item));
  let itemQty = storeItems.find(storeItem => storeItem.id === product.id)?  storeItems.find(storeItem => storeItem.id === product.id)
  :null;
  if(itemQty == null)
  setQty(()=> (1)); 
  else
  setQty(()=> itemQty.quantity+1);

  toast.success(`${item.name} was added to cart`,{
    autoClose: 1200,
  });

  // let checkoutModal = document.getElementById('my-dialog');
    setTimeout(() => {
      const cartContainer= document.querySelector('.cart-container');
      cartContainer.setAttribute("open", "");
    }, 500);
  // // Show the modal
  // detailsModal.style.display = 'block';

  // setCartItems(storeItems);
  // dispatch(cartActions.increaseQuantity(id));
  // setTimeout(()=>{
    
    // console.log(itemQty);
    // setQty(itemQty);
    // },2500
    // );
// try {
//   const itemQty = await dispatch(getItem(item.id));
//   console.log(itemQty);
// } catch (error) {
//   console.log(error);
// }
    
  };
  

const removeItemHandler= (id) => {
  console.log(id);
  dispatch(removeItem(id))
  if(qty !== 0)
  setQty(()=> qty-1)
  else{
    setQty('')

  }

};

const decreaseQuantityHandler= (id) => {
  // dispatch(cartActions.decreaseQuantity(id));
  dispatch(removeItem(id))
};

function increaseQuantityHandler(id) {
  // dispatch(increaseQuantity(id));
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

// console.log(product);
  return (   
 <section key={product.id} className="card-container ">
   <h2 className="card-title drop-shadow4">{product.name}</h2>
   <img src= {product.image.url} alt="Image" 
   className="card-img drop-shadow4" 
   width='250px' height='220px' />  
   <form className="card-text meal-selection ">
   
<label title= {product.title + ' Only'}>
    <input onChange={e=>handleSingleSelections(e,{description})}
    type="radio" name="meal-selection-group" value="sandwhich-only" />  
    {"   "}{product.title} Only - 
</label>
<span><strong>${product.price.raw}</strong></span>
<label title = 'Includes Fries and Drink'>
    <input onChange={e=>handleMealSelections(e,{description})}
    type="radio" name="meal-selection-group" value="sandwhich-meal" />  
    {"   "} {product.title} w/Meal  - 
</label>
<span><strong>${mealPrice}</strong></span>

{shwarmaMeal && <div className='submenu'>
<span>  <DrinkSelection key={product.id}/></span> <span> <FriesSelection key={product.id}/></span> 
</div>   }

    </form> 
    {/* id,name,image,description,price */}
   <div className="card-body ">     
    <span className=" add-to-cart">
     <button className="btn-red-remove" onClick={() => removeItemHandler(product)}>-</button>
     <button className="cart-btn btn-blue-cart" onClick={() => addToCartHandler(product)}>Add To Cart</button>
     <input readOnly placeholder='0' value={qty}
      type="text" className="width-55 font-medium text-center" />
     <button className="btn-blue-add" onClick={() => addToCartHandler(product)}>+</button>
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