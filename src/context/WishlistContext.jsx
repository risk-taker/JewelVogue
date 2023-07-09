import { createContext, useContext, useEffect, useReducer } from "react";
import { addWishlistProduct, getWishlist, removeWishlistProduct } from "../apiCalls/WishlistApis";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";
import wishlistReducer from '../reducer/WishlistReducer';

export const WishlistContext = createContext();

const initialState ={
    wishlist:[],
}

export function WishlistContextProvider({ children }){

    const { token } = useAuth();
    const [ state, dispatch ] = useReducer(wishlistReducer,initialState);
    
    const fetchWishlist = async ()=>{
        try{
            const res = await getWishlist(token);
            const { status, data:{ wishlist }} = res;
            if(status === 200){
                dispatch({ type: "GET_DATA", payload:wishlist})
            }
        }
        catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        fetchWishlist();
    },[])

    const addToWishlist = async (product)=>{
        try{
            const res = await addWishlistProduct(product,token);
            const { status, data:{ wishlist }} = res;
            if(status === 201){
                toast.success("Added to wishlist")
                dispatch({ type: "ADD_TO_WISHLIST", payload:wishlist})
            }
        }
        catch(e){
            toast.error("Unable to add to wishlist")
            console.error(e)
        }
    }

    const removeFromWishlist = async (product)=>{
        try{
            const res = await removeWishlistProduct(product._id,token);
            const { status, data:{ wishlist }} = res;
            if(status === 200){
                toast.success("Removed from wishlish")
                dispatch({ type: "REMOVE_FROM_WISHLIST", payload:wishlist})
            }
        }
        catch(e){
            toast.error("Unable to remove")
            console.error(e)
        }
    }

    const isProductInWishlist = (product) => state?.wishlist?.findIndex(({ _id }) => _id === product?._id);
    return(
        <WishlistContext.Provider value={{
            state,
            fetchWishlist,
            addToWishlist,
            removeFromWishlist,
            isProductInWishlist
        }}>
            { children }
        </WishlistContext.Provider>
    )
}

export const useWishlist =()=> useContext(WishlistContext);