import React from 'react';
import Nav from './Nav';
import Login from './utils/Login';
import Cart from './ShoppingCart2';
import ShoppingCart2 from './ShoppingCart2';
import Register from './utils/Register';
// import logo1 from "../assests/pics/logo1.png";
// import logo2 from "../assests/pics/logo2.png";
// import logo3 from "../assests/pics/logo3.png";
// import logo4 from "../assests/pics/logo4.png";
// import logo5 from "../assests/pics/logo5.png";
// import logo6 from "../assests/pics/logo6.png";
// import logo7 from "../assests/pics/logo7.png";
// import logo8 from "../assests/pics/logo8.png";
// import logo9 from "../assests/pics/logo9.png";
// import logo10 from "../assests/pics/logo10.png";

const Header = () => {
  return (
    <div className='header sticky-50'>
    <div>
      <a href="/" className="navbar-brand special-color flex">
      {/* <i className="fas fa-store"></i> */}
      {/* <img alt='circle-logo' src='https://imgur.com/1cQxGEg.png' className='logo drop-shadow'></img> */}
      <img alt='circle-logo'
       src='https://i.imgur.com/YcBEygH.png'
        className='logo drop-shadow-logo '></img>
      {/* <span className='color'>     E-WebStore </span> */}
      </a>
      </div>
    {/* <img alt='circle-logo' src={arrow} className='circle-green'></img> */}
    <h1><Nav /></h1> 
    <span className="login-desktop"><h6><Login /></h6> </span>
    <span className="register-desktop"><h6><Register /></h6></span> 
    {/* <h6>Shopping Cart </h6>  */}
    {/* <h3><Cart /></h3>  */}
     <div className='width-90'> <ShoppingCart2 /></div>
    </div>
  )
}

export default Header