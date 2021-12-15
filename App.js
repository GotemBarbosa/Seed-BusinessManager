import { StatusBar } from "expo-status-bar";
//import AppLoading from "expo-app-loading";

import React from "react";
import { View, StyleSheet, Platform, Text, SafeAreaView } from "react-native";
import {
  useFonts,
  Roboto_900Black,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";

import { Poppins_400Regular } from "@expo-google-fonts/poppins";

import Routes from "./src/routes";
import colors from "./src/styles/colors";

//Providers
import { TagsProvider } from "./src/contexts/TagsContexts";
import { TagsColorsProvider } from "./src/contexts/TagsColorsContexts";
import { ProfitChartProvider } from "./src/contexts/ProfitChartContexts";
import { CostChartProvider } from "./src/contexts/CostChartContexts";
import { MainChartProvider } from "./src/contexts/MainChartContexts";
import { ProductsChartProvider } from "./src/contexts/ProductsChartContexts";
import { ImportantDataProvider } from "./src/contexts/ImportantDataContexts";
import { StoreDataProvider } from "./src/contexts/StoreDataContexts";
import { UserDataProvider } from "./src/contexts/UserDataContexts";
import { DataAcessProvider } from "./src/contexts/DataAcessContexts";
import { ActivitiesProvider } from "./src/contexts/ActivitiesContexts";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
    Roboto_500Medium,
    Roboto_400Regular_Italic,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <Text>Carregando... Aguarde um momento.</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={globalStyles.pageContent}>
        <ImportantDataProvider>
          <UserDataProvider>
            <ActivitiesProvider>
              <DataAcessProvider>
                <StoreDataProvider>
                  <ProductsChartProvider>
                    <CostChartProvider>
                      <ProfitChartProvider>
                        <MainChartProvider>
                          <TagsColorsProvider>
                            <TagsProvider>
                              <Routes />
                            </TagsProvider>
                          </TagsColorsProvider>
                        </MainChartProvider>
                      </ProfitChartProvider>
                    </CostChartProvider>
                  </ProductsChartProvider>
                </StoreDataProvider>
              </DataAcessProvider>
            </ActivitiesProvider>
          </UserDataProvider>
        </ImportantDataProvider>

        <StatusBar translucent={true} backgroundColor="#96adc4" />
      </View>
    </SafeAreaView>
  );
}
const globalStyles = StyleSheet.create({
  //Conteúdo do app
  pageContent: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 29 : 0,
    backgroundColor: colors.ice,
  },
});
