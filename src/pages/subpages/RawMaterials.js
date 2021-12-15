// Importação obrigatória
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Alert,
} from "react-native";

// Bibliotecas
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";
import LottieView from "lottie-react-native";

// Importação de componentes
import RawMaterial from "../../components/RawMaterial";
import ButtonEdit from "../../components/ButtonEdit";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

// Contextos
import StoreDataContexts from "../../contexts/StoreDataContexts";
import MainChartContext from "../../contexts/MainChartContexts";
import CostChartContexts from "../../contexts/CostChartContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";
import ActivitesContexts from "../../contexts/ActivitiesContexts";

export default function RawMaterials() {
  const navigation = useNavigation();

  const [id, setId] = useState();
  const [rawMaterials, setRawMaterials] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [changeAvailable, setChangeAvailable] = useState(false);

  const [rawMaterialId, setRawMateiralId] = useState();
  const [rawMaterialName, setRawMaterialName] = useState();
  const [rawMaterialValue, setRawMaterialValue] = useState();
  const [newRawMaterialValue, setNewRawMaterialValue] = useState();

  const { data } = useContext(ImportantDataContext);
  const { state, dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchC } = useContext(CostChartContexts);
  const { dispatchA } = useContext(ActivitesContexts);

  useEffect(() => {
    if (changeAvailable == true) {
      Axios.delete(
        data.IPV4 + `/rawmaterials/delete?id=${id}&userId=${data.userId}`
      ).then((response) => setRawMaterials(response.data));
      dispatchSD({
        type: "updateData",
      });
      setChangeAvailable(false);
    }
  }, [changeAvailable]);

  useEffect(() => {
    if (state.loading === true) {
      Axios.get(data.IPV4 + `/rawmaterials/get?userId=${data.userId}`).then(
        (response) => {
          setRawMaterials(response.data);
          setIsLoading(true);
        }
      );
      dispatch({ type: "FETCH_COMPLETED" });
    }
  }, [state]);

  useEffect(() => {
    Axios.get(data.IPV4 + `/rawmaterials/get?userId=${data.userId}`).then(
      (response) => {
        setRawMaterials(response.data);
        setIsLoading(true);
      }
    );
  }, []);

  const handleRemove = () => {
    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja apagar este item de suas matérias primas cadastradas?",
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

  function handleUpdate(id, name, price, quantity, identificationType) {
    navigation.navigate("UpdateRawMaterials", {
      id: id,
      name: name,
      cost: price,
      quantity: quantity,
      identificationType: identificationType,
    });
  }
  async function handleAddCost() {
    if (newRawMaterialValue == "" || newRawMaterialValue <= 0) {
      Alert.alert("Erro", "Nenhum campo deve estar vazio", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      await Axios.post(data.IPV4 + "/spent/insert", {
        spentType: "RAWMATERIAL",
        typeId: rawMaterialId,
        value: newRawMaterialValue,
        userAdmin: data.userId,
      })
        .then((r) => {})
        .catch((re) => {
          console.log("Erro: " + re);
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
                  <Text style={styles.modalMaterialsNameText}>
                    {rawMaterialName}
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
                    defaultValue={String(rawMaterialValue)}
                    onChangeText={(text) => {
                      setNewRawMaterialValue(Number(text.replace(",", ".")));
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
              ? styles.RawMaterialsArea
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

            <View style={styles.RawMaterialsList}>
              {rawMaterials
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
                        <RawMaterial
                          /* image={} */
                          key={key}
                          name={val.name}
                          value={val.value}
                          quantity={val.quantity}
                          date={val.additionDate}
                          identification={val.identificationType}
                        />

                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => {
                            setId(val.id);
                            handleUpdate(
                              val.id,
                              val.name,
                              val.value,
                              val.quantity,
                              val.identificationType
                            );
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
                          setRawMateiralId(val.id);
                          setRawMaterialName(val.name);
                          setRawMaterialValue(val.value);
                          setNewRawMaterialValue(val.value);
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
        <ButtonEdit name="plus" size={24} onPress="AddRawMaterials" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  //Configuração da página
  container: {
    flex: 1,
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
  // Área do título do modal
  modalTitleArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Texto do título
  modalTitleText: {
    fontFamily: fonts.text2,
    fontSize: 20,
    paddingRight: 10,
  },
  // Nome
  modalMaterialsNameText: {
    fontFamily: fonts.text3,
    fontSize: 18,
  },
  // Confirmação
  modalConfirmation: {
    marginTop: 40,
    alignItems: "center",
  },
  // Conteúdo de confirmação
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
  // Áreas dos botões
  modalButtonsArea: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-evenly",
  },
  // Botões de ações
  actButton: {
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  //Área das matérias primas
  RawMaterialsArea: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  //Tela que aparece caso não tenham materias registradas
  noRawMaterialsData: {
    color: colors.textGray,
  },
  //Lista das matérias primas
  RawMaterialsList: {
    width: "100%",
    marginBottom: 15,
  },
  //espaço após a lista
  listSpace: {
    height: 50,
  },
  //Botão de adicionar
  pageFunctions: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
  //\Botão de adicionar gasto
  addSpentButton: {
    paddingHorizontal: 10,
    marginLeft: 90,
    height: 35,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ice,
    borderWidth: 0.9,
    borderColor: colors.lightGray,
    borderRadius: 8,
  },
  //Texto do botão
  addSpentButtonText: {
    fontFamily: fonts.poppinsText,
    color: colors.darkGray,
    //fontWeight: '700',
  },
  //Botão de editar
  editButton: {
    width: 65,
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 30,
    right: 10,
  },
  //Deletar
  buttonRemove: {
    width: 100,
    height: 60,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 5,
    right: 15,
  },
});
