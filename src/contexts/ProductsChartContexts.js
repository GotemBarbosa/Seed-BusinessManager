// Importações obrigatórias
import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useReducer,
} from "react";

// Bibliotecas 
import Axios from "axios";

// Contextos
import ImportantDataContext from "./ImportantDataContexts";

const ProductsChartContext = createContext({});

export const ProductsChartProvider = (props) => {
  const { data } = useContext(ImportantDataContext);

  const [values, setValues] = useState([]);

  const [state, dispatchPr] = useReducer(reducer, values);

  useEffect(() => {
    Axios.get(data.IPV4 + `/productChart/get?userId=${data.userId}`).then(
      (response) => {
        setValues(response.data);
      }
    );
  }, [data.userId]);

  function reducer(state, action) {
    if (action.type === "changeChart") {
      Axios.get(data.IPV4 + `/productChart/get?userId=${data.userId}`).then(
        (response) => {
          setValues(response.data);
        }
      );
      return;
    }
  }

  return (
    <ProductsChartContext.Provider
      value={{
        state: {
          data: values,
        },
        dispatchPr,
      }}
    >
      {props.children}
    </ProductsChartContext.Provider>
  );
};

export default ProductsChartContext;
