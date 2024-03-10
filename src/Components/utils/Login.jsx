import React, { useState, useRef} from 'react'
// import {FetchService} from './AjaxCalls'
import {FetchService} from './AjaxCalls'
import {toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addCustomer,removeCustomer } from '../Redux/customerSlice'; 

const Login = () => {
const [showDialog,setShowDialog] = useState(false);
const [userForm, setUserForm] = useState({
  userName:'',
  password:'',
})
const [user,setUser] = useState({});
const modalRef = useRef(null);
const dialog = document.querySelector("dialog")
const dispatch = useDispatch();


const toggleLogin = (e) => {
e.preventDefault();
console.log('click login');
setShowDialog(!showDialog);
modalRef.current.showModal(); //Open Modal
};

const handleClose = (e)=>{
e.preventDefault();
console.log('Login Modal clicked close');
modalRef.current.close();  //Close Modal
}

const handleInputChange  = (e) => {
  // const name = e.target.name;
  // const value = e.target.value;
  const { name, value } = e.target;
  setUserForm({...userForm,[name]:value.toLowerCase()});
};

const handleLogin = async(e) => {
  e.preventDefault();
  console.log('form submitted');
 
try {
  const {data, responseStatus} = await FetchService.postData('auth/login',userForm);
  // const data = await response.json();
  if(responseStatus === 200){
    setUser(data.user)
    await dispatch(addCustomer(data.user))
    

    // console.log(data.user.username + " logged in!");    
    toast.success("You were logged in Successfully",{
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2500,
      draggable: true,
    });
    modalRef.current.close();  //Close Modal
  }
} catch (error) {
  console.log(error);
  toast.error("Could not log in, please try again..",{
    position: toast.POSITION.TOP_LEFT,
    autoClose: 2000,
    draggable: true,
  });
  modalRef.current.close();
}
 };

function toggleRegister(e) {
  e.preventDefault();
  console.log("Clicked to Register");
  handleClose(e);
  const registerModalButton = document.querySelector('.register-button');
  registerModalButton.click();
}
 
  return (
   <>
   <button className='btn-green-login btn-green-login-mobile login-button' onClick={toggleLogin}>Login</button>
   {/* {showDialog && <div id='loginModal'>
  <form id='loginForm' onSubmit={handleLogin} >
  Enter UserName:
  <input type='submit' value='Login' />
    <button onClick={toggleLogin}>Close</button>
  </form>
   </div>} */}
   <dialog id="login-modal" className='' ref={modalRef}>
    <form method="dialog"
      className='login-modal'
       onSubmit={handleLogin} 
       >
    <button type="button" className='close' onClick={handleClose}>X</button>
      <ul className='login-form'>
      <h2>Login</h2>
        <li><label htmlFor="userName">Username</label>
        <input onChange={handleInputChange }
         placeholder="your_Email@mail.com.."
        type="text" id="userName" name="userName" required/>
        </li>
        <li><label htmlFor="password">Password</label>
        <input onChange={handleInputChange } tpye="password" placeholder='Enter
         Password here..' id='password' name='password' required />
        </li>
        <li><button type="submit" className='btn-blue'>Submit</button></li>
        <li><button type="button" className='btn-red' onClick={handleClose}>Close</button></li>
    <hr></hr>
    <section className="toggle-register">Need to Register?
      <p><button onClick={(e)=>toggleRegister(e)}>Click here</button></p>
    </section>
      </ul>
    </form>
   </dialog>
   
   </>
  )
}

export default Login;

// dialog.addEventListener("click", e => {
//   const dialogDimensions = dialog.getBoundingClientRect()
//   if (
//     e.clientX < dialogDimensions.left ||
//     e.clientX > dialogDimensions.right ||
//     e.clientY < dialogDimensions.top ||
//     e.clientY > dialogDimensions.bottom
//   ) {
//     dialog.close()
//   }
// })