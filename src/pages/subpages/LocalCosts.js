// Importação Obrigatória
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Alert,
} from "react-native";

// Bibliotecas
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";
import LottieView from "lottie-react-native";

// Importação de Componentes
import PageTicket from "../../components/PageTicket";
import LocalModal from "../../components/LocalModal";
import LocalCost from "../../components/LocalCost";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import StoreDataContexts from "../../contexts/StoreDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";

export default function LocalCosts() {
  const navigation = useNavigation();

  const [id, setId] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [localCosts, setLocalCosts] = useState([{}]);
  const [changeAvailable, setChangeAvailable] = useState(false);

  const { data } = useContext(ImportantDataContext);
  const { state, dispatch } = useContext(DataAcessContexts);
  const { dispatchSD } = useContext(StoreDataContexts);
  useEffect(() => {
    Axios.get(data.IPV4 + `/localcosts/get?userId=${data.userId}`).then(
      (response) => {
        setIsLoading(true);
        setLocalCosts(response.data);
      }
    );
  }, []);

  useEffect(() => {
    if (changeAvailable == true) {
      Axios.delete(
        data.IPV4 + `/localcosts/delete?id=${id}&userId=${data.userId}`
      ).then((response) => setLocalCosts(response.data));
      dispatchSD({
        type: "updateData",
      });
      setChangeAvailable(false);
    }
  }, [changeAvailable]);

  useEffect(() => {
    if (state.loading === true) {
      Axios.get(data.IPV4 + `/localcosts/get?userId=${data.userId}`).then(
        async (response) => {
          await setLocalCosts(response.data);
          setIsLoading(true);
        }
      );
      dispatch({ type: "FETCH_COMPLETED" });
    }
  }, [state]);

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

  function handleUpdate(id, title, type, price) {
    navigation.navigate("UpdateLocalCosts", {
      id: id,
      title: title,
      type: type,
      value: price,
    });
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.textArea}>
          <Text style={styles.title}> Calculo dos custos locais</Text>
        </View>
        <View style={styles.descriptionArea}>
          <Text style={styles.description}>
            Nesta página haverá gastos relacionados ao{" "}
            <Text style={[styles.text, { color: colors.secondarySubColor }]}>
              seu ambiente de trabalho{" "}
            </Text>
            como contas de água, luz, gás, etc...
          </Text>
        </View>
        <View style={styles.ticketTitleView}>
          <PageTicket color={colors.primaryColor} image="house" title="Local" />
        </View>
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
              <View style={styles.centeredView}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.ModalReturnButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <AntDesign
                      name="arrowleft"
                      size={24}
                      color={colors.primaryColor}
                    />
                  </TouchableOpacity>
                  <LocalModal
                    onClose={() => {
                      setModalVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={
            isLoading == false
              ? styles.localCostsArea
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
            <View style={styles.localCostList}>
              {localCosts.map((val, key) => {
                return (
                  <View key={key}>
                    <Swipeable
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
                      <LocalCost
                        key={key}
                        title={val.title}
                        type={val.type}
                        value={val.value}
                        date={val.additionDate}
                        oldValue={val.oldValue}
                      />
                      <View style={{}} />
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                          setId(val.id);
                          handleUpdate(val.id, val.title, val.type, val.value);
                        }}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={29}
                          color={colors.black}
                        />
                      </TouchableOpacity>
                    </Swipeable>
                  </View>
                );
              })}
              <View style={styles.listSpace} />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.pageFunctions}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <MaterialCommunityIcons name="plus" size={24} />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  // Espaço
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  // Área do texto
  textArea: {
    justifyContent: "center",
    alignItems: "center",
  },
  // Título
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    justifyContent: "center",
  },
  // Área da desrição
  descriptionArea: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  // Descrição
  description: {
    fontSize: 12,
    fontFamily: fonts.poppinsText,
    textAlign: "justify",
  },
  // Área do título
  ticketTitleView: {
    width: 120,
  },
  // Área dos itens
  localCostsArea: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  // Mensagem para página vazia
  noLocalCostData: {
    color: colors.textGray,
  },
  // Área das funções
  pageFunctions: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
  // Botão de adicionar
  plusButton: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 360,
    backgroundColor: colors.secondaryColor,
    opacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
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

  //modal ------------------------

  //Área da mini tela
  centeredView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 22,
  },
  // Fundo da mini tela
  modalBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  // Espaço da mini tela
  modalContent: {
    width: 285,
    borderRadius: 20,
    backgroundColor: colors.white,
    elevation: 8,
    borderRadius: 10,

    flexWrap: "wrap",
  },
  // Botão de voltar da mini tela
  ModalReturnButton: {
    position: "absolute",
    left: 15,
    top: 10,
  },
  // Lista dos itens
  LocalCostList: {
    width: "100%",
    marginBottom: 20,
  },
  //espaço após a lista
  listSpace: {
    height: 70,
  },
});
