import React from 'react'
import './userProfile.css'
import { useAuth } from '../../../context/AuthContext'

export const UserProfile = () => {
  const { currentUser, logoutHandler } = useAuth();
  const { firstName, lastName, email } = currentUser;

  return(
    <div className='profile-card'>
      <h2>Profile</h2>
      <hr/>
      <div className='user-details'>
        <h3>Full Name: </h3>
        
        <h4>
           {firstName} {lastName}
        </h4>
      </div>
      <div className='user-details'>
        <h3>Email: </h3>
        <h4> {email}</h4>
      </div>
      <button className='logout-btn' onClick={logoutHandler}>Logout</button>
    </div>
  )
}
