import axios from "axios"

export const getWishlist =async(encodedToken)=> 
    await axios.get("/api/user/wishlist",{ 
        headers: { authorization: encodedToken }
    })

export const addWishlistProduct = async(product,encodedToken)=> 
    await axios.post("/api/user/wishlist",
    { product },{ 
        headers: { authorization: encodedToken }
    })

export const removeWishlistProduct = async(productId,encodedToken)=> 
    await axios.delete(`/api/user/wishlist/${productId}`,{ 
        headers: { authorization: encodedToken }
    })