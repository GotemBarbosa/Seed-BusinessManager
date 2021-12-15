// Importação obrigatória
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";

// Bibliotecas
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";

// Importação de Componentes
import PageTicket from "../../components/PageTicket";
import Header from "../../components/Header";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import WaterIcon from "../../assets/Water.png";
import EnergyIcon from "../../assets/Energy.png";
import GasIcon from "../../assets/Gas.png";
import BillIcon from "../../assets/Bill.png";

//Contextos
import StoreDataContexts from "../../contexts/StoreDataContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";

export default function UpdateLocalCosts({ route }) {
  const { id, title, type, value } = route.params;

  const navigation = useNavigation();
  const { data } = useContext(ImportantDataContext);
  const { dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);

  const [isSelected, setSelection] = useState(false);
  const [newPrice, setNewPrice] = useState(value);

  const updateLocalCost = async () => {
    if (newPrice == "" || isNaN(newPrice) == true) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou ter um valor inválido",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      await Axios.post(data.IPV4 + "/localCosts/update", {
        id: id,
        value: newPrice,
        userAdmin: data.userId,
      })
        .then((response) => {
          dispatch({ type: "FETCH_SUCCESS" });
        })
        .catch((re) => {
          console.log("Erro: " + re);
        });

      dispatchSD({
        type: "updateData",
      });
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Gastos locais" icon={true} navigate="AuthRoutes" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.ticketTitleView}>
        </View>
        <View style={styles.itemArea}>
          <View
            style={[
              styles.typeView,
              type == "water"
                ? { backgroundColor: colors.secondarySubColor }
                : type == "energy"
                ? { backgroundColor: colors.primaryColor }
                : type == "gas"
                ? { backgroundColor: colors.secondarySubColor }
                : { backgroundColor: colors.primaryColor },
            ]}
          >
            {type == "water" ? (
              <Image source={WaterIcon} style={styles.photo} />
            ) : type == "energy" ? (
              <Image source={EnergyIcon} style={styles.photo} />
            ) : type == "gas" ? (
              <Image source={GasIcon} style={styles.photo} />
            ) : (
              <Image source={BillIcon} style={styles.photo} />
            )}
            <Text style={styles.text}>{title}</Text>
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.item}>
            <Text style={styles.text}>Preço: </Text>
            <TextInput
              style={styles.input}
              defaultValue={JSON.stringify(value)}
              placeholder="Insira o preço"
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewPrice(Number(text.replace(",", ".")))
              }
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: "rgba(126, 217, 87, 0.87)" },
              ]}
              onPress={updateLocalCost}
            >
              <Text style={styles.textButton}>Atualizar</Text>
              <Entypo name="check" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Área do título
  ticketTitleView: {
    width: 220,
  },
  // Área do formulário
  inputView: {
    paddingHorizontal: 5,
    flex: 1,
  },
  itemArea: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  //Area do tipo
  typeView: {
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 200,
  },
  //Imagem
  photo: {
    height: 30,
    width: 30,
  },
  //Cada item
  item: {
    width: "100%",
    alignItems: "center",
  },
  //Titulo de cada entrada
  text: {
    width: "90%",
    marginHorizontal: 15,
    paddingVertical: 5,
    fontFamily: fonts.heading,
    fontSize: 15,
  },
  //Caixas de texto
  input: {
    color: colors.darkGray,
    width: "95%",
    height: 45,
    fontSize: 14,
    padding: 10,
    textAlign: "left",
    borderRadius: 15,
    borderColor: colors.black,
    backgroundColor: "rgba(242, 242, 242, 1)",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    marginHorizontal: 10,
  },
  //Texto do botão
  textButton: {
    color: colors.white,
    fontSize: 25,
  },
  //Area inferior
  footer: {
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  //Botão de salvar
  saveButton: {
    marginTop: 10,
    marginBottom: 10,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
