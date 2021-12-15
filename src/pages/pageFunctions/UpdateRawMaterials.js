// Importação Obrigatória
import React, { useContext, useState } from "react";
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
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";

// Importação de Componentes
import PageTicket from "../../components/PageTicket";
import Header from "../../components/Header";
import boxImg from "../../assets/Box.png";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import StoreDataContexts from "../../contexts/StoreDataContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";

export default function UpdateRawMaterials({ route }) {
  const { id, name, cost, quantity, identificationType } = route.params;
  const { data } = useContext(ImportantDataContext);
  const { dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);

  const navigation = useNavigation();
  const [newName, setNewName] = useState(name);
  const [newAvarage, setNewAvarage] = useState(JSON.stringify(quantity));
  const [newCost, setNewCost] = useState(JSON.stringify(cost));
  const [selectedOption, setSelectedOption] = useState(identificationType);

  const updateMaterial = async () => {
    if (
      newName == "" ||
      newCost == "" ||
      newAvarage == "" ||
      isNaN(newCost) == true ||
      isNaN(newAvarage) == true
    ) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou ter um valor inválido",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      await Axios.post(data.IPV4 + "/rawmaterials/update", {
        id: JSON.stringify(id),
        name: newName,
        value: newCost,
        quantity: newAvarage,
        userAdmin: data.userId,
        identificationType: selectedOption,
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
        item: "RawMaterial",
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Matéria Prima" icon={true} navigate="AuthRoutes" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ticketTitleView}>
          <PageTicket
            title="Atualizar matéria prima"
            color={colors.primaryColor}
            image="box"
          />
        </View>

        <View style={styles.rawMaterialIdentificationView}>
          <View style={styles.rawMaterialIdentificationOption}>
            <TouchableOpacity
              style={[
                styles.identificationOption,
                selectedOption === "first" ? styles.selectedStyle : {},
                { backgroundColor: colors.red },
              ]}
              onPress={() => {
                selectedOption === "first"
                  ? setSelectedOption("none")
                  : setSelectedOption("first");
              }}
            >
              <Image source={boxImg} style={styles.Image} />
            </TouchableOpacity>
          </View>
          <View style={styles.rawMaterialIdentificationOption}>
            <TouchableOpacity
              style={[
                styles.identificationOption,
                selectedOption === "second" ? styles.selectedStyle : {},
                { backgroundColor: colors.secondaryColor },
              ]}
              onPress={() => {
                selectedOption === "second"
                  ? setSelectedOption("none")
                  : setSelectedOption("second");
              }}
            >
              <Image source={boxImg} style={styles.Image} />
            </TouchableOpacity>
          </View>
          <View style={styles.rawMaterialIdentificationOption}>
            <TouchableOpacity
              style={[
                styles.identificationOption,
                selectedOption === "third" ? styles.selectedStyle : {},
                { backgroundColor: colors.primaryColor },
              ]}
              onPress={() => {
                selectedOption === "third"
                  ? setSelectedOption("none")
                  : setSelectedOption("third");
              }}
            >
              <Image source={boxImg} style={styles.Image} />
            </TouchableOpacity>
          </View>
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
            <Text style={styles.text}>Quantidade: </Text>
            <TextInput
              style={styles.input}
              defaultValue={JSON.stringify(quantity)}
              placeholder="Insira a quantidade"
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewAvarage(Number(text.replace(",", ".")))
              }
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Custos: </Text>
            <TextInput
              style={styles.input}
              defaultValue={JSON.stringify(cost)}
              placeholder="Insira o custo"
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewCost(Number(text.replace(",", ".")))
              }
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: "rgba(126, 217, 87, 0.87)" },
              ]}
              onPress={updateMaterial}
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
  //Ticket da página
  ticketTitleView: {
    width: 250,
  },
  //Área de identificação
  rawMaterialIdentificationView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 15,
  },
  // Opção de identificação
  rawMaterialIdentificationOption: {
    height: 100,
    marginHorizontal: 15,
  },
  //Identificação
  identificationOption: {
    height: 85,
    width: 85,
    opacity: 0.7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  //Imagem
  Image: {
    height: 50,
    width: 50,
  },
  //Quando identificação é selecionada
  selectedStyle: {
    borderWidth: 4,
    borderColor: colors.green,
  },
  //Formulário
  inputView: {
    paddingHorizontal: 5,
    flex: 1,
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
