import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducerFn from "../reducer/ProductReducer";
import { v4 as uuid } from "uuid";

export const ProductContext = createContext();

const testAddress = [
    {
        id: uuid(),
        userName: "Adarsh Balika",
        street: "107, Vakharia Ind Estate, Ram Mandir, Goregaon (west)",
        city: " Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: 400003,
        mobileNumber: 987654321,
        isEdit:false,
    },
]

export function ProductContextProvier({ children }){
    const [ loading, setLoading ] = useState(false);

    const initialState ={
        products:[],
        category:[],
        inputSearch:"",
        rangeInput:0,
        checkBox:[],
        rating:null,
        sort:null,
        address:testAddress,
    } 
    const [ state, dispatch ] = useReducer(reducerFn,initialState);

    const getData = async()=>{
        setLoading(true)
        try{
            const res = await fetch("/api/products");
            const data = await res.json();
            setLoading(false);
            dispatch({ type: "GET_DATA", payload: data.products})
        }
        catch(e){
            setLoading(false);
            console.error(e)
        }
    }

    const getCategory = async()=>{
        try{
            const res = await fetch("/api/categories");
            const data = await res.json();
            dispatch({ type: "GET_CATEGORY", payload: data.categories})
        }
        catch(e){
            console.error(e)
        }
    }
    
    useEffect(()=> {
        getData();
    },[])

    useEffect(()=> {
        getCategory();
    },[])
    
    
 

    const handleRangeInput=(value)=>{
        dispatch({ type:"RANGE", payload:value})
    }
    
    const handleCheckBox=(category)=>{
        dispatch({ type:"CHECKBOX_ITEM", payload:category})
    }

    const handleStar=(star)=>{
        dispatch({ type:"STAR_RATING", payload:star})
    }

    const handleSort =(sortType)=>{
        dispatch({ type:"SORT",payload:sortType})
    }

    const clearFilterHandler = ()=>{
        dispatch({ type:"CLEAR_FILTER" })
    }

    const searchData = state.inputSearch.length > 0 ? state.products.filter(({ title })=> title.toLowerCase().includes(state.inputSearch.toLowerCase())) : state.products;

    const rangeFilter = searchData?.filter(({ price })=> price >= state.rangeInput);
  
    const checkBoxFilter = state.checkBox.length > 0 ? rangeFilter.filter(({ category })=> state.checkBox.some(item=> category.includes(item))) : rangeFilter;
    
    const starRating = state.rating ? checkBoxFilter.filter(({ stars })=> state.rating === "4_Stars" ? stars >= 4 : state.rating === "3_Stars" ? stars >=3 : state.rating === "2_Stars" ? stars >=2 : stars>=1) : checkBoxFilter

    const sortedData = state.sort ? [...starRating].sort((a,b)=> state.sort === "LTH" ? a.price - b.price : b.price - a.price) : starRating

    return(
        <ProductContext.Provider value={{ state, 
            dispatch,
            loading,
            searchData,
            checkBoxFilter,
            handleCheckBox,
            handleStar,
            handleSort,
            handleRangeInput,
            clearFilterHandler,
            sortedData}}>
                { children }
        </ProductContext.Provider>
    )
}

export const useProductData = () =>{ 
    return useContext(ProductContext)
}