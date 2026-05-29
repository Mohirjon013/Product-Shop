import { createContext, useReducer } from "react";


export const StateContext = createContext(null)
export const DispatchContext = createContext(null)

const initailState = {
    categoryId: null,
    isLoading:true,
    searchValue:''
}

function reducer(state, action) {
    switch(action.type) {
        case 'SET_CATEGORY':
            return {...state, categoryId:action.payload}
        case 'SET_LOADING':
            return {...state, isLoading:action.payload}
        case 'SET_SEARCH':
            return {...state, searchValue:action.payload}
        default:
            return state
    }
}


export const ProductContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState)

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}