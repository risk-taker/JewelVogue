import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducer/CartReducer";
import { useAuth } from "./AuthContext";
import { getCart, addCartProduct, removeCartProduct, updateCartProduct } from "../apiCalls/CartApis";
import { toast } from 'react-hot-toast'

export const CartContext = createContext();

const initialState = {
    cart:[],
}
export function CartContextProvider({ children }){
    const { token } = useAuth();
    const [ state, dispatch ] = useReducer(cartReducer,initialState);
    
    const fetchCart =async()=>{
        try{
            const res = await getCart(token);
            const { status, data:{ cart } } = res 
            if(status===200){
                dispatch({ type:"GET_CART_ITEM", payload:cart})
            }
        }
        catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        fetchCart()
    },[]);

    const isProductInCart = (product) => state?.cart?.findIndex(({ _id }) => _id === product?._id);

    const addToCart = async(product)=>{
        try{
            const res = await addCartProduct(product,token);
            console.log(res);
            const { status, data:{ cart } } = res;
            if(status === 201){
                dispatch({ type:"ADD_TO_CART",payload:cart })
                toast.success("Added to cart successfully!");
            }    
        }
        catch(e){
            console.error(e)
            toast.error("Unable to add to cart!");
        }
    }
      

    const removeFromCart =async(product,flag)=>{
        try{
            const res = await removeCartProduct(product._id,token);
            console.log(res);
            const { status, data:{ cart } } = res;
            if(status === 200){
                dispatch({ type:"REMOVE_FROM_CART",payload:cart })
                !flag && toast.success("Removed from cart successfully!");
            }    
        }
        catch(e){
            console.error(e)
            !flag && toast.error("Unable to remove from cart");
        }
    }

    const updateCartQuantity =async(product,actionType)=>{
        try{
            const res = await updateCartProduct(product._id,token,actionType);
            const { status, data:{ cart } } = res;
            console.log(res);
            if(status === 200){
                dispatch({ type:"UPDATE_CART_QUANTITY",payload:cart })
            }    
        }
        catch(e){
            console.error(e)
        }
    }

    const removeAllCartProduct =()=>{
        try{
            for(let i=0; i<state?.cart.length; i++){
                removeFromCart(state.cart[i],true);
            }
        }
        catch(e){
            console.error(e)
        }
    }

    return(
        <CartContext.Provider value={{ 
            state,
            dispatch,
            isProductInCart,
            removeAllCartProduct,
            addToCart,
            removeFromCart,
            updateCartQuantity }}>

            { children }
        </CartContext.Provider>
    )
}

export const useCart =()=> useContext(CartContext);