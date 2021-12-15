// Importações obrigatórias
import React, { useState, createContext, useReducer } from "react";

const ImportantDataContext = createContext({});

export const ImportantDataProvider = (props) => {
  const IPV4 = "";

  const [userId, setUserId] = useState(0);

  const [state, dispatch] = useReducer(reducer, userId);

  function reducer(state, action) {
    if (action.type === "addUser") {
      setUserId(action.payload.userId);
    }
  }

  return (
    <ImportantDataContext.Provider
      value={{
        data: {
          IPV4,
          userId,
        },
        dispatch,
      }}
    >
      {props.children}
    </ImportantDataContext.Provider>
  );
};

export default ImportantDataContext;
