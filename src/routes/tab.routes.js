import React from "react";
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "../styles/colors";

import UserPage from "../pages/UserPage";
import Products from "../pages/Products";
import Dashboard from "../pages/Dashboard";
import Costs from "../pages/Costs";
import Settings from "../pages/Settings";
import { AntDesign, Ionicons, Feather, Foundation } from "@expo/vector-icons";

const AppTab = createBottomTabNavigator();
const icons = ["user", "box", "home-outline", "dollar", "setting"];

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 63,
        height: 63,
        borderRadius: 35,
        backgroundColor: colors.ice,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
const AuthRoutes = () => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-50}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppTab.Navigator
            initialRouteName="Inicial"
            backBehavior="initialRoute"
            tabBarOptions={{
              tabBarLabel: () => {
                return null;
              },
              activeTintColor: colors.white,
              inactiveTintColor: colors.black,
              labelPosition: "below-icon",
              style: {
                position: "relative",
                paddingVertical: 20,
                height: 55,
                paddingBottom: 6,
                backgroundColor: colors.primaryColor,
                opacity: 0.85,
                borderRadius: 3,
              },
            }}
          >
            <AppTab.Screen
              name="Usuário"
              component={UserPage}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <AntDesign
                    name={icons[0]}
                    size={size}
                    color={color}
                    style={{ paddingBottom: 10 }}
                  />
                ),
              }}
            />

            <AppTab.Screen
              name="Produtos"
              component={Products}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Feather
                    name={icons[1]}
                    size={size}
                    color={color}
                    style={{ paddingBottom: 10 }}
                  />
                ),
              }}
            />

            <AppTab.Screen
              name="Inicial"
              initialRoute
              backBehavior="initialRoute"
              component={Dashboard}
              options={{
                tabBarLabel: () => {
                  return null;
                },

                tabBarIcon: ({ size, color }) => (
                  <Ionicons name={icons[2]} size={size} color={color} />
                ),
                tabBarButton: (props) => <CustomTabBarButton {...props} />,
              }}
            />
            <AppTab.Screen
              name="Despesas"
              component={Costs}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <Foundation
                    name={icons[3]}
                    size={size}
                    color={color}
                    style={{ paddingBottom: 10 }}
                  />
                ),
              }}
            />
            <AppTab.Screen
              name="Configurações"
              component={Settings}
              options={{
                tabBarIcon: ({ size, color }) => (
                  <AntDesign
                    name={icons[4]}
                    size={size}
                    color={color}
                    style={{ paddingBottom: 10 }}
                  />
                ),
              }}
            />
          </AppTab.Navigator>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default AuthRoutes;
