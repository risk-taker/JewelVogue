export default function CartReducer(state,{type,payload}){
    
    switch(type){
        case "GET_CART_ITEM":
            return{
                ...state,
                cart:payload
            }
        case "ADD_TO_CART":
            return {
                ...state,
                cart: payload,
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: payload,
            }
        case "MOVE_TO_WISHLIST":
            return {
                ...state,
                cart: payload,
            }
        case "UPDATE_CART_QUANTITY":
            return{
                ...state,
                cart:payload
            }

        default:
            return state;
    }
}