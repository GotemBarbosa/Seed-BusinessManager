//Importação origatória
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//Bibliotecas
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

//Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function header(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {props.icon === true ? (
        <>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate(props.navigate);
            }}
          >
            <AntDesign name="arrowleft" size={24} color={colors.primaryColor} />
          </TouchableOpacity>
        </>
      ) : undefined}

      <View style={styles.textArea}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.titleBottom} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //Configuração da página
  container: {
    height: 50,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 0,
  },
  //Estilo do botão de voltar
  icon: {
    height: 50,
    width: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 12,
  },
  //Área do texto
  textArea: {
    justifyContent: "center",
    alignItems: "center",
    height: 10,
    width: 195,
    marginBottom: 5,
  },
  //Título da página
  title: {
    fontSize: 19,
    fontFamily: fonts.heading,
  },
  titleBottom: {
    height: 7,
    width: "70%",
    borderRadius: 20,
    backgroundColor: colors.primaryColor,
    opacity: 0.75,
  },
});
