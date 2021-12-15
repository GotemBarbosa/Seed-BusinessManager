// Importação Obrigatória
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
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
import { RFValue } from "react-native-responsive-fontsize";

// Importação de Componentes
import Employee from "../../components/Employee";
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

export default function Employees() {
  const navigation = useNavigation();

  const [id, setId] = useState();

  const [employees, setEmployees] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [changeAvailable, setChangeAvailable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDataVisible, setModalDataVisible] = useState(false);
  const [value, setValue] = useState("");

  const [employeeId, setEmployeeId] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [employeeWage, setEmployeeWage] = useState();
  const [employeeFunction, setEmployeeFunction] = useState();
  const [employeeRG, setEmployeeRG] = useState();
  const [employeeDate, setEmployeeDate] = useState();
  const [newEmployeeWage, setNewEmployeeWage] = useState();

  const { data } = useContext(ImportantDataContext);
  const { state, dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchC } = useContext(CostChartContexts);
  const { dispatchA } = useContext(ActivitesContexts);

  useEffect(() => {
    if (changeAvailable == true) {
      Axios.delete(
        data.IPV4 + `/employees/delete?id=${id}&userId=${data.userId}`
      ).then((response) => setEmployees(response.data));
      dispatchSD({
        type: "updateData",
      });
      setChangeAvailable(false);
    }
  }, [changeAvailable]);

  const handleRemove = () => {
    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja apagar este funcionário de seus funcionários cadastrados?",
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

  useEffect(() => {
    if (state.loading === true) {
      Axios.get(data.IPV4 + `/employees/get?userId=${data.userId}`, {
        userId: data.userId,
      }).then((response) => {
        setEmployees(response.data);
        setIsLoading(true);
      });
      dispatch({ type: "FETCH_COMPLETED" });
    }
  }, [state]);

  useEffect(() => {
    Axios.get(data.IPV4 + `/employees/get?userId=${data.userId}`, {
      userId: data.userId,
    }).then((response) => {
      setEmployees(response.data);
      setIsLoading(true);
    });
  }, []);

  function handleUpdate(id, name, wage, position, rg, identificationType) {
    navigation.navigate("UpdateEmployees", {
      id: id,
      name: name,
      wage: wage,
      position: position,
      rg: rg,
      identificationType: identificationType,
    });
  }
  async function handleAddCost() {
    if (newEmployeeWage == "" || newEmployeeWage <= 0) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou com valores inválidos",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      await Axios.post(data.IPV4 + "/spent/insert", {
        spentType: "EMPLOYEE",
        typeId: employeeId,
        value: newEmployeeWage,
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
                  <Text style={styles.modalTitleText}>Pagar salário: </Text>
                  <Text style={styles.modalEmployeeNameText}>
                    {employeeName}
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
                    defaultValue={String(employeeWage)}
                    onChangeText={(text) => {
                      setNewEmployeeWage(Number(text.replace(",", ".")));
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
        {/* Modal ao clicar */}
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalDataVisible}
            style={{ height: 300, width: 200 }}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalDataContent}>
                <View style={styles.modalDataItem}>
                  <Text style={styles.itemTitle}>Nome:</Text>
                  <Text style={styles.itemValue}>{employeeName}</Text>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.itemTitle}>Salário:</Text>
                  <Text style={styles.itemValue}> R$ {employeeWage}</Text>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.itemTitle}>Função:</Text>
                  <Text style={styles.itemValue}>{employeeFunction}</Text>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.itemTitle}>Ingressou:</Text>
                  <Text style={styles.itemValue}>{employeeDate}</Text>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.itemTitle}>RG:</Text>
                  <Text style={styles.itemValue}>{employeeRG+""}</Text>
                </View>
                <TouchableOpacity
                  style={styles.modalDataCloseButton}
                  onPress={() => {
                    setModalDataVisible(false);
                  }}
                >
                  <Text>Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View
          style={
            isLoading == false
              ? styles.EmployeeArea
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

            <View style={styles.EmployeeList}>
              {employees
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
                        <TouchableOpacity
                          onPress={() => {
                            setModalDataVisible(true);
                            setEmployeeName(val.name);
                            setEmployeeWage(val.value);
                            setEmployeeFunction(val.position);
                            const date = new Date(val.additionDate);
                            setEmployeeDate(
                              `${date.getDate()} / ${
                                date.getMonth() + 1
                              } / ${date.getFullYear()}`
                            );
                            setEmployeeRG(val.rg);
                          }}
                        >
                          <Employee
                            /* image={} */
                            key={key}
                            name={val.name}
                            salary={val.value}
                            identification={val.identificationType}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => {
                            setId(val.id);
                            handleUpdate(
                              val.id,
                              val.name,
                              val.value,
                              val.position,
                              val.rg,
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
                          setEmployeeId(val.id);
                          setEmployeeName(val.name);
                          setEmployeeWage(val.value);
                          setNewEmployeeWage(val.value);
                          setModalVisible(true);
                        }}
                        style={styles.addSalaryButton}
                      >
                        <Text style={styles.addSalaryButtonText}>Pagar</Text>
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
        <ButtonEdit name="plus" size={24} onPress="AddEmployees" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  //Configuração da página
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
  // Título do modal
  modalTitleText: {
    fontFamily: fonts.text2,
    fontSize: RFValue(17),
    paddingRight: 10,
  },
  // Nome do funcionário
  modalEmployeeNameText: {
    fontFamily: fonts.text3,
    fontSize: RFValue(16),
  },
  // Confirmação
  modalConfirmation: {
    marginTop: 25,
    alignItems: "center",
  },
  // Conteúdo de confimação
  modalConfirmationContent: {
    flexDirection: "row",
  },
  // Texto de confirmação
  modalConfirmationText: {
    fontFamily: fonts.heading,
    fontSize: RFValue(13),
  },
  // Caixa de texto do modal
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
  // Área dos botões
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
  //Conteudo dos modais
  modalDataContent: {
    height: "40%",
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    elevation: 8,
  },
  //item dos dados dos modais
  modalDataItem: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  //Título do item
  itemTitle: {
    fontWeight: "700",
    fontSize: RFValue(15),
    marginRight: 10,
  },
  //Valor do item
  itemValue: {
    fontFamily: fonts.poppinsText,
    fontSize: RFValue(14),
    marginTop: 5,
    color: colors.textGray,
  },
  //Botão de fechar
  modalDataCloseButton: {
    position: "absolute",
    bottom: 15,
    left: "9%",

    height: 40,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: colors.primaryColor,
  },
  //Area que aparecerá os funcionários
  EmployeeArea: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  //Quando não há funcionários
  noEmployeData: {
    color: colors.textGray,
  },
  //Lista de funcionários
  EmployeeList: {
    width: "100%",
    marginBottom: 20,
  },
  //espaço após a lista
  listSpace: {
    height: 50,
  },
  //Funcionalidades
  pageFunctions: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
  //Botão de adicionar saláro
  addSalaryButton: {
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
  //Texto do botão de adicionar salário
  addSalaryButtonText: {
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
  //Botão de deletar
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
    paddingLeft: 25,
  },
});
