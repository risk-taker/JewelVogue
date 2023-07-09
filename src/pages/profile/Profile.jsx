import React from 'react'
import { useAuth } from '../../context/AuthContext';
import "./profile.css";
import { NavLink,Outlet } from 'react-router-dom';

export const Profile = () => {
    const { currentUser } = useAuth();
    const { firstName } = currentUser;

    const activeTabColor = ({ isActive }) => ({
        backgroundColor: isActive ? "#232f3e" : "transparent",
        color: isActive ? "white" : "black",
      });

    return(
        <div className="user-profile">
          <h2 className='profile-head'>Welcome, {firstName}</h2>
          <div className="profile-links">
            <NavLink className='profile-details-list'
            style={activeTabColor}
              to="/profile/user"
            >
              Profile
            </NavLink>

            <NavLink className='profile-details-list'
            style={activeTabColor}
              to="/profile/address"
            >
              Address
            </NavLink>
          </div>
          <Outlet />
        </div>
      );
    };
