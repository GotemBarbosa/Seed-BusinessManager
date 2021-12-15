import React, { useEffect } from "react";
import { Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./Stack.routes";

const Routes = () => (
  <NavigationContainer>
    <StackRoutes />
  </NavigationContainer>
);

export default Routes;
