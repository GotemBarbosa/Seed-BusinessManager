// Importação Obrigatória
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";

// Bibliotecas
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import Axios from "axios";
import LottieView from "lottie-react-native";

// Importação de Componentes
import Photo from "../../assets/PhotoExample.png";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

// Contextos
import StoreDataContexts from "../../contexts/StoreDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";

export default function Stock() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [currentTitle, setCurrentTitle] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [currentQuantity, setCurrentQuantity] = useState();
  const [value, setValue] = useState("");
  const [newQuantity, setNewQuantity] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();

  const { data } = useContext(ImportantDataContext);
  const { state, dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);

  useEffect(() => {
    if (state.loading === true) {
      Axios.get(data.IPV4 + `/products/get?userId=${data.userId}`).then(
        (response) => {
          setProducts(response.data);
          setIsLoading(true);
        }
      );
      dispatch({ type: "FETCH_COMPLETED" });
    }
  }, [state]);

  useEffect(() => {
    Axios.get(data.IPV4 + `/products/get?userId=${data.userId}`).then(
      (response) => {
        setProducts(response.data);
        setIsLoading(true);
      }
    );
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <SearchBar
        platform="android"
        containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
        inputContainerStyle={{
          backgroundColor: colors.lightGray,
          borderRadius: 20,
          opacity: 0.5,
        }}
        onChangeText={(newVal) => setValue(newVal)}
        onClearText={() => {}}
        placeholder="Pesquisar..."
        placeholderTextColor="#888"
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => {}}
        value={value}
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalText}>
                <Text style={[styles.modalTextHeader, { fontSize: 20 }]}>
                  {currentTitle}
                </Text>

                <Entypo name="dot-single" size={20} color="black" />

                <Text style={[styles.modalTextHeader, { fontSize: 20 }]}>
                  R$ {currentPrice}
                </Text>
              </View>

              <View style={styles.modalProduct}>
                <View
                  style={[
                    styles.identification,
                    selectedItem === "none"
                      ? { backgroundColor: colors.lightGray }
                      : selectedItem === "first"
                      ? { backgroundColor: colors.red }
                      : selectedItem === "second"
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

                <View style={styles.productData}>
                  <Text
                    style={[
                      styles.modalTextHeader,
                      { marginRight: 10, fontSize: 16 },
                    ]}
                  >
                    Itens:
                  </Text>

                  <TextInput
                    style={styles.textInput}
                    placeholder="0"
                    keyboardType="number-pad"
                    defaultValue={String(currentQuantity)}
                    onChangeText={(text) => {
                      setNewQuantity(Number(text.replace(",", ".")));
                    }}
                  />
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.actButton, { backgroundColor: colors.red }]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.actButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actButton,
                    { backgroundColor: colors.limeGreen },
                  ]}
                  onPress={() => {
                    if (newQuantity == "" || isNaN(newQuantity) == true) {
                      Alert.alert(
                        "Erro",
                        "Nenhum campo deve estar vazio ou ter um valor inválido",
                        [{ text: "OK", onPress: () => {} }]
                      );
                    } else {
                      setModalVisible(!modalVisible);
                      Axios.post(data.IPV4 + `/products/update/stock`, {
                        id: currentId,
                        newStock: newQuantity,
                        userAdmin: data.userId,
                      })
                        .then((response) => {
                          dispatch({ type: "FETCH_SUCCESS" });
                          Axios.get(
                            data.IPV4 + `/products/get?userId=${data.userId}`
                          ).then((response) => {
                            setProducts(response.data);
                          });
                        })
                        .catch((re) => {
                          console.log("Erro: " + re);
                        });
                      dispatchSD({
                        type: "updateData",
                      });
                    }
                  }}
                >
                  <Text style={styles.actButtonText}>Atualizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={
          isLoading == false ? styles.stockArea : { width: "100%", flex: 1 }
        }
      >
        {isLoading === false ? (
          /* Aqui vem o que vai acontecer se nao tiver item*/
          <LottieView
            style={{ width: 100, height: 100 }}
            source={require("../../assets/lottie/loading.json")}
            autoPlay
          />
        ) : (
          //Caso tenha itens

          <View>
            {products
              .filter((val) => {
                if (value == "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(value.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => {
                return val.stockAvailable == 1 ? (
                  <View style={{ justifyContent: "center" }} key={key}>
                    <Item
                      key={key}
                      stockPermition={true}
                      id={val.id}
                      name={val.name}
                      price={val.price}
                      stockAvailable={val.stockAvailable}
                      stockQuantity={val.stockQuantity}
                      tagId={val.tagId}
                      userAdmin={val.userAdmin}
                      description={val.description}
                      identification={val.identificationType}
                    />
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setModalVisible(true);
                        setCurrentId(val.id);
                        setCurrentTitle(val.name);
                        setCurrentPrice(val.price);
                        setCurrentQuantity(val.stockQuantity);
                        setSelectedItem(val.identificationType);
                      }}
                    >
                      <AntDesign name="edit" size={19} color="black" />
                    </TouchableOpacity>
                  </View>
                ) : undefined;
              })}
            <View style={styles.listSpace} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  // Botão de editar
  editButton: {
    position: "relative",
    height: 15,
    width: 20,
    right: 0,
    left: "90%",
    bottom: "60%",
  },
  // Espaço
  container: {
    flex: 1,
  },
  // Caixa de texto
  input: {
    width: 280,
    height: 40,
    fontSize: 15,
    textAlign: "left",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  // Botão de pesquisa
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 360,
    borderWidth: 0.7,
    borderColor: colors.black,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  // Área central
  centeredView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: "30%",
    left: "10%",
    marginTop: 22,
  },
  // Fundo do modal
  modalBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Espaço do modal
  modalContent: {
    height: 180,
    width: 300,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
    elevation: 8,
  },
  // Área do texto do modal
  modalText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 3,
  },
  // Título do modal
  modalTextHeader: {
    fontFamily: fonts.text2,
  },
  // Área do estoque
  stockArea: {
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  // Texto de quando não há itens
  noItemText: {
    color: colors.textGray,
  },
  // Lista de produtos
  productList: {
    width: "100%",
    flexGrow: 1,
  },
  //espaço após a lista
  listSpace: {
    height: 50,
  },
  // Area dos items do modal
  modalProduct: {
    flexDirection: "row",
    paddingTop: 5,
  },
  // Foto do modal
  identification: {
    width: 80,
    height: 80,
    opacity: 0.7,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  // Caixa de texto
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    width: 50,
    height: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  // Area do cadastro de itens
  productData: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  // Botões do modal
  modalButtons: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  // Botões
  actButton: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  // Botão de ação
  actButtonText: {
    fontFamily: fonts.poppinsText,
    color: colors.white,
    fontSize: 18,
  },
});
