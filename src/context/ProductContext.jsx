import { createContext, useState } from "react";

export const Context = createContext('')

export const ProductContext = ({children}) => {
    const [categoryId, setCategoryId] = useState(null)

    return (
        <Context.Provider value={{categoryId, setCategoryId}}>
            {children}
        </Context.Provider>
    )
}