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

const UserDataContexts = createContext({});

export const UserDataProvider = (props) => {
  const [userData, setUserData] = useState();

  function reducer(state, action) {
    switch (action.type) {
      case "updateData": {
        const name = action.payload.name;
        const companyName = action.payload.companyName;

        Axios.post(data.IPV4 + `/userData/update`, {
          name: name,
          companyName: companyName,
          userAdmin: data.userId,
        })
          .then((r) => {})
          .catch((re) => {
            console.log("Erro: " + re);
          });
        console.log("UserData Updated");
        return state;
      }
      default:
        return state;
    }
  }
  const { data } = useContext(ImportantDataContext);

  useEffect(() => {
    Axios.get(data.IPV4 + `/userData/get?userId=${data.userId}`).then(
      (response) => {
        setUserData(response.data[0]);
      }
    );
  }, [data.userId]);

  const [state, dispatchUD] = useReducer(reducer, userData);
  return (
    <UserDataContexts.Provider
      value={{
        state: {
          userData,
        },
        dispatchUD,
      }}
    >
      {props.children}
    </UserDataContexts.Provider>
  );
};
export default UserDataContexts;
