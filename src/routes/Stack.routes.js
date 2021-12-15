import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//import da páginas
import Login from "../pages/Login";
import Register from "../pages/Register";
import colors from "../styles/colors";
import AddProducts from "../pages/pageFunctions/AddProducts";
import AddEmployees from "../pages/pageFunctions/AddEmployees";
import AddRawMaterials from "../pages/pageFunctions/AddRawMaterials";
import AddOthersCosts from "../pages/pageFunctions/AddOthersCosts";
import UpdateProducts from "../pages/pageFunctions/UpdateProducts";
import UpdateEmployees from "../pages/pageFunctions/UpdateEmployees";
import UpdateRawMaterials from "../pages/pageFunctions/UpdateRawMaterials";
import UpdateLocalCosts from "../pages/pageFunctions/UpdateLocalCosts";
import UpdateOtherCosts from "../pages/pageFunctions/UptadeOtherCosts";
import InitialLoading from "../pages/InitialLoading";
import Confirmation from "../pages/Confirmation";

import AuthRoutes from "./tab.routes";

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen name="InitialLoading" component={InitialLoading} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="AddEmployees" component={AddEmployees} />
      <Stack.Screen name="AddRawMaterials" component={AddRawMaterials} />
      <Stack.Screen name="AddOthersCosts" component={AddOthersCosts} />

      <Stack.Screen name="UpdateProducts" component={UpdateProducts} />
      <Stack.Screen name="UpdateEmployees" component={UpdateEmployees} />
      <Stack.Screen name="UpdateRawMaterials" component={UpdateRawMaterials} />
      <Stack.Screen name="UpdateLocalCosts" component={UpdateLocalCosts} />
      <Stack.Screen name="UpdateOtherCosts" component={UpdateOtherCosts} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
    </Stack.Navigator>
  );
}
