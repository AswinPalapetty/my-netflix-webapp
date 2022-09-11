import { createContext,useState } from "react";

export const searchContext = createContext(null)

export default function Search(props){
    const [searchBox,setSearchBox] = useState(false);
    const [query, setQuery] = useState('');
    const [notFound, setNotFound] = useState(false)

    return (
        <searchContext.Provider value={{searchBox,setSearchBox,query,setQuery,notFound,setNotFound}}>
            {props.children}
        </searchContext.Provider>
    )
}