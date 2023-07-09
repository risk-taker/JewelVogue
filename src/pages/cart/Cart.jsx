import React from 'react'
import { useCart } from '../../context/CartContext'
import { AiOutlineMinus,AiOutlinePlus } from 'react-icons/ai';
import './cart.css'
// import { CartProduct } from '../components/cartProduct/CartProduct';
import { NavLink, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export const Cart = () => {
    const { state:{cart},removeFromCart,updateCartQuantity} = useCart();
    const { isProductInWishlist, addToWishlist } = useWishlist();
    const { token } = useAuth();
    const navigate = useNavigate()

    const currPrice = cart.reduce((acc,curr)=> acc+curr.original_price*curr.qty,0)
    const discountPrice = cart.reduce((acc,curr)=> acc + ((curr.original_price-curr.price)* curr.qty),0).toFixed(2)
    const totalPrice = cart.reduce((acc,curr)=> acc+curr.price*curr.qty,0).toFixed(2)



    const removeFromCartHandler=(e,product)=>{
      e.preventDefault();
      removeFromCart(product)
    }

    const updateCartHandler=(e,product,actionType)=>{
      e.preventDefault();
      updateCartQuantity(product,actionType)
    }

    const addToWishlistHandler = (e,product) => {
      e.preventDefault();
      if (token) {
       isProductInWishlist(product) === -1 ? addToWishlist(product) : navigate("/wishlist");
     } else {
       navigate("/login");
       toast.error("Please login to continue adding to wishlist!");
     }
     };

  return (
    <div className='cart-container'>
      <h2 className='cart-count'>{ cart.length>0 ? `My Cart (${cart.length})` : "No Item In Cart..."}</h2>
        <div className='cart-items-container'>
          <div>
          {
          cart.map(product=>{
            // <CartProduct key={item.id} item={item}/>
            const { id,title,description,image,category,price,qty} = product
            return(
              <div className='cart-card-container' key={id}>
                <NavLink to={`/products/${id}`}>
                  <div className='cart-image'>
                    <img src={image} alt={title} className='cart-product-image'/>
                  </div>
                </NavLink>
                <div className='cart-item-details'> 
                  <h4>{title}</h4>
                  <p>
                    <b>Description:</b>
                    {description}</p>
                  <p>Category:{category}</p>
                  <p>Price:{price}</p>
                  <p className='cart-quantity'>Quantity:
                    <button className='update-cart-qty' 
                    disabled={qty===1}
                    onClick={(e)=> updateCartHandler(e,product,"decrement")}><AiOutlineMinus/></button>
                    <span>{qty}</span>
                    <button className='update-cart-qty' 
                    onClick={(e)=> updateCartHandler(e,product,"increment")}><AiOutlinePlus/></button>
                  </p>
                  <button className='remove-btn' 
                  onClick={(e)=> removeFromCartHandler(e,product)}>
                    Remove From Cart</button>
                <button 
                className='move-to-wishlist-btn' 
                onClick={(e)=> addToWishlistHandler(e,product)}>
                  {isProductInWishlist(product) === -1 ? "Add to Wishlist" : "Go to Wishlist"}
                </button>
                </div>
              </div>
            )
          })
        }
          </div>
          {
            cart.length >0 && (
              <div className='cart-price-card'>
              <h3>Price Details</h3>
              <hr/>
              <p>
                <span>Price</span>
                <span className='right'>${currPrice}</span>
              </p>
              <p>
                <span>Discount</span>
                <span className='right'>${discountPrice}</span>
              </p>
              <hr/>
              <p>
                <span>Total</span>
                <span className='right'>${totalPrice}</span>
              </p>
              <hr/>
              <p className='discount-msg'>You will save ${discountPrice} on this order!</p>
              <button className='checkout-btn' onClick={()=> navigate("/checkout")}>CheckOut</button>
          </div>
            )
          }
        </div>
    </div>
  )
}
