// Importação Obrigatória
import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from "react-native";

// Bibliotecas
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import DropDownPicker from "react-native-dropdown-picker";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importação de Componentes
import QuickSale from "../pages/subpages/QuickSale";
import MainChart from "../components/MainChart";
import ProfitChart from "../components/ProfitChart";
import CostChart from "../components/CostChart";
import StoreData from "./subpages/StoreData";
import Activities from "./subpages/Activities";
import Tutorial from "../components/Tutorial";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import MainChartContext from "../contexts/MainChartContexts";
import ProfitChartContext from "../contexts/ProfitChartContexts";
import ProductsChartContext from "../contexts/ProductsChartContexts";
import StoreDataContexts from "../contexts/StoreDataContexts";
import ImportantDataContext from "../contexts/ImportantDataContexts";
import DataAcessContexts from "../contexts/DataAcessContexts";
import ActivitiesContexts from "../contexts/ActivitiesContexts";

import { useNavigation } from "@react-navigation/core";

export default function Dashboard() {
  const [component, setComponent] = useState(1);
  const [ShowSales, setShowSales] = useState("flex");
  const [ShowStoreData, setShowStoreData] = useState("none");
  const [ShowStoreActivities, setShowStoreActivities] = useState("none");
  const [EnableScrollView, setEnableScrollView] = useState(true);
  const [productsList, setProductsList] = useState();
  let val;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(null);
  const [price, setPrice] = useState(0);
  const [saleValue, setSaleValue] = useState();
  const [quantity, setQuantity] = useState(0);
  const [stockAvailable, setStockAvailable] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationVisible, setModalConfirmationVisible] =
    useState(false);
  const [stock, setStock] = useState("");
  const [productsAvailable, setProductsAvailable] = useState(false);
  const { state, dispatch } = useContext(DataAcessContexts);
  const { data } = useContext(ImportantDataContext);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchP } = useContext(ProfitChartContext);
  const { dispatchPr } = useContext(ProductsChartContext);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { dispatchA } = useContext(ActivitiesContexts);

  async function getFirstAcess() {
    try {
      const value = await AsyncStorage.getItem("@seedMe_firstAcess");
      if (value !== null) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
        try {
          await AsyncStorage.setItem("@seedMe_firstAcess", "acessed");
        } catch (e) {
          console.log("firstAcessCheck: " + e);
        }
      }
    } catch (e) {
      console.log("firstAcessCheck: " + e);
    }
  }

  useEffect(() => {
    Axios.get(data.IPV4 + `/products/get?userId=${data.userId}`).then(
      (response) => {
        setProductsList(response.data);
        setProductsAvailable(true);
      }
    );
    getFirstAcess();
  }, []);

  useEffect(() => {
    Axios.get(data.IPV4 + `/products/get?userId=${data.userId}`).then(
      (response) => {
        setProductsList(response.data);
      }
    );
    //}
  }, [state]);

  const [productId, setProductId] = useState();

  const InsertSale = async () => {
    if (productId) {
      if (quantity == "" || isNaN(quantity) == true) {
        Alert.alert(
          "Erro",
          "Nenhum campo deve estar vazio ou ter um valor inválido",
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        if (stockAvailable == 1) {
          if (stock - quantity < 0) {
            Alert.alert(
              "ATENÇÃO!",
              "A quantidade cadastrada excede a quantidade do estoque, continuar mesmo assim? Caso prossiga, o cadastro será feito, porém o valor do estoque desse produto será alterado para 0.",
              [
                {
                  text: "Sim",
                  onPress: async () => {
                    await Axios.post(data.IPV4 + `/products/update/stock`, {
                      id: productId,
                      newStock: 0,
                      userAdmin: data.userId,
                    })
                      .then((response) => {
                        dispatch({ type: "FETCH_SUCCESS" });
                      })
                      .catch((re) => {
                        console.log("Erro: " + re);
                      });

                    await Axios.post(data.IPV4 + "/sales/insert", {
                      productId: productId,
                      value: saleValue,
                      unitaryValue: price,
                      quantity: quantity,
                      userAdmin: data.userId,
                    })
                      .then((r) => {})
                      .catch((re) => {
                        console.log("Erro: " + re);
                      });

                    dispatchM({
                      type: "changeChart",
                    });
                    dispatchP({
                      type: "changeChart",
                    });
                    dispatchPr({
                      type: "changeChart",
                    });
                    dispatchSD({
                      type: "updateData",
                    });
                    dispatchA({
                      type: "updateData",
                    });

                    setModalConfirmationVisible(true);
                  },
                },
                { text: "Não", onPress: () => {} },
              ]
            );
          } else {
            const stockValue = Number(stock) - Number(quantity);
            Axios.post(data.IPV4 + `/products/update/stock`, {
              id: productId,
              newStock: stockValue,
              userAdmin: data.userId,
            })
              .then((response) => {
                dispatch({ type: "FETCH_SUCCESS" });
              })
              .catch((re) => {
                console.log("Erro: " + re);
              });

            await Axios.post(data.IPV4 + "/sales/insert", {
              productId: productId,
              value: saleValue,
              unitaryValue: price,
              quantity: quantity,
              userAdmin: data.userId,
            })
              .then((r) => {})
              .catch((re) => {
                console.log("Erro: " + re);
              });

            dispatchM({
              type: "changeChart",
            });
            dispatchP({
              type: "changeChart",
            });
            dispatchPr({
              type: "changeChart",
            });
            dispatchSD({
              type: "updateData",
            });
            dispatchA({
              type: "updateData",
            });
            setModalConfirmationVisible(true);
          }
        } else {
          await Axios.post(data.IPV4 + "/sales/insert", {
            productId: productId,
            value: saleValue,
            unitaryValue: price,
            quantity: quantity,
            userAdmin: data.userId,
          })
            .then((r) => {})
            .catch((re) => {
              console.log("Erro: " + re);
            });
          dispatchM({
            type: "changeChart",
          });
          dispatchP({
            type: "changeChart",
          });
          dispatchPr({
            type: "changeChart",
          });
          dispatchSD({
            type: "updateData",
          });
          dispatchA({
            type: "updateData",
          });
          setModalConfirmationVisible(true);
        }
      }
    }
  };

  function HandleChangeBasePrice(item) {
    setPrice(item);
  }

  function HandleChangePriceValue(text) {
    setQuantity(Number(text));
    setSaleValue(Number(text) * price);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.white }}
      onStartShouldSetResponderCapture={() => {
        setEnableScrollView(true);
      }}
    >
      <StatusBar translucent={true} backgroundColor={colors.ice} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={EnableScrollView}
        onPress={() => {
          setEnableScrollView(true);
        }}
      >
        {modalVisible === true ? (
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <Tutorial
              onClose={() => {
                setModalVisible(false);
              }}
            />
          </Modal>
        ) : null}

        {modalConfirmationVisible === true ? (
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalConfirmationVisible}
              style={{ height: 300, width: 200 }}
              onRequestClose={() => {
                setModalConfirmationVisible(false);
              }}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTextConfirmation}>
                    Venda cadastrada 😃
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setModalConfirmationVisible(false);
                    }}
                  >
                    <Text style={styles.modalButtonText}>Obrigado!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        ) : null}

        {/* Gráfico */}
        <View style={{ height: 380, backgroundColor: colors.darkGray }}>
          <Swiper
            style={styles.wrapper}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.Activedot} />}
            paginationStyle={{ bottom: 5 }}
            loop={false}
          >
            <View style={styles.slide}>
              <MainChart />
            </View>

            <View style={styles.slide}>
              <CostChart />
            </View>

            <View style={styles.slide}>
              <ProfitChart />
            </View>
          </Swiper>
        </View>
        {/* Vendas */}
        <View style={styles.saleChoiceArea}>
          <View style={styles.option}>
            <Text
              style={styles.saleOption}
              onPress={() => {
                setComponent(1);
                if (ShowSales === "none") {
                  setShowSales("flex");
                  setShowStoreData("none");
                  setShowStoreActivities("none");
                }
              }}
            >
              Vendas
            </Text>

            <View style={[styles.textBottomOption, { display: ShowSales }]} />
          </View>
          <View style={styles.option}>
            <Text
              style={styles.saleOption}
              onPress={() => {
                setComponent(2);
                if (ShowStoreData === "none") {
                  setShowSales("none");
                  setShowStoreData("flex");
                  setShowStoreActivities("none");
                }
              }}
            >
              Dados
            </Text>

            <View
              style={[styles.textBottomDashboard, { display: ShowStoreData }]}
            />
          </View>

          <View style={styles.option}>
            <Text
              style={styles.saleOption}
              onPress={() => {
                setComponent(3);
                if (ShowStoreActivities === "none") {
                  setShowSales("none");
                  setShowStoreData("none");
                  setShowStoreActivities("flex");
                }
              }}
            >
              Atividades
            </Text>

            <View
              style={[
                styles.textBottomDashboard,
                { display: ShowStoreActivities },
              ]}
            />
          </View>
        </View>
        <View>
          {component === 1 ? (
            <>
              {/*Input Detailed Sale */}
              <View style={styles.detailedSale}>
                <View style={styles.content}>
                  <View style={styles.topArea} />
                  <View style={styles.centralText}>
                    <Text style={styles.text}>Venda detalhada</Text>
                  </View>

                  <View style={styles.choice}>
                    <View style={styles.dropStyle} />
                    <DropDownPicker
                      schema={{
                        label: "name",
                        value: "id",
                      }}
                      style={styles.dropDownPicker}
                      open={open}
                      value={values}
                      nestedScrollEnabled
                      items={productsAvailable === true ? productsList : []}
                      setOpen={setOpen}
                      setValue={setValues}
                      placeholder="Selecione um produto..."
                      dropDownDirection="BOTTOM"
                      placeholderStyle={{
                        color: "grey",
                        fontWeight: "bold",
                      }}
                      labelStyle={{
                        fontSize: 16,
                      }}
                      onChangeValue={(item) => {
                        val = item;
                        if (productsList) {
                          productsList.map((data) => {
                            if (data.id == val) {
                              setProductId(data.id);
                              setStockAvailable(data.stockAvailable);
                              setStock(data.stockQuantity);
                              HandleChangeBasePrice(data.price);
                            }
                          });
                        }
                      }}
                      maxHeight={270}
                      dropDownContainerStyle={styles.dropDown}
                      listItemLabelStyle={styles.listItemLabel}
                      selectedItemContainerStyle={
                        styles.listSelectedItemContainer
                      }
                      selectedItemLabelStyle={styles.listSelectedItemLabel}
                      onPress={() => {
                        setEnableScrollView(false);
                      }}
                    />
                  </View>

                  <View style={styles.dataArea}>
                    <View style={styles.quantityArea}>
                      <Text style={styles.text}>Quantidade:</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => {
                          HandleChangePriceValue(text.replace(",", "."));
                        }}
                        placeholder="0"
                        keyboardType="number-pad"
                      />
                    </View>
                    <View style={styles.profitArea}>
                      <Text style={styles.text}>Valor unitário:</Text>
                      <View style={styles.fakeInput}>
                        <Text style={styles.fakeText}> R$: {price} </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.buttonArea}>
                    <TouchableOpacity
                      style={styles.buttonSale}
                      onPress={InsertSale}
                    >
                      <Text style={styles.textSale}> VENDER </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <QuickSale />
            </>
          ) : component === 2 ? (
            <StoreData />
          ) : (
            <Activities />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  //Área central do modal
  centeredView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: "30%",
    left: "10%",
    marginTop: 22,
  },
  //Fundo do modal
  modalBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  //Conteúdo do modal
  modalContent: {
    height: 200,
    width: 350,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
    elevation: 8,
    alignItems: "center",
    justifyContent: "space-around",
  },
  //Texto de confirmação do modal
  modalTextConfirmation: {
    fontSize: 28,
    fontFamily: fonts.text2,
    color: colors.darkGray,
  },
  //Botão do modal
  modalButton: {
    backgroundColor: colors.limeGreen,
    width: "80%",
    height: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  //Texto do botão do modal
  modalButtonText: {
    fontFamily: fonts.poppinsText,
    color: colors.white,
    fontSize: 24,
  },
  //Swap
  wrapper: {
    // backgroundColor: '#f00'-
  },
  // Botão do swip
  dot: {
    backgroundColor: colors.white,
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  // Botão do swip ativo
  Activedot: {
    backgroundColor: colors.secondarySubColor,
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  // Configuração do slide
  slide: {
    flex: 0,
    backgroundColor: "transparent",
  },

  // Área das opções
  saleChoiceArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray,
    marginBottom: 25,
  },
  // Opção
  option: {
    width: 125,
    alignItems: "center",
  },
  // Opção escolhida
  saleOption: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.heading,
    lineHeight: 18.75,
  },
  // Botão da venda detalhada
  textBottomOption: {
    height: 7,
    width: "70%",
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
    opacity: 0.8,
  },
  // Botão da venda rápida
  textBottomDashboard: {
    height: 7,
    width: "80%",
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
    opacity: 0.8,
  },
  // Detailed Sale

  // Configuração da página
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  // Área dos botões
  buttonArea: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  //Botão de vender
  buttonSale: {
    width: 150,
    height: 40,
    marginVertical: 15,
    marginLeft: 10,
    borderRadius: 16,
    backgroundColor: colors.green,
    opacity: 0.75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  //Texto do botão
  textSale: {
    fontSize: 18,
    fontFamily: fonts.poppinsText,
    color: colors.white,
  },

  //Input Detailed Sale
  detailedSale: {
    alignItems: "center",
    marginBottom: 10,
  },
  //Conteúdo da página
  content: {
    backgroundColor: colors.ice,
    width: "93%",
    height: 275,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    elevation: 4,
  },
  //Área do topo da página
  topArea: {
    width: "100%",
    height: 15,
  },
  //Texto centralizado
  centralText: {
    marginTop: -15,
    width: "100%",
    alignItems: "center",
  },
  //Estilo do texto
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  //Escolha da dropdown picker
  choice: {
    marginVertical: 16,
  },
  //Área do dropdown picker
  dropStyle: {
    position: "absolute",
    marginLeft: -3,
    elevation: 2,
    height: 45,
    width: 6,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: colors.primarySubColor,
  },
  //Área dos valores
  dataArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  //Área da quantidade
  quantityArea: {
    alignItems: "center",
    height: 70,
    justifyContent: "space-between",
  },
  //Estilo dos textos nas caixas de texto
  textInput: {
    width: 100,
    height: 34,
    fontSize: 14,
    fontFamily: fonts.text,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
    fontWeight: "bold",
    fontFamily: fonts.poppinsText,
    color: colors.darkGray,
  },
  //Área do lucro
  profitArea: {
    alignItems: "center",
    height: 65,
    justifyContent: "space-between",
  },
  //Área dos placeholders
  fakeInput: {
    width: 85,
    borderBottomWidth: 1.5,
  },
  //Placeholder do lucro
  fakeText: {
    fontSize: 14,
    color: colors.black,
    textAlign: "center",
    fontFamily: fonts.poppinsText,
    fontWeight: "bold",
    marginBottom: 2,
  },
  // Estilo dropdown --------------------------------
  dropDownPicker: {
    backgroundColor: colors.white,
    height: 45,
    borderWidth: 0,
    borderColor: colors.darkGray,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  //DropDown
  dropDown: {
    backgroundColor: colors.white,
    marginTop: 5,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 0,
    height: 160,
  },
  //Texto do item da lista
  listItemLabel: {
    color: colors.darkGray,
    fontSize: 15,
  },
  //Quando item for selecionado
  listSelectedItemContainer: {
    backgroundColor: "rgba(7, 7, 7, 0.04)",
  },
  // Quando item for selecionado(texto)
  listSelectedItemLabel: {
    color: colors.secondaryColor,
  },
});
