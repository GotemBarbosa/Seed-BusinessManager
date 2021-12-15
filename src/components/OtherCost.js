// Importação Obrigatória
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Bibliotecas
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function OtherCost(props) {
  const date = new Date(props.date);
  const insertDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name="pricetag-outline" size={28} color="black" />
      </View>
      <View style={styles.otherCostData}>
        <Text style={styles.name}> {props.name}</Text>
        <Text style={styles.text}>Valor: R$ {Number(props.value)}</Text>
        <Text style={styles.text}>Data de adição: {insertDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Espaço
  container: {
    height: 80,
    marginTop: 20,
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  // Dados
  otherCostData: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "flex-start",
  },
  // Icones
  icon: {
    justifyContent: "center",
  },
  // Nomes
  name: {
    color: colors.black,
    fontFamily: fonts.text2,
    fontSize: RFValue(14),
  },
  // Texto
  text: {
    fontSize: RFValue(12),
    color: colors.darkGray,
    fontFamily: fonts.text,
  },
});
