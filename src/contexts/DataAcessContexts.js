// Importações obrigatórias
import React, { createContext, useReducer } from "react";
const DataAcessContexts = createContext({});

const initialState = {
  loading: false,
  error: "",
  message: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return {
        loading: true,
        error: "",
        message: "Fetch succeed",
      };
    }
    case "FETCH_FAILED": {
      return {
        loading: false,
        error: "Alguma coisa deu errado...",
        message: "Fetch failed",
      };
    }
    case "FETCH_COMPLETED": {
      return {
        loading: false,
        error: "Alguma coisa deu errado...",
        message: "Fetch completed",
      };
    }
    default:
      return state;
  }
}
export const DataAcessProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataAcessContexts.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </DataAcessContexts.Provider>
  );
};

export default DataAcessContexts;
