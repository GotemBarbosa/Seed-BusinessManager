// Importações obrigatórias
import React, {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";

// Bibliotecas
import Axios from "axios";

// Contextos
import ImportantDataContext from "./ImportantDataContexts";
const StoreDataContexts = createContext({});

export const StoreDataProvider = (props) => {
  const [storeData, setStoreData] = useState();

  function reducer(state, action) {
    switch (action.type) {
      case "updateData": {
        Axios.get(data.IPV4 + `/storedata/get?userId=${data.userId}`).then(
          (response) => {
            setStoreData(response.data);
          }
        );
        console.log("StoreData Updated");
        return state;
      }
      default:
        return state;
    }
  }

  const { data } = useContext(ImportantDataContext);

  useEffect(() => {
    Axios.get(data.IPV4 + `/storedata/get?userId=${data.userId}`).then(
      (response) => {
        setStoreData(response.data);
      }
    );
  }, [data.userId]);

  const [state, dispatchSD] = useReducer(reducer, storeData);
  return (
    <StoreDataContexts.Provider
      value={{
        state: {
          storeData,
        },
        dispatchSD,
      }}
    >
      {props.children}
    </StoreDataContexts.Provider>
  );
};
export default StoreDataContexts;
