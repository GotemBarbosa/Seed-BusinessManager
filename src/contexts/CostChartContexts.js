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

// Componentes
import ImportantDataContext from "./ImportantDataContexts";

const CostChartContexts = createContext({});

export const CostChartProvider = (props) => {
  const { data } = useContext(ImportantDataContext);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [fullData, setFullData] = useState();

  const [state, dispatchC] = useReducer(reducer, fullData);

  useEffect(() => {
    Axios.get(data.IPV4 + `/costchart/get?userId=${data.userId}`).then(
      (response) => {
        setLabels(response.data.labels);
        setValues(response.data.data);
        setFullData(response.data);
      }
    );
  }, [data.userId]);

  function reducer(state, action) {
    if (action.type === "changeChart") {
      Axios.get(data.IPV4 + `/costchart/get?userId=${data.userId}`).then(
        (response) => {
          setLabels(response.data.labels);
          setValues(response.data.data);
          setFullData(response.data);
        }
      );
      return;
    }
  }

  return (
    <CostChartContexts.Provider
      value={{
        state: {
          labels: labels,
          datasets: [
            {
              data: values,
              color: (opacity = 0.3) => `rgba(227, 22, 11, ${opacity})`,
            },
          ],
        },
        dispatchC,
      }}
    >
      {props.children}
    </CostChartContexts.Provider>
  );
};

export default CostChartContexts;
