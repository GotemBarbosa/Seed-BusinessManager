// Importação obrigatória
import React, { useContext, useState, useEffect } from "react";
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
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Importação de Componentes
import PageTicket from "../../components/PageTicket";
import Header from "../../components/Header";
import TagCreate from "../../components/TagCreate";
import StoreDataContexts from "../../contexts/StoreDataContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";
import TagsContexts from "../../contexts/TagsContexts";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export default function AddProducts() {
  const navigation = useNavigation();
  const { data } = useContext(ImportantDataContext);
  const { dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { state } = useContext(TagsContexts);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagSelected, setTagSelected] = useState();
  const [stockVisible, setStockVisible] = useState(false);
  const [stock, setStock] = useState(0);
  const [selectedOption, setSelectedOption] = useState("none");

  useEffect(() => {
    setTagSelected(state.id);
  }, [state]);

  const insertProducts = async () => {
    if (
      name == "" ||
      description == "" ||
      price == "" ||
      isNaN(price) == true
    ) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou ter um valor inválido",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      await Axios.post(data.IPV4 + "/products/insert", {
        name: name,
        description: description,
        price: price,
        stockAvailable: stockVisible,
        stockQuantity: stock,
        tagId: Number(tagSelected),
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
        type: "Insert",
        item: "Product",
      });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header title="Meus produtos" icon={true} navigate="AuthRoutes" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.ticketTitleView}>
          <PageTicket
            title="Adicionar produtos"
            color={colors.primaryColor}
            image="box"
          />
        </View>

        <View style={styles.productIdentificationView}>
          <View style={styles.productIdentificationOption}>
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
              <MaterialCommunityIcons
                name="shopping-outline"
                size={55}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productIdentificationOption}>
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
              <MaterialCommunityIcons
                name="shopping-outline"
                size={55}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productIdentificationOption}>
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
              <MaterialCommunityIcons
                name="shopping-outline"
                size={55}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputView}>
          <View style={styles.item}>
            <Text style={styles.text}>Nome: </Text>
            <TextInput
              style={styles.input}
              placeholder="Insira o nome"
              onChangeText={(text) => setName(text)}
              maxLength={30}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Descrição: </Text>
            <TextInput
              style={styles.input}
              placeholder="Insira a descrição"
              onChangeText={(text) => setDescription(text)}
              maxLength={40}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Preço: </Text>
            <TextInput
              style={styles.input}
              placeholder="Insira o preço"
              keyboardType="numeric"
              onChangeText={(text) => setPrice(Number(text.replace(",", ".")))}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Estoque: </Text>
            {stockVisible == true ? (
              <TextInput
                style={styles.input}
                placeholder="Insira a quantidade"
                keyboardType="numeric"
                onChangeText={(text) => setStock(text.replace(",", "."))}
              />
            ) : (
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setStockVisible(!stockVisible);
                  }}
                >
                  <Text> ADICIONAR </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Tags: </Text>
          </View>

          <TagCreate />

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: "rgba(126, 217, 87, 0.87)" },
              ]}
              onPress={insertProducts}
            >
              <Text style={styles.textButton}> Salvar</Text>
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
  // Item
  normalTicketView: {
    width: 120,
  },
  // Area de identificação
  productIdentificationView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 15,
  },
  // Cada opção de identificação (area)
  productIdentificationOption: {
    height: 100,
    marginHorizontal: 15,
  },
  // Identificação
  identificationOption: {
    height: 85,
    width: 85,
    opacity: 0.7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  // Quando selecionado
  selectedStyle: {
    borderWidth: 4,
    borderColor: colors.green,
  },
  // Área do formulário
  inputView: {
    paddingHorizontal: 5,
    flex: 1,
  },
  // Botões
  button: {
    width: 130,
    height: 40,
    backgroundColor: colors.primaryColor,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: fonts.text,
    elevation: 7,
    marginHorizontal: 10,
  },
  // Cada item
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
  //Espaço inferior
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
