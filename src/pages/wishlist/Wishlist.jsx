import React from 'react'
import { useWishlist } from '../../context/WishlistContext'
import { ProductCard } from '../../components/ProductCard';
import './wishlist.css'


export const Wishlist = () => {
  const { state:{ wishlist } } = useWishlist();

  return (
    <div className='wishlist-container'>
      <h2 className='wishlist-count'>
        { wishlist.length>0 ? `My Wishlist (${wishlist.length})` : "No Item In Wishlist..."}
      </h2>

      <div >
            <div className="wishlist-card-container">
              {
                wishlist.map(product=>
                        <ProductCard key={product.id} product={product}/>
                    )
              }
            </div>
        </div>

    </div>
  )
}
