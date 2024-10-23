import { createContext, useReducer } from "react";
import { reducer, initialState } from "./Reducer/reducer";

export const ContextGlobal = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <ContextGlobal.Provider value={{ state, dispatch }}>
        {children}
      </ContextGlobal.Provider>
    </div>
  );
};

export default ContextProvider;
