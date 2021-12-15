// Importações obrigatórias
import React, { useState, createContext, useEffect, useContext } from "react";

// Bibliotecas
import Axios from "axios";

// Contextos
import ImportantDataContext from "./ImportantDataContexts";

const TagsColorsContexts = createContext({});

export const TagsColorsProvider = (props) => {
  const { data } = useContext(ImportantDataContext);

  const [tagsColors, setTagsColors] = useState([]);

  useEffect(() => {
    Axios.get(data.IPV4 + "/tagscolors/get").then((response) => {
      setTagsColors(response.data);
    });
  }, []);

  return (
    <TagsColorsContexts.Provider
      value={{
        state: {
          tagsColors,
        },
      }}
    >
      {props.children}
    </TagsColorsContexts.Provider>
  );
};

export default TagsColorsContexts;
