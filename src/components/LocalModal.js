// Importação Obrigatória
import React, { useState, useContext } from "react";
import {
  View,
  Modal,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

// Bibliotecas
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Axios from "axios";

// Importação de Componentes
import WaterIcon from "../assets/Water.png";
import EnergyIcon from "../assets/Energy.png";
import GasIcon from "../assets/Gas.png";
import BillIcon from "../assets/Bill.png";
import Checked from "../assets/Checked.png";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

//contextos
import CostChartContexts from "../contexts/CostChartContexts";
import MainChartContext from "../contexts/MainChartContexts";
import ImportantDataContext from "../contexts/ImportantDataContexts";
import DataAcessContexts from "../contexts/DataAcessContexts";
import StoreDataContexts from "../contexts/StoreDataContexts";
import ActivitesContexts from "../contexts/ActivitiesContexts";

export default function LocalModal({ onClose = () => {}, children }) {
  const [visible, setVisible] = useState(1);

  const [backgroundColor, setBackgroundColor] = useState(
    colors.secondarySubColor
  );
  const [type, setType] = useState();
  const [image, setImage] = useState("water");
  const [title, setTitle] = useState("Água");
  const [price, setPrice] = useState("");

  const { dispatch } = useContext(DataAcessContexts);
  const { data } = useContext(ImportantDataContext);
  const { dispatchC } = useContext(CostChartContexts);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { dispatchA } = useContext(ActivitesContexts);

  function handleHideChoose() {
    setVisible(0);
  }
  function handleHide() {
    setVisible(1);
  }
  function handleConclude() {
    setVisible(3);
  }

  const insertCost = async () => {
    if (price == "" || isNaN(price) == true) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou ter um valor inválido",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      let lastValue = 0;
      await Axios.get(data.IPV4 + `/localCosts/get?userId=${data.userId}`).then(
        (response) => {
          if (response.data != 0 && response != undefined) {
            response.data.map((val, key) => {
              if (val) {
                if (val.type == type) {
                  lastValue = val.value;
                }
              }
            });
          }
        }
      );

      await Axios.post(data.IPV4 + "/localCosts/insert", {
        title: `Conta de ${title}`,
        type: type,
        value: price,
        userAdmin: data.userId,
        oldValue: lastValue,
      })
        .then(async (response) => {
          const dataLength = Number(response.data.length) - 1;
          const LocalCostId = response.data[dataLength].id;
          await Axios.post(data.IPV4 + "/spent/insert", {
            spentType: "LOCALCOST",
            typeId: LocalCostId,
            value: price,
            userAdmin: data.userId,
          })
            .then((r) => {})
            .catch((re) => {
              console.log("Erro: " + re);
            });
          dispatch({ type: "FETCH_SUCCESS" });
          dispatchSD({
            type: "updateData",
          });
          dispatchC({
            type: "changeChart",
          });
          dispatchM({
            type: "changeChart",
          });
          dispatchA({
            type: "updateData",
          });
          handleConclude();
        })
        .catch((re) => {
          console.log("Erro: " + re);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {visible === 1 ? (
        <View style={styles.contentA}>
          <Text style={styles.modalContentText}> Adicionar</Text>
          <TouchableOpacity
            onPress={() => {
              setTitle("Água");
              setImage("water");
              setType("water");
              setBackgroundColor(colors.secondarySubColor);
              handleHideChoose();
            }}
          >
            <View
              style={[
                styles.itemButton,
                { backgroundColor: colors.secondarySubColor },
              ]}
            >
              <Text style={styles.itemText}>Água</Text>
              <View style={styles.itemIcon}>
                <View style={styles.iconBack} />
                <Image source={WaterIcon} style={styles.modalImage} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTitle("Luz");
              setImage("energy");
              setType("energy");
              setBackgroundColor(colors.primaryColor);
              handleHideChoose();
            }}
          >
            <View
              style={[
                styles.itemButton,
                { backgroundColor: colors.primaryColor },
              ]}
            >
              <Text style={styles.itemText}>Luz</Text>
              <View style={styles.itemIcon}>
                <View style={styles.iconBack} />
                <Image source={EnergyIcon} style={styles.modalImage} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTitle("Gás");
              setImage("gas");
              setType("gas");
              setBackgroundColor(colors.secondarySubColor);
              handleHideChoose();
            }}
          >
            <View
              style={[
                styles.itemButton,
                { backgroundColor: colors.secondarySubColor },
              ]}
            >
              <Text style={styles.itemText}>Gas</Text>
              <View style={styles.itemIcon}>
                <View style={styles.iconBack} />
                <Image source={GasIcon} style={styles.modalImage} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTitle("Aluguel");
              setImage("bill");
              setType("bill");
              setBackgroundColor(colors.primaryColor);
              handleHideChoose();
            }}
          >
            <View
              style={[
                styles.itemButton,
                { backgroundColor: colors.primaryColor },
              ]}
            >
              <Text style={styles.itemText}>Aluguel</Text>
              <View style={styles.itemIcon}>
                <View style={styles.iconBack} />
                <Image source={BillIcon} style={styles.modalImage} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : visible === 0 ? (
        <View style={styles.contentB}>
          <View style={styles.titleArea}>
            <Text style={styles.title}> Adicionar </Text>
          </View>
          <View style={[styles.header, { backgroundColor: backgroundColor }]}>
            {image === "water" ? (
              <Image source={WaterIcon} style={styles.image} />
            ) : image == "energy" ? (
              <Image source={EnergyIcon} style={styles.image} />
            ) : image == "gas" ? (
              <Image source={GasIcon} style={styles.image} />
            ) : image == "bill" ? (
              <Image source={BillIcon} style={styles.image} />
            ) : undefined}
            <Text style={styles.title}> {title} </Text>
          </View>
          <View style={styles.inputArea}>
            <Text style={styles.title}> Valor: </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(text) => setPrice(Number(text.replace(",", ".")))}
            />
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "rgba(217, 87, 87, 0.87)" },
              ]}
              onPress={() => handleHide()}
            >
              <Text style={styles.textButton}>Cancelar</Text>
              <MaterialIcons name="cancel" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "rgba(126, 217, 87, 0.87)" },
              ]}
              onPress={() => {
                insertCost();
              }}
            >
              <Text style={styles.textButton}> Salvar</Text>
              <Entypo name="check" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.contentC}>
          <Text style={styles.CheckedTitle}>Gasto Cadastrado!</Text>
          <Image source={Checked} style={styles.checkedPhoto} />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "rgba(126, 217, 87, 0.87)" },
            ]}
            onPress={() => onClose()}
          >
            <Text style={styles.textButton}> Voltar </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  //---- CONTEUDO A ------------

  // Primeiro espaço
  contentA: {
    flex: 1,
    height: 350,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  // Texto do modal
  modalContentText: {
    position: "absolute",
    left: 105,
    top: 10,

    fontFamily: fonts.text2,
    fontWeight: "bold",
    fontSize: 16,
  },
  // Botão dos itens
  itemButton: {
    height: 131,
    width: 121,
    borderRadius: 10,
    paddingTop: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  // Texto dos itens
  itemText: {
    fontFamily: fonts.text2,
    fontWeight: "bold",
    fontSize: 16,
  },
  // Icone dos itens
  itemIcon: {
    flex: 1,
    paddingTop: 15,
  },
  // Icone de voltar
  iconBack: {
    width: 47,
    height: 47,
    backgroundColor: colors.white,
    opacity: 0.5,
    borderRadius: 50,
  },
  // Imagem do modal
  modalImage: {
    height: 25,
    width: 25,
    position: "absolute",
    top: 25,
    left: 11,
  },

  //---- CONTEUDO B ------------

  // Segundo espaço
  contentB: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,

    marginHorizontal: 10,
  },
  // Área do título
  titleArea: {
    marginBottom: 10,
  },
  // Título
  title: {
    fontSize: 16,
    fontFamily: fonts.heading,
  },
  // Topo da tela
  header: {
    width: 131,
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  // Imagens
  image: {
    width: 30,
    height: 30,
  },
  // Área dos textos
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
    marginLeft: -30,
  },
  // Caixa de texto
  textInput: {
    width: 111,
    height: 34,
    fontFamily: fonts.text,
    fontSize: 16,
    color: colors.black,

    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    opacity: 0.5,
  },
  // Botões do modal
  modalButtons: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    justifyContent: "space-evenly",
  },
  // Botões
  button: {
    width: 130,
    height: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: "row",
  },
  // Texto dos botões
  textButton: {
    fontFamily: fonts.poppinsText,
    fontSize: 14,
    flexDirection: "row",
  },

  //---- CONTEUDO C ------------

  // Terceiro espaço
  contentC: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    marginHorizontal: 10,
    width: 250,
    height: 250,
  },
  // Título
  CheckedTitle: {
    fontFamily: fonts.text2,
    fontWeight: "bold",
    fontSize: 16,
  },
  // Foto
  checkedPhoto: {
    height: 100,
    width: 100,
  },
});
