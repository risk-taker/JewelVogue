import React from 'react'
import { useProductData } from '../../context/ProductContext';
import { Filter } from '../flter/Filter';
import { ProductCard } from '../../components/ProductCard';
import { Triangle } from 'react-loader-spinner';
import "./products.css"

export const ProductListing = () => {
    const { loading,sortedData } = useProductData();
   
  return (
    <div className='product-container'>
        <Filter/>
        {
          loading ? (
            <div className='loader'>
              <Triangle
              height="80"
              width="80"
              color="#232f3e"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
            </div>
          ) : (
            <div>
              {sortedData.length === 0 && <h2 className='product-head'>No Products Found...</h2>}
              {sortedData.length !== 0 && <h2 className='product-head'>Showing All Products ({ sortedData?.length})</h2>}
            <div className="product-card-container">
              {
                sortedData.map(product=>
                        <ProductCard key={product.id} product={product}/>
                    )
              }
            </div>
        </div>
          )
        }
    </div>
  )
}
