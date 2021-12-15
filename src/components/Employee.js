// Importação Obrigatória
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Bibliotecas
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Employee(props) {
  return (
    <View style={styles.container}>
      <View style>
        <View
          style={[
            styles.identification,
            props.identification === "none"
              ? { backgroundColor: colors.lightGray }
              : props.identification === "first"
              ? { backgroundColor: colors.red }
              : props.identification === "second"
              ? { backgroundColor: colors.secondaryColor }
              : { backgroundColor: colors.primaryColor },
          ]}
        >
          <Ionicons name="person-outline" size={40} color="black" />
        </View>
      </View>
      <View style={styles.employeeData}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.text}>Salário: R$ {Number(props.salary)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //Configuração da página
  container: {
    width: "100%",
    marginTop: 20,
    marginLeft: 15,
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
  },
  //Foto
  identification: {
    width: 60,
    height: 60,
    opacity: 0.7,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  //Dados do funcionário
  employeeData: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "space-around",
  },
  //Texto do nome
  name: {
    color: colors.black,
    fontFamily: fonts.text2,
    fontSize: RFValue(12),
  },
  //Texto padrão
  text: {
    fontSize: RFValue(11),
    color: colors.darkGray,
    fontFamily: fonts.text,
  },
});
