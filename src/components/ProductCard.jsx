import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { AiOutlineHeart,AiFillHeart } from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import "./productcard.css"
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product }) => {

    const { id,title,image,category,price,original_price } = product;

    const { isProductInCart,addToCart } = useCart();
    const { isProductInWishlist, addToWishlist, removeFromWishlist } =  useWishlist()

    const { token } = useAuth();
    const navigate = useNavigate();
   
    const addToCartHandler=(e,product)=>{
      e.preventDefault();
      if (token) {
        isProductInCart(product) === -1 ? addToCart(product) : navigate("/cart");
      } else {
        navigate("/login");
        toast.error("Please login to continue adding to cart!");
      }
    }
      
    const wishlistHandler = (e,product) => {
     e.preventDefault();
     if (token) {
      isProductInWishlist(product) === -1 ? addToWishlist(product) : removeFromWishlist(product);
    } else {
      navigate("/login");
      toast.error("Please login to continue adding to wishlist!");
    }
    };

  return (
    <div className='product'>
      {/* <img src={image} alt={title} className='product-image' onClick={()=> handleClick(id)}/> */}
      <img src={image} alt={title} className='product-image' onClick={()=> navigate(`/products/${id}`)}/>
        <div className='product-card-details'>
            <h4 className='product-title'>{title}</h4>
            <p className='product-category'>{category}</p>
            <b className='product-desc'>${price}</b>
            <span className='original-price'>${original_price}</span>
            <button 
                className='cart-btn' 
                onClick={(e)=> addToCartHandler(e,product)}>
                    {isProductInCart(product) === -1 ? "Add to Cart" : "Go to Cart"}
              </button>
            <button className='wishlist-btn' onClick={(e)=> wishlistHandler(e,product)}>
                {isProductInWishlist(product) === -1 ?
                  (
                  <AiOutlineHeart className='wishlist-icon'/>
                  ) : (
                    <AiFillHeart className="wishlist-icon full"/>
                  )}
            </button>
        </div>
    </div>
  )
}
