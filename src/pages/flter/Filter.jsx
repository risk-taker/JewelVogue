import React from 'react'
import "./filter.css"
import { useProductData } from '../../context/ProductContext'

export const Filter = () => {
    const { state:{checkBox,rangeInput,sort,rating},clearFilterHandler,handleCheckBox,handleStar,handleSort,handleRangeInput } = useProductData();
  return (
    <div className='filters-container'>
        <aside className='aside-filters'>
            <div>
                <h4 className='aside-filter-heading'>Filter</h4>
                <button className='aside-filter-reset' onClick={clearFilterHandler}>Clear</button>
            </div>
            <div>
                <h4>Price</h4>
                <p className='filter-range'>
                    <span>0</span>
                    <span>500</span>
                    <span>750</span>
                </p>
                <input 
                type="range"
                min="0" 
                max="749" 
                className='slider-input'
                value={rangeInput}
                onChange={(e)=> handleRangeInput(e.target.value)}/>
            </div>
            <div>
                <h4>Category</h4>
                <label className='label-input'>
                    <input type='checkbox'
                    checked={checkBox?.includes('Necklace')}
                    onChange={()=>handleCheckBox('Necklace')}/>
                        Necklaces
                </label>
                <label className='label-input'>
                    <input type='checkbox'
                    checked={checkBox?.includes('Ring')}
                    onChange={()=>handleCheckBox('Ring')}/>
                        Rings
                </label>
                <label className='label-input'>
                    <input type='checkbox' 
                    checked={checkBox?.includes('Earrings')}
                    onChange={()=>handleCheckBox('Earrings')}/>
                        Earrings
                </label>
                <label className='label-input'>
                    <input type='checkbox' 
                    checked={checkBox?.includes('Bracelet')}
                    onChange={()=>handleCheckBox('Bracelet')}/>
                        Bracelets
                </label>
            </div>
            <div>
                <h4>Rating</h4>
                <label className='label-input'>
                    <input 
                    type='radio' 
                    name="radio-filter"
                    checked={rating?.includes("4_Stars")} 
                    onChange={()=>handleStar("4_Stars")}/>
                        4 Star and above
                </label>
                <label className='label-input'>
                    <input 
                    type='radio' 
                    name="radio-filter"
                    checked={rating?.includes("3_Stars")} 
                    onChange={()=>handleStar("3_Stars")}/>
                        3 Star and above
                </label>
                <label className='label-input'>
                    <input 
                    type='radio' 
                    name="radio-filter"
                    checked={rating?.includes("2_Stars")} 
                    onChange={()=>handleStar("2_Stars")}/>
                        2 Star and above
                </label>
                <label className='label-input'>
                    <input 
                    type='radio' 
                    name="radio-filter"
                    checked={rating?.includes("1_Star")} 
                    onChange={()=>handleStar("1_Star")}/>
                        1 Star and above
                </label>
            </div>
            <div>
                <h4>Sort by</h4>
                <label className='label-input'>
                    <input 
                    type='radio' 
                    name='price-filter' 
                    checked={sort?.includes("LTH")}
                    onChange={()=>handleSort("LTH")}/>
                        Price - Low to High
                </label>
                <label className='label-input'>
                    <input 
                    type='radio'
                    name='price-filter'
                    checked={sort?.includes("HTL")}
                    onChange={()=>handleSort("HTL")}
                      />
                        Price - High to Low
                </label>
            </div>
        </aside>
    </div>
  )
}
