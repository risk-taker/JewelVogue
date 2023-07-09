import React from 'react'
import "./footer.css"
import { NavLink } from 'react-router-dom'
import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaInstagram} from 'react-icons/fa';


export const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer'>
            <div className='tagline'>
                <h2 className='center'>JewelVogue</h2>
                <h4 className='center'>Adorn Yourself in Style</h4>
            </div>
            <div>
                <h2 className='footer-heading'>Contact Us</h2>
                <p className='footer-icon'>
                    <NavLink to="https://github.com/Husaini29" className='footer-links'>
                        <AiOutlineGithub/>
                    </NavLink>
                    <NavLink to="https://www.instagram.com/husaini_bohra/" className='footer-links'>
                        <FaInstagram/>
                    </NavLink>
                    <NavLink to="/https://www.linkedin.com/in/husaini-bohra-03650722a/" className='footer-links'>
                        <AiFillLinkedin/>
                    </NavLink>
                </p>
            </div>
        </div>
        <p className='center'>	&#169; 2023 All rights reserved </p>
    </div>
  )
}
