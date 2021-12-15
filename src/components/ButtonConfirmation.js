// Importação Obrigatória
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// Bibliotecas
import { useNavigation } from "@react-navigation/core";

// Importação de Componentes

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function ButtonConfirmation(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.color }]}
      onPress={() => {
        navigation.navigate(props.onPress);
      }}
    >
      <Text style={styles.title}> {props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //Configuração do componente
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: "100%",
    backgroundColor: colors.secondaryColor,
    opacity: 1,
    borderRadius: 20,
  },
  //Texto do título
  title: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts.text,
    fontWeight: "700",
  },
});
