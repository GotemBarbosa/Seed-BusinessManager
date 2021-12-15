// Importação obrigatória
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

//Contextos
import StoreDataContexts from "../../contexts/StoreDataContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";

export default function UpdateOtherCosts({ route }) {
  const { id, name, value } = route.params;
  const navigation = useNavigation();
  const { data } = useContext(ImportantDataContext);
  const { dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);

  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(value);

  const updateOtherCost = async () => {
    if (newName == "" || newPrice == "" || isNaN(newPrice) == true) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou ter um valor inválido",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      await Axios.post(data.IPV4 + "/othercosts/update", {
        id: id,
        name: newName,
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
      navigation.navigate("Confirmation", {
        type: "Update",
        item: "OtherCost",
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Outros" icon={true} navigate="AuthRoutes" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.ticketTitleView}>
          <PageTicket
            title="Atualizar outros gastos"
            color={colors.primaryColor}
            image="other"
          />
        </View>

        <View style={styles.inputView}>
          <View style={styles.item}>
            <Text style={styles.text}>Nome: </Text>
            <TextInput
              style={styles.input}
              defaultValue={name}
              placeholder="Insira o nome"
              onChangeText={(text) => setNewName(text)}
              maxLength={30}
            />
          </View>
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
              onPress={updateOtherCost}
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
  //Área inferior
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
