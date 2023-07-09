import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom'

import './login.css' 
import { useAuth } from '../../context/AuthContext'

export const Login = () => {

  const { loginHandler } = useAuth();
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });

  const guestUserDetails = {
    email: "husainibohra@gmail.com",
    password: "husaini",
  };

  const handleInput = (e) =>
    setUserLoginDetails({
      ...userLoginDetails,
      [e.target.name]: e.target.value,
    });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginHandler(userLoginDetails);
  };

  return (
    <div>
    <div className='card'>
      <h1 className='heading'>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label className='input-label' htmlFor='form-input'> Email address</label>
        <input
          className='form-input'
          type="text"
          name='email'
          placeholder="Husaini@neogcamp.com"
          onChange={handleInput}
        />

        <label className='input-label' htmlFor='form-input'> Password</label>
        <input
          className='form-input'
          type="password"
          name='password'
          placeholder="***************"
          onChange={handleInput}
        />

        <button className='btn-login' type='submit'>Login</button>
        <button className='btn-login' type='submit' onClick={()=> setUserLoginDetails(guestUserDetails)}>Login as Guest</button>
        <NavLink to="/signup" className='create-account-link'>
          Create new account &gt;
        </NavLink>
      </form>
    </div>
    </div>
  )
}
