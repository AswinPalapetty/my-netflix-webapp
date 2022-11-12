import { createContext,useState } from "react";

export const searchContext = createContext(null)

export default function Search(props){
    const [searchBox,setSearchBox] = useState(false);
    const [query, setQuery] = useState('');

    return (
        <searchContext.Provider value={{searchBox,setSearchBox,query,setQuery}}>
            {props.children}
        </searchContext.Provider>
    )
}