import React from 'react'
import { toast } from 'react-hot-toast';
import './checkout.css'
import { useCart } from '../../context/CartContext'
import { AddressCard } from '../address/component/addressCard/AddressCard';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const { state:{ cart },removeAllCartProduct} = useCart();
  const navigate = useNavigate();

  const discountPrice = cart.reduce((acc,curr)=> acc + ((curr.original_price-curr.price)* curr.qty),0).toFixed(2)
  const totalPrice = cart.reduce((acc,curr)=> acc+curr.original_price*curr.qty,0).toFixed(2);
  const total = (totalPrice - discountPrice).toFixed(2);

  const orderBtnHandler=()=>{
    if(cart?.length === 0){
      toast.error("Cart Is Empty")
      navigate("/products")
    }
    else{
      toast.success("Order placed successfully!");
      removeAllCartProduct();
      navigate("/");
    }
  }

  return (
    <div>
        <h2 className='checkout-top'>Checkout</h2>
        <div className='checkout-card'>
          <AddressCard/>
        <div className='checkout-summary'>
          <div className='checkout-details'>
            <hr/>
            <h3 className='checkout-head'>Order Summary</h3>
            <hr/>
            <div>
              <h4 className='left'>Item</h4>
              <h4 className='right'>Quantity</h4>
            </div>
            <div>
              {
                cart.map(({ id,title,qty })=>(
                  <div key={id}>
                    <h4 className='left'>{title}</h4>
                    <h4 className='right'>{qty}</h4>
                  </div>
                ))
              }
            </div>
            <div>
              <h4>Price Details</h4>
              <hr/>

              <div>
                <h4 className='left'>Total Price</h4>
                <h4 className='right'>${totalPrice}</h4>
              </div>

              <div>
                <h4 className='left'>Total Discount</h4>
                <h4 className='right'>${discountPrice}</h4>
              </div>

              <div>
                <hr/>
                <h4 className='left'>Total Amount</h4>
                <h4 className='right'>${total}</h4>
              </div>

            </div>
            <hr/>
            <p className='discount-msg'>You will save ${discountPrice} on this order!</p>
            <button className='order-btn' onClick={()=> orderBtnHandler()}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}
