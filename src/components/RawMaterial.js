// Importação Obrigatória
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Bibliotecas
import boxImg from "../assets/Box.png";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from "@expo/vector-icons";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function RawMaterial(props) {
  const date = new Date(props.date);
  const insertDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return (
    <View style={styles.container}>
      <View>
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
          <Image source={boxImg} style={styles.Image} />
        </View>
      </View>
      <View style={styles.itemData}>
        <View style={styles.mainData}>
          <Text style={styles.title}>{props.name}</Text>
          <View style={styles.quantityView}>
            <Entypo name="box" size={15} color="black" />
            <Text style={styles.text}> {Number(props.quantity)}</Text>
          </View>
        </View>

        <Text style={styles.text}>Custo: R$ {props.value}</Text>
        <Text style={styles.text}>Data de adição: {insertDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //Configuração do componente
  container: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  //Foto
  identification: {
    width: 60,
    height: 60,
    marginHorizontal: 15,
    opacity: 0.7,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  //Imagem
  Image: {
    height: 40,
    width: 40,
  },
  //Area dos dados dos itens
  itemData: {
    justifyContent: "center",
  },
  //Dados principais
  mainData: {
    flexDirection: "row",
  },
  //texto do titulo
  title: {
    fontFamily: fonts.text2,
    fontSize: RFValue(13),
  },
  //Area da quantidade
  quantityView: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  //Texto
  text: {
    fontFamily: fonts.text,
    color: colors.darkGray,
    fontSize: RFValue(11),
  },
});
