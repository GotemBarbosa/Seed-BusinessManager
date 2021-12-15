//Importação obrigatória
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//Bibliotecas
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Axios from "axios";

//Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import ImportantDataContext from "../contexts/ImportantDataContexts";
import DataAcessContexts from "../contexts/DataAcessContexts";

export default function Item(props) {
  const { state } = useContext(DataAcessContexts);
  const { data } = useContext(ImportantDataContext);

  const [tagColor, setTagColor] = useState();
  const [tagName, setTagName] = useState();

  useEffect(() => {
    Axios.get(data.IPV4 + `/tags/get?userId=${data.userId}`).then(
      (response) => {
        response.data.map((val, key) => {
          if (val.id == props.tagId) {
            setTagColor(val.colorName);
            setTagName(val.name);
          }
        });
      }
    );
  }, []);

  useEffect(() => {
    if (state.message === "Fetch completed") {
      Axios.get(data.IPV4 + `/tags/get?userId=${data.userId}`).then(
        (response) => {
          response.data.map((val, key) => {
            if (val.id == props.tagId) {
              setTagColor(val.colorName);
              setTagName(val.name);
            }
          });
        }
      );
    }
  }, [state]);

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
          <MaterialCommunityIcons
            name="shopping-outline"
            size={50}
            color="black"
          />
        </View>
      </View>
      <View style={styles.itemData}>
        <View style={styles.mainData}>
          <Text style={styles.name}>{props.name}</Text>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.price}> R$ {Number(props.price)}</Text>

          {props.stockPermition === true ? (
            <View style={styles.quantityView}>
              <Entypo name="box" size={15} color="black" />
              <Text style={styles.quantity}>{props.stockQuantity}</Text>
            </View>
          ) : undefined}
        </View>

        <Text style={styles.description}>{props.description}</Text>

        <View style={[styles.tagView, { backgroundColor: `${tagColor}` }]}>
          <Text style={styles.tagText}>{tagName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //Configuração da página
  container: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  //Imagem
  identification: {
    width: 70,
    height: 70,
    opacity: 0.7,
    borderRadius: 8,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  //Área dos dados do item
  itemData: {
    justifyContent: "center",
  },
  //Dados do produto
  mainData: {
    flexDirection: "row",
  },
  //Nome
  name: {
    fontFamily: fonts.text2,
    fontSize: RFValue(11),
  },
  //Preço
  price: {
    fontFamily: fonts.text2,
    fontSize: RFValue(11),
  },
  //Área da quantidade
  quantityView: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  //Quantidade
  quantity: {
    marginLeft: 5,
  },
  //Descrição
  description: {
    color: colors.textGray,
    fontFamily: fonts.text2,
    fontSize: RFValue(11),
  },
  //Tags
  tagView: {
    paddingHorizontal: 10,
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 8,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: 5,
    zIndex: 4,
  },
  //Texto das tags
  tagText: {
    color: colors.white,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: fonts.poppinsText,
    fontSize: 11,
  },
});
