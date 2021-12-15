//Importação Obrigatória
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";

//Biblioteca
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Componentes
import backgroundPhoto from "../assets/BackgroundImg.png";
import logo from "../../assets/icon.png";

//Configuração
import colors from "../styles/colors";
import fonts from "../styles/fonts";

//Contextos
import ImportantDataContext from "../contexts/ImportantDataContexts";

export default function Login() {
  const { data, dispatch } = useContext(ImportantDataContext);

  const [passShow, setPassShow] = useState(true);
  const [eye, setEye] = useState("eye-off-sharp");
  const [loginStatus, setLoginStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    Axios.get(data.IPV4 + `/testConnection`).then((response) => {
      if (response.data == "connected") {
        if (email == "" || password == "") {
          Alert.alert(
            "ATENÇÃO!",
            "Nenhum campo deve estar vazio, por favor coloque valores válidos. ",
            [{ text: "OK", onPress: () => {} }]
          );
        } else {
          Axios.post(data.IPV4 + "/login", {
            email: email,
            password: password,
          }).then(async (response) => {
            if (response.data.message) {
              setLoginStatus(response.data.message);
              Alert.alert("ATENÇÃO!", loginStatus, [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
              AsyncStorage.clear();
            } else {
              let loginData = {
                id: response.data[0][0].id,
                email: response.data[0][0].email,
                password: response.data[1].passwordDesc,
              };

              try {
                await AsyncStorage.setItem(
                  "@seedMe_userLogin",
                  JSON.stringify(loginData)
                );
              } catch (err) {
                console.log(err);
              }

              dispatch({
                type: "addUser",
                payload: {
                  userId: response.data[0][0].id,
                },
              });
              //"Passou"
              navigation.replace("AuthRoutes");
            }
          });
        }
      } else {
        Alert.alert(
          "FALHA NA CONEXÃO!",
          "Erro ao conectar com o servidor! verifique sua conexão de rede ou tente novamente mais tarde!",
          [{ text: "OK", onPress: () => {} }]
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundPhoto} style={styles.imageBackground}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
              colors={[colors.primaryColor, colors.ice, colors.primaryColor]}
              style={styles.content}
            >
              <Image source={logo} style={styles.logo} />

              <View style={styles.inputArea}>
                <Text style={styles.text}> Junte-se a nós! </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu email..."
                  keyboardType="email-address"
                  onChangeText={(text) => setEmail(text)}
                />
                <View style={styles.inputView}>
                  <TextInput
                    secureTextEntry={passShow}
                    style={styles.inputPass}
                    placeholder="Digite sua senha..."
                    onChangeText={(text) => setPassword(text)}
                  />
                  <Ionicons
                    name={eye}
                    style={styles.passEye}
                    onPress={() => {
                      setPassShow(!passShow);
                      eye == "eye-off-sharp"
                        ? setEye("eye-sharp")
                        : setEye("eye-off-sharp");
                    }}
                  />
                </View>
              </View>

              <View style={styles.buttonArea}>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={[
                      styles.containerLogin,
                      { backgroundColor: colors.secondaryColor },
                    ]}
                    onPress={() => {
                      handleLogin();
                    }}
                  >
                    <Text style={styles.titleLogin}>Entrar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={[
                      styles.containerLogin,
                      { backgroundColor: colors.secondaryColor },
                    ]}
                    onPress={() => {
                      navigation.navigate("Register");
                    }}
                  >
                    <Text style={styles.titleLogin}>
                      {" "}
                      Não tem uma conta? Crie-a aqui!
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  //Espaço da página
  container: {
    flex: 1,
  },
  //Plano de fundo
  imageBackground: {
    height: Dimensions.get("window").height * 1.002,
    width: Dimensions.get("window").width,
  },
  //configuração do conteudo da tela
  content: {
    marginVertical: 10,
    marginHorizontal: 7,
    paddingHorizontal: 25,
    paddingVertical: 2,
    height: Dimensions.get("window").height * 0.94,
    borderRadius: 17,
    opacity: 0.75,
    elevation: 5,
    alignItems: "center",

    justifyContent: "space-evenly",
  },
  //logo do app
  logo: {
    height: Dimensions.get("window").height * 0.14,
    width: Dimensions.get("window").height * 0.14,
  },
  //formulario
  inputArea: {
    width: "100%",
    height: 180,
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },
  //Campo de texto
  input: {
    color: colors.darkGray,
    width: "100%",
    fontSize: 18,
    padding: 10,
    textAlign: "left",
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  //configuração de cada input
  inputView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  // Caixa de senha
  inputPass: {
    color: colors.darkGray,
    width: "90%",
    fontSize: 18,
    padding: 10,
    textAlign: "left",
  },
  // Botão para ver senha
  passEye: {
    paddingVertical: 10,
    fontSize: 20,
  },
  //seleção de botão
  buttonArea: {
    width: "100%",
    alignItems: "center",
    height: 180,
    justifyContent: "space-around",
  },
  buttonView: {
    width: "100%",
  },
  //texto do login alternativo
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.text,
  },
  //BUTTON CONFIRMATION
  //Configuração do componente
  containerLogin: {
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: "100%",
    backgroundColor: colors.secondaryColor,
    opacity: 1,
    borderRadius: 20,
  },
  //Texto do título
  titleLogin: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts.text,
    fontWeight: "700",
  },
});
