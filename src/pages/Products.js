// Importação Obrigatória
import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

// Bibliotecas
import { StatusBar } from "expo-status-bar";

// Importação de Componentes
import Header from "../components/Header";
import Catalog from "./subpages/Catalog";
import Stock from "./subpages/Stock";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Products() {
  const [component, setComponent] = useState(1);
  const [ShowCatalog, setShowCatalog] = useState("flex");
  const [ShowStock, setShowStock] = useState("none");

  return (
    <>
      <Header title="Meus Produtos" />

      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={colors.gray} />
        <View style={styles.pageChoiceArea}>
          <View style={styles.option}>
            <Text
              style={styles.pageOption}
              onPress={() => {
                setComponent(1);
                if (ShowCatalog === "none") {
                  setShowCatalog("flex");
                  setShowStock("none");
                }
              }}
            >
              Produtos
            </Text>

            <View
              style={[styles.textBottomProduct, { display: ShowCatalog }]}
            />
          </View>
          <View style={styles.option}>
            <Text
              style={styles.pageOption}
              onPress={() => {
                setComponent(2);
                if (ShowStock === "none") {
                  setShowStock("flex");
                  setShowCatalog("none");
                }
              }}
            >
              Estoque
            </Text>

            <View style={[styles.textBottomStock, { display: ShowStock }]} />
          </View>
        </View>

        {component === 1 ? <Catalog /> : <Stock />}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  //Configuração da página
  container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 1,
    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
  },
  //Area de seleção de páginas
  pageChoiceArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
    height: 55,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray,
  },
  //View de configuração da opção
  option: {
    width: 100,
    alignItems: "center",
  },
  //Texto de cada opção
  pageOption: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.heading,
    lineHeight: 18.75,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  //Barra do texto(quando selecionado o produto)
  textBottomProduct: {
    height: 7,
    width: "80%",
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
    opacity: 0.75,
  },
  //Barra do texto(quando selecionado o estoque)
  textBottomStock: {
    height: 7,
    width: "80%",
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
    opacity: 0.75,
  },
});
