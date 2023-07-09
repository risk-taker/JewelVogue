import React from 'react'
import { NavLink } from 'react-router-dom'
import './home.css'
import { useProductData } from '../../context/ProductContext'

export const Home = () => {
  const { state:{ category },handleCheckBox} = useProductData();

  return (
    <div className='container'>
      <div>
      <img className='cover-image' src='./images/image.jpg' alt='coverJewelryImg'/>
      <div className='cover-card'>
        <h1 className='cover-heading'>
          Introducing The 
          <span>Lost Day Collection</span>
        </h1>
        <p className='cover-details'>Rings, Occasion Pieces, Pandora & more collections.</p>
        <NavLink to="/products" className='shop-btn'>Shop Now</NavLink>
      </div>
      </div>

      <div className="popular-categories">
          <h1 className='category-title'>Popular Categories</h1>
          <div className="popular-category-items">
          {
            category.map(({ _id,categoryName,image})=>(
              <NavLink 
              to="/products" 
              key={_id} 
              className="category-links"
              onClick={()=> handleCheckBox(categoryName)}>
                <img src={image} alt='Jewelry_Category' className='popular-category-images'/>
                <h3 className='product-details'>{categoryName}</h3>
              </NavLink>
              ))
          }
          </div>
        </div>

      <h1 className='featured-category-title'>Featured Collections</h1>
      <div className='category-container'>
        <div>
          <img className='category-image' src='./images/ring.jpg' alt="Jwelry_categories"/>
          <div className='category-item-details'>
          <h2>
            Jewelry & 
            <span className='category-span'>Charm Ring</span>
          </h2>
          <NavLink className="details-link" to="/products">See More</NavLink>
          </div>
        </div>
        <div>
          <img className='category-image' src='./images/necklace.jpg' alt="Jwelry_categories"/>
          <div className='category-item-details middle'>
          <h2 className='middle-card'>
            Necklace & 
            <span className='category-span'>Body Jewels</span>
          </h2>
          <NavLink className="details-link middle-card" to="/products">See More</NavLink>
          </div>
        </div>
        <div>
          <img className='category-image' src='./images/bracelet.jpg' alt="Jwelry_categories"/>
          <div className='category-item-details'>
          <h2>
            Just
            <span className='category-span'>Launched</span>
          </h2>
          <NavLink className="details-link" to="/products">See More</NavLink>
          </div>
        </div>

      </div>
        


    </div>
  )
}
