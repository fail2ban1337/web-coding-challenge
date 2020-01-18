import React, { useContext } from "react";
import { useReducer } from "react";
import useCombinedReducers from "use-combined-reducers";
import { alertReducer, alertInitState } from "../Reducers/alertReducer";

import {
  authReducer,
  errorsInitState,
  RegisterReducer,
  authInitState
} from "../Reducers/authReducer";
import { shopInitState, shopReducer } from "../Reducers/shopReducer";
export const appStore = React.createContext();

export const UserProvider = ({ children }) => {
  const globalReducers = useCombinedReducers({
    alert: useReducer(alertReducer, alertInitState),
    auth: useReducer(authReducer, authInitState),
    registerRdc: useReducer(RegisterReducer, errorsInitState),
    shopsRdc: useReducer(shopReducer, shopInitState)
  });
  return (
    <appStore.Provider value={globalReducers}>{children}</appStore.Provider>
  );
};

export const useUserStore = () => useContext(appStore);
