import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import "./login.css"

export const Signup = () => {
    const { signUpHandler } = useAuth();

    const [userSignUpDetails, setUserSignUpDetails] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });

    const handleInput = (e) =>
        setUserSignUpDetails({
        ...userSignUpDetails,
        [e.target.name]: e.target.value,
    });

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        signUpHandler(userSignUpDetails);
    };
  return (
    <div>
        <div className='card'>
            <h1 className='heading'>Sign Up</h1>
           <form onSubmit={handleSignUpSubmit}>
                <label className='input-label' htmlFor='form-input'> Email address</label>
                <input
                    className='form-input'
                    type="text"
                    name='firstName'
                    placeholder="Husaini"
                    onChange={handleInput}
                />
                <label className='input-label' htmlFor='form-input'> Email address</label>
                <input
                    className='form-input'
                    type="text"
                    name='lastName'
                    placeholder="Bohra"
                    onChange={handleInput}
                />
                <label className='input-label' htmlFor='form-input'> Email address</label>
                <input
                    className='form-input'
                    type="text"
                    name='email'
                    placeholder="Husaini@gmail.com"
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

                <label className='checkbox-label' htmlFor="checkbox-input">
                    <input type="checkbox" className='checkbox-input'/>
                    I accept all Terms & Conditions
                </label>

                <button className='btn-login'>Sign Up</button>
                <NavLink to="/login" className='create-account-link'>
                    Already have an account &gt;
                </NavLink>
           </form>
        </div>
    </div>
  )
}
