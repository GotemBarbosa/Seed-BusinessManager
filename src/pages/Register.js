// Importação obrigatória
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";

// Bibliotecas
import Axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";

// Componentes
import backgroundPhoto from "../assets/BackgroundImg.png";
import logo from "../../assets/adaptive-icon.png";
import ImportantDataContext from "../contexts/ImportantDataContexts";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Register() {
  const { data } = useContext(ImportantDataContext);
  const navigation = useNavigation();

  const [passShow, setPassShow] = useState(true);
  const [confirmShow, setConfirmShow] = useState(true);

  const [eye, setEye] = useState("eye-off-sharp");
  const [confirmEye, setConfirmEye] = useState("eye-off-sharp");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = () => {
    if (name == "" || email == "" || password == "" || confirmPassword == "") {
      Alert.alert(
        "ATENÇÃO!",
        "Nenhum campo deve estar vazio, por favor coloque valores válidos. ",
        [{ text: "OK", onPress: () => console.log("OK valor valido") }]
      );
    } else {
      if (password === confirmPassword) {
        Axios.post(data.IPV4 + "/register", {
          username: name,
          email: email,
          password: password,
        }).then((response) => {
          if (response.data[0] == "ERRO") {
            Alert.alert("ATENÇÃO!", `${response.data[1]}`, [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          } else {
            Alert.alert("FEITO!", `Conta cadastrada com sucesso!!`, [
              { text: "Voltar", onPress: () => navigation.navigate("Login") },
            ]);
          }
        });
      } else {
        Alert.alert(
          "ATENÇÃO!",
          "As senhas não coincidem! Por favor, coloque duas senhas idênticas. ",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundPhoto} style={styles.imageBackground}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient
            colors={[colors.primaryColor, colors.ice, colors.primaryColor]}
            style={styles.content}
          >
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <AntDesign name="arrowleft" size={35} color={colors.ice} />
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} />

            <View style={styles.titleArea}>
              <Text style={styles.title}>
                Insira suas informações a seguir:
              </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome..."
              onChangeText={(text) => setName(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail..."
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

            <View style={styles.inputView}>
              <TextInput
                secureTextEntry={confirmShow}
                style={styles.inputPass}
                placeholder="Digite sua senha novamente..."
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <Ionicons
                name={confirmEye}
                style={styles.passEye}
                onPress={() => {
                  setConfirmShow(!confirmShow);
                  confirmEye == "eye-off-sharp"
                    ? setConfirmEye("eye-sharp")
                    : setConfirmEye("eye-off-sharp");
                }}
              />
            </View>

            <Text style={styles.textAlert}>
              DICA: Coloque uma senha que você irá lembrar! caso a perca não há
              como recuperá-la
            </Text>

            <View style={styles.buttonView}>
              <TouchableOpacity
                style={[
                  styles.containerRegister,
                  { backgroundColor: colors.secondaryColor },
                ]}
                onPress={() => {
                  handleRegister();
                }}
              >
                <Text style={styles.titleRegister}>Registrar-se</Text>
              </TouchableOpacity>
            </View>

            <Text
              style={styles.textService}
              onPress={() => {
                Linking.openURL(
                  "https://seed-gerenciadordenegocios.000webhostapp.com/conditions.html"
                );
              }}
            >
              Ao clicar em “REGISTRAR” você concorda com os nosso{" "}
              <Text style={{ color: colors.secondaryColor }}>
                Termos de política e serviço.
              </Text>
              (Clique aqui para ver)
            </Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  // Espaço
  container: {
    flex: 1,
  },
  //botao de voltar
  icon: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  // Plano de fundo
  imageBackground: {
    height: Dimensions.get("window").height * 1.002,
    width: Dimensions.get("window").width,
  },
  // Área do conteudo
  content: {
    marginVertical: 10,
    marginHorizontal: 7,
    paddingHorizontal: 25,
    paddingVertical: 10,
    width: "100%",
    height: Dimensions.get("window").height * 0.95,
    width: Dimensions.get("window").width * 0.95,
    borderRadius: 17,
    opacity: 0.75,
    elevation: 5,
    alignItems: "center",

    justifyContent: "space-around",
  },
  // Tamanho da logo
  logo: {
    height: Dimensions.get("window").height * 0.14,
    width: Dimensions.get("window").height * 0.14,
  },
  // Configuração do texto
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: fonts.text,
  },
  // Caixas de texto
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
  // Área dos itens da senha
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
  //Área dos botões
  buttonView: {
    width: "100%",
    marginVertical: 10,
  },
  // Login alternativo
  googleLogin: {
    width: 45,
    height: 46,
  },
  // título
  title: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.text,
    fontWeight: "700",
  },
  // Subtítulo
  titleArea: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: colors.white,
  },
  // Configuração do texto dos termos
  textService: {
    fontSize: 14,
    lineHeight: 14,
    color: colors.white,
    fontWeight: "bold",
    fontFamily: fonts.text,
  },
  textAlert: {
    fontSize: RFValue(12),
    lineHeight: 15,
    color: colors.darkGray,
    fontWeight: "bold",
    fontFamily: fonts.text,
  },

  //BUTTON CONFIRMATION
  //Configuração do componente
  containerRegister: {
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: "100%",
    backgroundColor: colors.secondaryColor,
    opacity: 1,
    borderRadius: 20,
  },
  //Texto do título
  titleRegister: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts.text,
    fontWeight: "700",
  },
});
