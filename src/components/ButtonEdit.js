// Importação Obrigatória
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// Bibliotecas
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Configurações
import colors from "../styles/colors";

export default function ButtonEdit(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate(props.onPress);
      }}
    >
      <MaterialCommunityIcons name={props.name} size={props.size} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //Botão
  button: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 360,
    backgroundColor: colors.secondaryColor,
    opacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
  },
});
