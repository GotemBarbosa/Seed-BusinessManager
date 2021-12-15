// Importação Obrigatória
import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";

// Bibliotecas
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Axios from "axios";

// Importação de Componentes
//import InputQuickSale from "../../components/InputQuickSale";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

// Contextos
import MainChartContext from "../../contexts/MainChartContexts";
import ProfitChartContext from "../../contexts/ProfitChartContexts";
import StoreDataContexts from "../../contexts/StoreDataContexts";
import ActivitesContexts from "../../contexts/ActivitiesContexts";

export default function QuickSale() {
  const [modalConfirmationVisible, setModalConfirmationVisible] =
    useState(false);

  const { state, dispatch } = useContext(DataAcessContexts);
  const { data } = useContext(ImportantDataContext);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchP } = useContext(ProfitChartContext);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { dispatchA } = useContext(ActivitesContexts);

  const [value, setValue] = useState("");

  async function handleInsert() {
    if (value == "" || isNaN(value) == true) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou ter um valor inválido",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      await Axios.post(data.IPV4 + "/sales/insert", {
        productId: 0,
        value: value,
        unitaryValue: 0,
        quantity: 0,
        userAdmin: data.userId,
      })
        .then((response) => {
          dispatch({ type: "FETCH_SUCCESS" });
        })
        .catch((re) => {
          console.log("Erro: " + re);
        });

      dispatchM({
        type: "changeChart",
      });

      dispatchP({
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

  return (
    <View style={styles.container}>
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

      <View style={styles.inputContainer}>
        <View style={styles.content}>
          <View style={styles.topArea} />

          <View style={styles.centralText}>
            <Text style={styles.text}>Venda rápida</Text>
          </View>

          <View style={styles.textArea}>
            <Text style={styles.text}>Valor:</Text>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="0"
            keyboardType="number-pad"
            onChangeText={(text) => setValue(Number(text.replace(",", ".")))}
          />

          <View style={styles.buttonArea}>
            {/* <TouchableOpacity style={styles.buttonSale} onPress={InsertSale}> */}
            <TouchableOpacity style={styles.buttonSale} onPress={handleInsert}>
              <Text style={styles.textSale}> VENDER </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  //Configuração da página
  container: {
    flex: 1,
    paddingBottom: 20,
    marginTop: 20,
  },
  //Modal
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
  // Conteúdo do modal
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
  // Texto de confimação
  modalTextConfirmation: {
    fontSize: 28,
    fontFamily: fonts.text2,
    color: colors.darkGray,
  },
  // Botão do modal
  modalButton: {
    backgroundColor: colors.limeGreen,
    width: "80%",
    height: 50,
    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",
  },
  // Texto do botão
  modalButtonText: {
    fontFamily: fonts.poppinsText,
    color: colors.white,
    fontSize: 24,
  },
  //Área dos botões
  buttonArea: {
    marginTop: -3,
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

  // InputQuickSale

  //Configuração da página
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  //Conteúdo da página
  content: {
    backgroundColor: colors.ice,
    width: "93%",
    height: 165,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    elevation: 4,
  },
  //Área de topo da página
  topArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  //Texto centralizado
  centralText: {
    width: "100%",
    alignItems: "center",
  },
  //Estilo dos textos
  text: {
    fontSize: 18,
    fontFamily: fonts.heading,
  },
  //Área de texto
  textArea: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  //Caixa de texto
  textInput: {
    width: 100,
    height: 34,
    fontSize: 14,
    fontFamily: fonts.text,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
    marginLeft: 10,
  },
});
