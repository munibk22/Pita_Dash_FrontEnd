import React from 'react'
import { useState } from 'react';
import logo1 from '../../assests/pics/logo1.png';
const SignUp= () => {

  const usernames = ["david", "david1", "david2"];
  const [username,setUserName] = useState([]);

const spinner = document.getElementById("spinner"),
  alert = document.getElementById("alert");

const updateUi = (value) => {
  console.log("value", value);
  spinner.classList.remove("visible");

  const usernameExists = usernames.some((u) => u === value);

  console.log("usernames", usernames);
  console.log("usernameExists", usernameExists);

  if (usernameExists) {
    alert.classList.add("visible");
  } else {
    alert.classList.remove("visible");
  }
};

const debounce = (callback, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      callback.apply(null, args);
    }, time);
  };
};

const handleStartTyping = () => {
  spinner.classList.add("visible");
};

const handleChange = debounce((input) => {
  const { value } = input.target;

  updateUi(value);
}, 500);


 return (
  <>
  <div className='signup-body'>

    <div className="login-card login-modal">
      <img src= {logo1}
        // "https://pub-static.fotor.com/assets/projects/pages/5ff61721271e45d2b9bbc6dbbd4b14c7/300w/purple-cute-school-girl-78a8ba2c107c4ce1bb7e5a3de0ed9528.jpg"
        />
      <h2>Login</h2>
      <h3>Enter your credentials</h3>
      <form className="login-form">
        <div className="username">
          <input
            spellcheck="false"
            className="control"
            type="text"
            placeholder="Username"
            onkeyup="handleChange(event)"
            onkeydown="handleStartTyping()"
            />
          <div id="spinner" className="spinner"></div>
        </div>
        <div id="alert" className="alert">Username already exists</div>
        <input
          spellcheck="false"
          className="control"
          id="password"
          type="password"
          placeholder="Password"
          />
        <button className="control" type="button">Register</button>
      </form>
    </div>
          </div>
  </>
 )
}

export default SignUp;