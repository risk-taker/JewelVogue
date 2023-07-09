import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductData } from '../../context/ProductContext';
import { AiFillStar } from 'react-icons/ai';
import { BsTagFill } from 'react-icons/bs';
import './singlepage.css'
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export const SingleProduct = () => {
  const [ productItem, setProductItem ] = useState();
  const { productId } = useParams();
  const { state:{products} } = useProductData();
  const { isProductInCart,addToCart } = useCart();
  const { isProductInWishlist, addToWishlist } =  useWishlist();

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
      
    const addToWishlistHandler = (e,product) => {
     e.preventDefault();
     if (token) {
      isProductInWishlist(product) === -1 ? addToWishlist(product) : navigate("/wishlist");
    } else {
      navigate("/login");
      toast.error("Please login to continue adding to wishlist!");
    }
    };

  useEffect(()=> {
    setProductItem(products.find(item=> item.id === productId))
  },[products,productId])


  return (
    <div>
      {
        productItem && (
          <div className='single-item-container'>
            <div className='single-item-image'>
              <img src={`/${productItem.image}`} alt={productItem.title} className='prod-image'/>
            </div>
            <div className='single-item-details'>
              <h3>{productItem.title}</h3>
              <p className='single-item-category'>Category: {productItem.category}</p>
              <p className='item-price'> ${productItem.price} <span className='original-price'>$ {productItem.original_price}</span></p>
              <hr/>
              <p>Description: {productItem.description}</p>
              <p>Ratings: {productItem.stars} <span className='star-span'><AiFillStar/></span></p>
              <p className='tag-details'> <span className='delivery-tag'><BsTagFill/></span> Fastest Delivery</p>
              <p className='tag-details'> <span className='delivery-tag'><BsTagFill/></span> Inclusive Of All Taxes</p>
              <p className='tag-details'> <span className='delivery-tag'><BsTagFill/></span> Cash On Delivery Available</p>
              <button 
                className='single-cart-btn' 
                onClick={(e)=> addToCartHandler(e,productItem)}>
                    {isProductInCart(productItem) === -1 ? "Add to Cart" : "Go to Cart"}
              </button>
              <button 
                className='single-wishlist-btn' 
                onClick={(e)=> addToWishlistHandler(e,productItem)}>
                  {isProductInWishlist(productItem) === -1 ? "Add to Wishlist" : "Go to Wishlist"}
              </button>
            </div>
          </div>
        )
      }
      
    </div>
  )
}
