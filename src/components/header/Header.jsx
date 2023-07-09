import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHeart,AiOutlineShopping } from 'react-icons/ai';
import { FiShoppingCart,FiLogOut } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { useCart } from '../../context/CartContext';
import { useProductData } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import "./header.css"

export const Header = () => {
    const { state:{cart} } = useCart();
    const { dispatch } = useProductData()
    const { token, logoutHandler } = useAuth();
    const cartItem = cart?.reduce((acc,curr)=> acc+curr.quantity,0)
  return (
        <nav className='navbar'>
            <div className='nav-header'>
            <NavLink to="/">
                <h3 className='site-name'>JewelVogue</h3>
            </NavLink>
            <input type='text' placeholder=" Search" className='search-input' onChange={(e)=>dispatch({ type:"SEARCH_INPUT",payload:e.target.value})}/>
        </div>
            <div className='nav-item'>
            <NavLink to="/products" className='nav-links'>
                <AiOutlineShopping className='nav-icons'/>
            </NavLink>
            <NavLink to={token ? '/profile/user' : '/login'} className='nav-links'>
                <BiUser className='nav-icons'/>
            </NavLink>
            <NavLink to='/wishlist' className='nav-links'>
                <AiOutlineHeart className='nav-icons'/>
            </NavLink>
            <NavLink to='/cart' className='nav-links'>
                <FiShoppingCart className='nav-icons'/>
                <span className='cart-total'>{cartItem}</span>
            </NavLink>
            <NavLink 
                to={token ? "/" : "/login"} 
                className='nav-links'
                onClick={token && logoutHandler}>
                <FiLogOut className='nav-icons'/>
            </NavLink>
            </div>
        </nav>
  )
}
