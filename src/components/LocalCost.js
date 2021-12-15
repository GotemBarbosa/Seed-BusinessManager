// Importação obrigatória
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Biliotecas
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

//Importação de componentes
import WaterIcon from "../assets/Water.png";
import EnergyIcon from "../assets/Energy.png";
import GasIcon from "../assets/Gas.png";
import BillIcon from "../assets/Bill.png";

//Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function LocalCost(props) {
  var message = "";
  let percentage = 0;

  const date = new Date(props.date);
  const insertDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  function percentageValue() {
    if (props.value < props.oldValue) {
      //maior
      percentage = 100 - (100 * props.value) / props.oldValue;
      return "smaller";
    } else if (props.value == props.oldValue) {
      //igual
      return "equal";
    } else if (props.oldValue == 0) {
      return "zero";
    } else if (props.value > props.oldValue) {
      percentage = (100 * props.value) / props.oldValue - 100;
      return "bigger";
    }
  }
  message = percentageValue();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.typeView,
          props.type == "water"
            ? { backgroundColor: colors.secondarySubColor }
            : props.type == "energy"
            ? { backgroundColor: colors.primaryColor }
            : props.type == "gas"
            ? { backgroundColor: colors.secondarySubColor }
            : { backgroundColor: colors.primaryColor },
        ]}
      >
        {props.type == "water" ? (
          <Image source={WaterIcon} style={styles.photo} />
        ) : props.type == "energy" ? (
          <Image source={EnergyIcon} style={styles.photo} />
        ) : props.type == "gas" ? (
          <Image source={GasIcon} style={styles.photo} />
        ) : (
          <Image source={BillIcon} style={styles.photo} />
        )}
      </View>
      <View style={styles.costData}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.value}>Valor: R$ {Number(props.value)}</Text>
        <Text style={styles.value}>Data de adição: {insertDate}</Text>
        {message == "bigger" ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { color: colors.red }]}>
              {parseInt(percentage)}% mais caro que o registro anterior
            </Text>

            <MaterialCommunityIcons
              name="cart-arrow-up"
              size={24}
              color="black"
            />
          </View>
        ) : message == "equal" ? (
          <Text style={[styles.text, { color: colors.green }]}>
            Valor igual ao do registro anterior
          </Text>
        ) : message == "smaller" ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { color: colors.green }]}>
              {parseInt(percentage)}% mais barato que o registro anterior
            </Text>
            <MaterialCommunityIcons
              name="cart-arrow-down"
              size={24}
              color="black"
            />
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  //Configuração da página
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: colors.white,
  },
  //Seleção do custo local
  typeView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  //Imagem
  photo: {
    height: 30,
    width: 30,
  },
  //Valores dos custos
  costData: {
    marginHorizontal: 10,
  },
  //Texto do titulo
  title: {
    fontFamily: fonts.heading,
    fontSize: 16,
  },
  //Texto do valor
  value: {
    paddingVertical: 3,
    fontFamily: fonts.text,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textGray,
  },
  //Texto
  text: {
    paddingVertical: 3,
    fontFamily: fonts.text,
    fontSize: RFValue(11),
    fontWeight: "bold",
  },
});
