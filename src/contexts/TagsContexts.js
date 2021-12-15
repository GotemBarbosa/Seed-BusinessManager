// Importações obrigatórias
import React, { createContext, useReducer } from "react";

const TagsContexts = createContext({});
const initialState = {
  id: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SendId": {
      const id = action.payload.id;
      return {
        id: id,
      };
    }
    default:
      return state;
  }
}

export const TagsProvider = (props) => {
  const [state, dispatchTg] = useReducer(reducer, initialState);

  return (
    <TagsContexts.Provider value={{ state, dispatchTg }}>
      {props.children}
    </TagsContexts.Provider>
  );
};

export default TagsContexts;
