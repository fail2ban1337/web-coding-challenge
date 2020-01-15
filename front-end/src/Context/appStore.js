import React, { useContext } from "react";
import { useReducer } from "react";
import useCombinedReducers from "use-combined-reducers";
import {
    authReducer,
    authInitState,
} from "../Reducers/authReducer";
export const appStore = React.createContext();



export const UserProvider = ({ children }) => {
    const globalReducers = useCombinedReducers({
        auth: useReducer(authReducer, authInitState),
    });
    return (
        <appStore.Provider value={globalReducers}>{children}</appStore.Provider>
    );
};

export const useUserStore = () => useContext(appStore);