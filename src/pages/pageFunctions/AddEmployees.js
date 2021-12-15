// Importação Obrigatória
import React, { useState, useContext } from "react";
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
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";

// Importação de Componentes
import PageTicket from "../../components/PageTicket";
import Header from "../../components/Header";

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { Ionicons } from "@expo/vector-icons";

// Contextos
import CostChartContexts from "../../contexts/CostChartContexts";
import MainChartContext from "../../contexts/MainChartContexts";
import StoreDataContexts from "../../contexts/StoreDataContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";

export default function AddEmployees() {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(DataAcessContexts);
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState();
  const [position, setPosition] = useState("");
  const [RG, setRG] = useState("");
  const [selectedOption, setSelectedOption] = useState("none");

  const { data } = useContext(ImportantDataContext);
  const { dispatchC } = useContext(CostChartContexts);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchSD } = useContext(StoreDataContexts);

  const insertEmployees = async () => {
    if (
      name == "" ||
      salary == "" ||
      position == "" ||
      RG == "" ||
      isNaN(salary) == true
    ) {
      Alert.alert(
        "Erro",
        "Nenhum campo deve estar vazio ou ter um valor inválido",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      await Axios.post(data.IPV4 + "/employees/insert", {
        name: name,
        wage: salary,
        position: position,
        rg: RG,
        userAdmin: data.userId,
        identificationType: selectedOption,
      })
        .then((response) => {
          dispatch({ type: "FETCH_SUCCESS" });
        })
        .catch((re) => {
          console.log("Erro: " + re);
        });
      dispatch({ type: "FETCH_FAILED" });

      dispatchM({
        type: "changeChart",
      });
      dispatchC({
        type: "changeChart",
      });
      dispatchSD({
        type: "updateData",
      });
      navigation.navigate("Confirmation", {
        type: "Insert",
        item: "Employee",
      });
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          zIndex: 1,
          borderTopStartRadius: 23,
          borderTopEndRadius: 23,
        }}
      >
        <Header title="Meus Funcionários" icon={true} navigate="AuthRoutes" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar translucent={true} backgroundColor={colors.gray} />

          <View style={styles.ticketTitleView}>
            <PageTicket
              title="Adicionar funcionário"
              color={colors.primaryColor}
              image="people"
            />
          </View>

          <View style={styles.employeeIdentificationView}>
            <View style={styles.employeeIdentificationOption}>
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
                <Ionicons name="person-outline" size={50} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.employeeIdentificationOption}>
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
                <Ionicons name="person-outline" size={50} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.employeeIdentificationOption}>
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
                <Ionicons name="person-outline" size={50} color="black" />
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
              <Text style={styles.text}>Salário: </Text>
              <TextInput
                style={styles.input}
                placeholder="Insira o salário"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setSalary(Number(text.replace(",", ".")))
                }
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Função: </Text>
              <TextInput
                style={styles.input}
                placeholder="Insira a função"
                onChangeText={(text) => setPosition(text)}
                maxLength={25}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>RG: </Text>
              <TextInput
                style={styles.input}
                placeholder="Insira o número do RG"
                keyboardType="numeric"
                onChangeText={(text) => setRG(Number(text))}
                maxLength={10}
              />
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  { backgroundColor: "rgba(126, 217, 87, 0.87)" },
                ]}
                onPress={insertEmployees}
              >
                <Text style={styles.textButton}>Salvar </Text>
                <Entypo name="check" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  //Area do Ticket da página
  ticketTitleView: {
    width: 220,
  },
  //Icone de identificação do funcionário
  employeeIdentificationView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginVertical: 15,
  },
  //Opções de identificação do funcionário
  employeeIdentificationOption: {
    height: 100,
    marginHorizontal: 15,
  },
  //Area das opções
  identificationOption: {
    height: 85,
    width: 85,
    opacity: 0.7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  //Quando selecionada uma opção
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
  //texto do botõa
  textButton: {
    color: colors.white,
    fontSize: 25,
  },
  //espaço inferior
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
