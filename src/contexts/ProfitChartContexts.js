// Importações obrigatórias
import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useReducer,
} from "react";

// Componentes
import Axios from "axios";

//Contextos
import ImportantDataContext from "./ImportantDataContexts";

const ProfitChartContext = createContext({});

export const ProfitChartProvider = (props) => {
  const { data } = useContext(ImportantDataContext);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [fullData, setFullData] = useState();

  const [state, dispatchP] = useReducer(reducer, fullData);

  useEffect(() => {
    Axios.get(data.IPV4 + `/profitChart/get?userId=${data.userId}`).then(
      (response) => {
        setLabels(response.data.labels);
        setValues(response.data.data);
        setFullData(response.data);
      }
    );
  }, [data.userId]);

  function reducer(state, action) {
    if (action.type === "changeChart") {
      Axios.get(data.IPV4 + `/profitChart/get?userId=${data.userId}`).then(
        (response) => {
          setFullData(response.data);
          setLabels(response.data.labels);
          setValues(response.data.data);
        }
      );
      return;
    }
  }

  return (
    <ProfitChartContext.Provider
      value={{
        state: {
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 0.3) => `rgba(11, 230, 9, ${opacity})`,
            },
          ],
        },
        dispatchP,
      }}
    >
      {props.children}
    </ProfitChartContext.Provider>
  );
};

export default ProfitChartContext;
