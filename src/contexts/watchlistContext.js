import { createContext,useState } from "react";

export const watchlistContext = createContext(null);

export default function Watchlist(props){
    const [watchlist,setWatchlist] = useState(false);

    return (
        <watchlistContext.Provider value={{watchlist,setWatchlist}}>
            {props.children}
        </watchlistContext.Provider>
    )
}