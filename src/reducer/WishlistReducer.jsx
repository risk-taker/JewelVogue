export default function WishlistReducer( state, { type,payload }){
    switch(type){
        case "GET_WISHLIST":
            return {
                ...state,
                wishlist:payload
            }

        case "ADD_TO_WISHLIST":
            return {
                ...state,
                wishlist:payload
            }

        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist:payload
            }

        default:
            return state;
    }
}
