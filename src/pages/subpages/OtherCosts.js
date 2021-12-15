//Importação obrigatória
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  Alert,
} from "react-native";

//Biblioteca
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";
import LottieView from "lottie-react-native";

//Importação de componentes
import OtherCost from "../../components/OtherCost";
import ButtonEdit from "../../components/ButtonEdit";

import StoreDataContexts from "../../contexts/StoreDataContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";

//Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

//Contextos
import MainChartContext from "../../contexts/MainChartContexts";
import CostChartContexts from "../../contexts/CostChartContexts";
import ActivitesContexts from "../../contexts/ActivitiesContexts";

export default function OtherCosts() {
  const navigation = useNavigation();

  const { state, dispatch } = useContext(DataAcessContexts);
  const { data } = useContext(ImportantDataContext);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchC } = useContext(CostChartContexts);
  const { dispatchA } = useContext(ActivitesContexts);

  const [id, setId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [otherCosts, setOtherCosts] = useState();

  const [otherCostId, setOtherCostId] = useState();
  const [otherCostName, setOtherCostNameName] = useState();
  const [otherCostValue, setOtherCostValue] = useState();
  const [newOtherCostValue, setNewOtherCostValue] = useState();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changeAvailable, setChangeAvailable] = useState(false);

  useEffect(() => {
    if (changeAvailable == true) {
      dispatch({
        type: "deleteOtherCost",
        payload: {
          otherCostId: id,
        },
      });
      Axios.delete(
        data.IPV4 + `/othercosts/delete?id=${id}&userId=${data.userId}`
      ).then((response) => {
        setOtherCosts(response.data);
      });
      dispatchSD({
        type: "updateData",
      });
      setChangeAvailable(false);
    }
  }, [changeAvailable]);

  useEffect(() => {
    if (state.loading === true) {
      Axios.get(data.IPV4 + `/othercosts/get?userId=${data.userId}`).then(
        (response) => {
          setOtherCosts(response.data);
          setIsLoading(true);
        }
      );
      dispatch({ type: "FETCH_COMPLETED" });
    }
  }, [state]);

  useEffect(() => {
    Axios.get(data.IPV4 + `/othercosts/get?userId=${data.userId}`).then(
      (response) => {
        setOtherCosts(response.data);
        setIsLoading(true);
      }
    );
  }, []);

  const handleRemove = () => {
    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja apagar este gasto de seus registros?",
      [
        {
          text: "Sim",
          onPress: () => {
            setChangeAvailable(true);
          },
        },
        { text: "Não", onPress: () => {} },
      ]
    );
  };

  function handleUpdate(id, name, value) {
    navigation.navigate("UpdateOtherCosts", {
      id: id,
      name: name,
      value: value,
    });
  }
  async function handleAddCost() {
    if (newOtherCostValue == "" || newOtherCostValue <= 0) {
      Alert.alert("Erro", "Nenhum campo deve estar vazio", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      await Axios.post(data.IPV4 + "/spent/insert", {
        spentType: "OTHERCOST",
        typeId: otherCostId,
        value: newOtherCostValue,
        userAdmin: data.userId,
      })
        .then((r) => {})
        .catch((re) => {
          console.warn("Erro: " + re);
        });
      dispatchSD({
        type: "updateData",
      });
      dispatchM({
        type: "changeChart",
      });
      dispatchC({
        type: "changeChart",
      });
      dispatchA({
        type: "updateData",
      });
      setModalVisible(false);
    }
  }
  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
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
            style={{ height: 300, width: 200 }}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <View style={styles.modalTitleArea}>
                  <Text style={styles.modalTitleText}>Adicionar despesa: </Text>
                  <Text style={styles.modalOtherCostsNameText}>
                    {otherCostName}
                  </Text>
                </View>
                <View style={styles.modalConfirmation}>
                  <View style={styles.modalConfirmationContent}>
                    {/* Imagem */}
                    <Text style={styles.modalConfirmationText}>
                      Confirmar registro de pagamento
                    </Text>
                  </View>
                  <TextInput
                    style={styles.modalTextInput}
                    defaultValue={String(otherCostValue)}
                    onChangeText={(text) => {
                      setNewOtherCostValue(Number(text.replace(",", ".")));
                    }}
                  />
                  <View style={styles.modalButtonsArea}>
                    <TouchableOpacity
                      style={[
                        styles.actButton,
                        { backgroundColor: "rgba(217, 87, 87, 0.87)" },
                      ]}
                      onPress={() => {
                        setModalVisible(false);
                      }}
                    >
                      <Text>Fechar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.actButton,
                        { backgroundColor: "rgba(126, 217, 87, 0.87)" },
                      ]}
                      onPress={() => {
                        handleAddCost();
                      }}
                    >
                      <Text>Adicionar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View
          style={
            isLoading == false
              ? styles.OtherCostsArea
              : { flex: 1, width: "100%" }
          }
        >
          {isLoading === false ? (
            /* Aqui vem o que vai acontecer se estiver carregando*/
            <LottieView
              style={{ width: 100, height: 100 }}
              source={require("../../assets/lottie/loading.json")}
              autoPlay
            />
          ) : (
            //Caso tenha itens

            <View style={styles.OtherCostsList}>
              {otherCosts
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
                  return (
                    <View style={{ flexDirection: "column" }}>
                      <Swipeable
                        key={key}
                        overshootRight={false}
                        renderRightActions={() => (
                          <Animated.View>
                            <View>
                              <RectButton
                                style={styles.buttonRemove}
                                onPress={() => {
                                  setId(val.id);
                                  handleRemove();
                                }}
                              >
                                <Feather
                                  name={"trash"}
                                  size={32}
                                  color={colors.white}
                                />
                              </RectButton>
                            </View>
                          </Animated.View>
                        )}
                      >
                        <OtherCost
                          /* image={} */
                          key={key}
                          name={val.name}
                          value={val.value}
                          userAdmin={val.userAdmin}
                          date={val.additionDate}
                        />

                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => {
                            setId(val.id);
                            handleUpdate(val.id, val.name, val.value);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="pencil"
                            size={29}
                            color={colors.black}
                          />
                        </TouchableOpacity>
                      </Swipeable>

                      <TouchableOpacity
                        onPress={() => {
                          setOtherCostId(val.id);
                          setOtherCostNameName(val.name);
                          setOtherCostValue(val.value);
                          setNewOtherCostValue(val.value);
                          setModalVisible(true);
                        }}
                        style={styles.addSpentButton}
                      >
                        <Text style={styles.addSpentButtonText}>
                          Adic. Gasto
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              <View style={styles.listSpace} />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.pageFunctions}>
        <ButtonEdit name="plus" size={24} onPress="AddOthersCosts" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  // Configuração da página
  container: {
    flex: 1,
    paddingBottom: 15,
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
    height: 200,
    width: 350,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
    elevation: 8,
  },
  // Área do titulo do modal
  modalTitleArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Título
  modalTitleText: {
    fontFamily: fonts.text2,
    fontSize: 20,
    paddingRight: 10,
  },
  // Outros custos
  modalOtherCostsNameText: {
    fontFamily: fonts.text3,
    fontSize: 18,
  },
  // Modal de confirmação
  modalConfirmation: {
    marginTop: 40,
    alignItems: "center",
  },
  // Conteúdo da confirmação
  modalConfirmationContent: {
    flexDirection: "row",
  },
  // Texto de confirmação
  modalConfirmationText: {
    fontFamily: fonts.heading,
    fontSize: 15,
  },
  // Caixa de texto
  modalTextInput: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: colors.darkGray,
    backgroundColor: colors.ice,
    borderRadius: 8,
    width: "50%",
    height: 40,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  // Área de botões
  modalButtonsArea: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-evenly",
  },
  // Botões de ação
  actButton: {
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  //Área dos outros custos
  OtherCostsArea: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  //Tela que aparece caso não tenha itens registrados
  noOtherCostsData: {
    color: colors.textGray,
  },
  //Lista dos outros custos
  OtherCostsList: {
    width: "100%",
  },
  //espaço após a lista
  listSpace: {
    height: 70,
  },
  //Botão de adicionar
  pageFunctions: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
  // Botão de adicionar custo
  addSpentButton: {
    paddingHorizontal: 10,
    marginLeft: 40,
    height: 30,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ice,
    borderWidth: 0.9,
    borderColor: colors.lightGray,
    borderRadius: 8,
    marginBottom: -15,
  },
  // Texto do botão de adicionar gasto
  addSpentButtonText: {
    fontFamily: fonts.poppinsText,
    color: colors.darkGray,
  },
  //Botão de editar
  editButton: {
    width: 65,
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 40,
    right: 10,
  },
  //Botão de deletar
  buttonRemove: {
    width: 100,
    height: 80,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 5,
    right: 15,
  },
});
