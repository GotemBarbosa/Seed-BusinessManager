// Importação obrigatória
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

// Bibliotecas
import { StatusBar } from "expo-status-bar";

// Importação de Componentes
import Employees from "./subpages/Employees";
import LocalCosts from "./subpages/LocalCosts";
import OtherCosts from "./subpages/OtherCosts";
import RawMaterials from "./subpages/RawMaterials";
import Header from "../components/Header";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Costs() {
  const [Component, setComponent] = useState(1);
  const [ShowEmployees, setShowEmployees] = useState("flex");
  const [ShowRawMaterial, setShowRawMaterial] = useState("none");
  const [ShowLocalCosts, setShowLocalCosts] = useState("none");
  const [ShowOtherCosts, setShowOtherCosts] = useState("none");

  return (
    <>
      <Header title="Despesas" />

      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={colors.gray} />

        <View style={styles.pageChoiceArea}>
          <View style={styles.option}>
            <Text
              style={styles.pageOption}
              onPress={() => {
                setComponent(1);
                if (ShowEmployees === "none") {
                  setShowEmployees("flex");
                  setShowRawMaterial("none");
                  setShowLocalCosts("none");
                  setShowOtherCosts("none");
                }
              }}
            >
              Funcionários
            </Text>
            <View
              style={[styles.textBottomProps, { display: ShowEmployees }]}
            />
          </View>

          <View style={styles.option}>
            <Text
              style={styles.pageOption}
              onPress={() => {
                setComponent(2);
                if (ShowRawMaterial === "none") {
                  setShowEmployees("none");
                  setShowRawMaterial("flex");
                  setShowLocalCosts("none");
                  setShowOtherCosts("none");
                }
              }}
            >
              Matéria Prima
            </Text>
            <View
              style={[styles.textBottomProps, { display: ShowRawMaterial }]}
            />
          </View>

          <View style={styles.option2}>
            <Text
              style={styles.pageOption}
              onPress={() => {
                setComponent(3);
                if (ShowLocalCosts === "none") {
                  setShowEmployees("none");
                  setShowRawMaterial("none");
                  setShowLocalCosts("flex");
                  setShowOtherCosts("none");
                }
              }}
            >
              Local
            </Text>
            <View
              style={[styles.textBottomProps, { display: ShowLocalCosts }]}
            />
          </View>

          <View style={styles.option2}>
            <Text
              style={styles.pageOption}
              onPress={() => {
                setComponent(4);
                if (ShowOtherCosts === "none") {
                  setShowEmployees("none");
                  setShowRawMaterial("none");
                  setShowLocalCosts("none");
                  setShowOtherCosts("flex");
                }
              }}
            >
              Outros
            </Text>
            <View
              style={[styles.textBottomProps, { display: ShowOtherCosts }]}
            />
          </View>
        </View>

        {Component === 1 ? (
          <Employees />
        ) : Component === 2 ? (
          <RawMaterials />
        ) : Component === 3 ? (
          <LocalCosts />
        ) : (
          <OtherCosts />
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  // Espaço
  container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 1,
    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
  },
  // Área das opções
  pageChoiceArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray,
  },
  // Configuração da opção 1
  option: {
    width: 110,
    alignItems: "center",
  },
  // Função da opção
  pageOption: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.heading,
    lineHeight: 18.75,
    paddingTop: 10,
    paddingVertical: 1,
  },
  // Configuração da opção 2
  option2: {
    width: 60,
    alignItems: "center",
  },
  // barra do texto
  textBottomProps: {
    height: 7,
    width: "80%",
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
    opacity: 0.75,
  },
});
