import axios from "axios";

export const getCart = async (encodedToken) =>
  await axios.get("/api/user/cart", {
    headers: { authorization: encodedToken },
  });

export const addCartProduct = async (product,encodedToken)=>
    await axios.post("/api/user/cart",
        { product },{
        headers: { authorization: encodedToken },
    });


export const removeCartProduct =async(productId,encodedToken)=>
     await axios.delete(`/api/user/cart/${productId}`,{
        headers: { authorization: encodedToken },
    });


export const updateCartProduct =async(productId,encodedToken,actionType)=>
    await axios.post(`/api/user/cart/${productId}`, { action: { type: actionType }},{
        headers: { authorization: encodedToken },
    });
