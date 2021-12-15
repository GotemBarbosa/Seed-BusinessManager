// Importação Obrigatória
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Importação de Componentes
import boxImg from "../assets/Box.png";
import houseImg from "../assets/House.png";
import PeopleImg from "../assets/People.png";
import OthersImg from "../assets/Others.png";
import { RFValue } from "react-native-responsive-fontsize";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function PageTicket(props) {
  return (
    <View style={[styles.container, { backgroundColor: props.color }]}>
      {props.image === "box" ? (
        <Image source={boxImg} style={styles.Image} />
      ) : props.image == "people" ? (
        <Image source={PeopleImg} style={styles.Image} />
      ) : props.image == "house" ? (
        <Image source={houseImg} style={styles.Image} />
      ) : props.image == "other" ? (
        <Image source={OthersImg} style={styles.Image} />
      ) : undefined}
      <Text style={styles.title}> {props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Espaço
  container: {
    height: 50,
    borderRadius: 20,
    marginLeft: -16,
    marginVertical: 15,
    paddingLeft: 20,
    paddingRight: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  // Título
  title: {
    fontSize: RFValue(15),
    color: colors.black,
    fontFamily: fonts.heading,
    lineHeight: 23.44,
  },
  // Imagens
  Image: {
    width: 30,
    height: 30,
  },
});
