///  keyboardType="email-address"

// Importação obrigatória
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

// Bibliotecas
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Importação de Componentes
import Header from "../components/Header";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";
import ImportantDataContext from "../contexts/ImportantDataContexts";
import UserDataContexts from "../contexts/UserDataContexts";

export default function UserPage() {
  const { data, dispatch } = useContext(ImportantDataContext);
  const { state, dispatchUD } = useContext(UserDataContexts);
  const navigation = useNavigation();

  const [name, setName] = useState(state.userData.name);
  const [companyName, setCompanyName] = useState(state.userData.companyName);

  function handleLogout() {
    AsyncStorage.clear();
    navigation.navigate("Login");
  }

  const [editPermition, setEditPermition] = useState(false);

  return (
    <>
      <Header title="Minha Conta" />

      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={colors.gray} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.inputView}>
            <Text style={styles.title}>Nome:</Text>
            <TextInput
              style={
                editPermition == false
                  ? styles.input
                  : [styles.input, { borderBottomColor: colors.primaryColor }]
              }
              onChangeText={(text) => {
                setName(text);
              }}
              placeholder=""
              defaultValue={state.userData.name}
              editable={editPermition}
            />

            <Text style={styles.title}>Empresa:</Text>
            <TextInput
              style={
                editPermition == false
                  ? styles.input
                  : [styles.input, { borderBottomColor: colors.primaryColor }]
              }
              onChangeText={(text) => {
                setCompanyName(text);
              }}
              placeholder=""
              defaultValue={state.userData.companyName}
              editable={editPermition}
            />

            <Text style={styles.title}>E-mail:</Text>
            <TextInput
              style={styles.input}
              defaultValue={state.userData.email}
              placeholder=""
              keyboardType="email-address"
              editable={false}
            />
          </View>
          {editPermition == false ? (
            <View>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => {
                  setEditPermition(!editPermition);
                }}
              >
                <MaterialCommunityIcons name="pencil" size={20} />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={[styles.buttonEdit, { backgroundColor: colors.green }]}
                onPress={() => {
                  if (name == "" || companyName == "") {
                    Alert.alert("Erro", "Nenhum campo deve estar vazio", [
                      { text: "OK", onPress: () => {} },
                    ]);
                  } else {
                    dispatchUD({
                      type: "updateData",
                      payload: {
                        name: name,
                        companyName: companyName,
                      },
                    });
                    setEditPermition(!editPermition);
                  }
                }}
              >
                <MaterialCommunityIcons name="check" size={20} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.LogOut}>
            <View style={styles.buttonArea}>
              <TouchableOpacity
                style={styles.containerLogin}
                onPress={() => {
                  handleLogout();
                }}
              >
                <Text style={styles.titleLogin}>SAIR</Text>
                <MaterialCommunityIcons name="logout" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Configuração da página
  container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 1,
    borderTopStartRadius: 23,
    borderTopEndRadius: 23,
  },
  // Área das caixas
  inputView: {
    marginLeft: 15,
    marginTop: 30,
  },
  // Título
  title: {
    fontFamily: fonts.text,
    color: colors.textGray,
    fontSize: RFValue(15),
  },
  // Caixa de texto
  input: {
    marginRight: 60,
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray,
    fontSize: RFValue(12),
  },
  // Botão de editar
  buttonEdit: {
    marginLeft: 10,
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: colors.secondaryColor,
    opacity: 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  // Area do botão de logout
  LogOut: {
    marginTop: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
  },
  // Area do Botão
  buttonArea: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 40,
  },
  // Botões
  button: {
    fontFamily: fonts.text,
  },
  //Campo do login
  containerLogin: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 49,
    width: "100%",
    backgroundColor: colors.primaryColor,
    opacity: 1,
    borderRadius: 20,
  },
  //Título do login
  titleLogin: {
    marginHorizontal: 10,
    fontWeight: "700",
    fontSize: RFValue(12),
  },
});
