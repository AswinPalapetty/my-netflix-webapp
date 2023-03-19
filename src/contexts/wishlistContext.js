import { createContext,useState } from "react";

export const wishlistContext = createContext(null);

export default function Wishlist(props){
    const [wishlist,setWishlist] = useState(false);

    return (
        <wishlistContext.Provider value={{wishlist,setWishlist}}>
            {props.children}
        </wishlistContext.Provider>
    )
}