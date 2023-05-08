import React,{ useState,useRef } from 'react'
import { FetchService } from './AjaxCalls';
import {toast} from 'react-toastify';


const Register = () => {
 const [registrationData, setRegistrationData] = useState({
  firstName:'',
  lastName:'',
  userName:'',
  password:'',
  address:'',
  zipCode:'',
  phone:'',
 });
  const [username,setUserName] = useState([]);
  const modalRef = useRef(null);
 
 const handleClose = ()=>{
  console.log('clicked close');
  modalRef.current.close();  //Close Modal
  };  

const handleRegisterModal= e => {
 e.preventDefault();
 console.log("Register Modal");
 modalRef.current.showModal();
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  console.log("User Registered");
  // FetchService
try {
 let {data,responseStatus} = await FetchService.postData('auth/register',registrationData);
 if(responseStatus === 200){
    console.log(data);
    toast.success(data.firstName + ' has registered successfully')
    setUserName(data);
    handleClose();
 }
} catch (error) {
  toast.error(error+"Could Not Register..",{
    position: toast.POSITION.TOP_LEFT,
  } );
  console.log(error);
}

 };

 const handleInputChange = e => {
  const { name, value } = e.target;
  setRegistrationData({...registrationData,[name]:value.toLowerCase()})
 }

  return (
   <> 
   <input type='button' value='Register' 
   className="btn-purple" onClick={handleRegisterModal} /> 
    <dialog className="register-container" id='register-modal' ref={modalRef}>
     
    <form method='dialog'  className='register-modal'
    onSubmit={handleSubmit}>
    <button type="button" className='close' onClick={handleClose}>X</button>
     <h1>Enter Registration Details</h1>
    <ul className='register-form'>

     <li><label htmlFor="firstName">First Name</label>
        <input onChange={handleInputChange } tpye="text" placeholder='Enter
         First Name here..' id='firstName' name='firstName' />
        </li>
        <li><label htmlFor="lastName">Last Name</label>
        <input onChange={handleInputChange } tpye="lastName" placeholder='Enter
         Last Name here..' id='lastName' name='lastName' />
        </li>
        <li><label htmlFor="userName">UserName/Email</label>
        <input onChange={handleInputChange } tpye="userName" placeholder='youremail@mail.com..' id='userName' name='userName' />
        </li>
        <li><label htmlFor="password">Password</label>
        <input onChange={handleInputChange } tpye="password" placeholder='Enter
         Password here..' id='password' name='password' />
        </li>
        <li><label htmlFor="address">Address</label>
        <input onChange={handleInputChange } tpye="address" placeholder='123 Apple st..'
         id='address' name='address' />
        </li>        
        <li><label htmlFor="zipCode">Zipcode</label>
        <input onChange={handleInputChange } tpye="zipCode" placeholder='435xx..' id='zipCode' name='zipCode' />
        </li>
        <li><label htmlFor="phone">Phone</label>
        <input onChange={handleInputChange } tpye="phone" placeholder='xxx-xxx-xxxx' id='phone' name='phone' />
        </li>
    </ul>
    <li><button type="submit" className='btn-blue'>Submit</button></li>
    <li><button type="button" className='btn-red' onClick={handleClose}>Close</button></li>
    </form>
    </dialog>
    </>
  )
}

export default Register