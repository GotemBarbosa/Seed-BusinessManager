// Importações obrigatórias
import React, {
  useState,
  createContext,
  useEffect,
  useReducer,
  useContext,
} from "react";

// Bibliotecas
import Axios from "axios";

// Contextos
import ImportantDataContext from "./ImportantDataContexts";

const MainChartContext = createContext({});

export const MainChartProvider = (props) => {
  const { data } = useContext(ImportantDataContext);

  const [fullData, setFullData] = useState();
  const [labels, setLabels] = useState([]);
  const [price, setPrice] = useState();

  const [state, dispatchM] = useReducer(reducer, fullData);

  useEffect(() => {
    Axios.get(data.IPV4 + `/mainchart/get?userId=${data.userId}`).then(
      (response) => {
        setFullData(response.data);
        setLabels(response.data.labels);
        setPrice(response.data.data);
      }
    );
  }, [data.userId]);

  function reducer(state, action) {
    if (action.type === "changeChart") {
      Axios.get(data.IPV4 + `/mainchart/get?userId=${data.userId}`).then(
        (response) => {
          setFullData(response.data);
          setLabels(response.data.labels);
          setPrice(response.data.data);
        }
      );
      return;
    }
  }

  return (
    <MainChartContext.Provider
      value={{
        state: {
          labels: labels,
          datasets: [
            {
              data: price,
            },
          ],
        },
        dispatchM,
      }}
    >
      {props.children}
    </MainChartContext.Provider>
  );
};

export default MainChartContext;
