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

const ActivitesContexts = createContext({});
export const ActivitiesProvider = (props) => {
  const [activititiesData, setActivitiesData] = useState();

  function reducer(state, action) {
    switch (action.type) {
      case "updateData": {
        Axios.get(data.IPV4 + `/activities/get?userId=${data.userId}`).then(
          (response) => {
            setActivitiesData(response.data);
          }
        );
        console.log("Activities Updated");
        return state;
      }
      case "deleteData": {
        const id = action.payload.id;
        const itemType = action.payload.type;
        Axios.delete(
          data.IPV4 +
            `/activities/delete?itemId=${id}&itemType=${itemType}&userId=${data.userId}`
        ).then(() => {});
      }
      default:
        return state;
    }
  }

  const { data } = useContext(ImportantDataContext);

  useEffect(() => {
    Axios.get(data.IPV4 + `/activities/get?userId=${data.userId}`).then(
      (response) => {
        setActivitiesData(response.data);
      }
    );
  }, [data.userId]);

  const [state, dispatchA] = useReducer(reducer, activititiesData);
  return (
    <ActivitesContexts.Provider
      value={{
        state: {
          activititiesData,
        },
        dispatchA,
      }}
    >
      {props.children}
    </ActivitesContexts.Provider>
  );
};
export default ActivitesContexts;
