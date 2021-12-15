// Importação Obrigatória
import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

// Bibliotecas
import { useNavigation } from "@react-navigation/core";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StatusBar } from "expo-status-bar";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importação de Componentes
import logo from "../../assets/icon.png";

// Configurações
import colors from "../styles/colors";
import ImportantDataContext from "../contexts/ImportantDataContexts";

export default function InitialLoading() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, dispatch } = useContext(ImportantDataContext);

  async function verifyLogin() {
    let LoginValue = await AsyncStorage.getItem("@seedMe_userLogin");
    let parsedLoginValue = await JSON.parse(LoginValue);

    if (parsedLoginValue != null) {
      setEmail(parsedLoginValue.email);
      setPassword(parsedLoginValue.password);
      dispatch({
        type: "addUser",
        payload: {
          userId: Number(parsedLoginValue.id),
        },
      });
      //mudar de pagina
      setTimeout(() => {
        navigation.replace("AuthRoutes");
      }, 1000);
    } else {
      //nao passou na verificação
      navigation.replace("Login");
    }
  }

  useEffect(() => {
    //padrão android
    
    NetInfo.fetch().then(state => {
      if(state.isConnected){
        try {
          Axios.get(data.IPV4 + `/testConnection`).then((response) => {
            if (response.data == "connected") {
              console.log("conectado ao servidor");
              verifyLogin();
            } else {
              Alert.alert(
                "FALHA NA CONEXÃO!",
                "Erro ao conectar com o servidor! verifique sua conexão de rede ou tente novamente mais tarde!",
                [{ text: "OK", onPress: () => {} }]
              );
            }
          });
        } catch (err) {
          console.log(err);
    
          Alert.alert(
            "FALHA NA CONEXÃO!",
            "Erro ao conectar com o servidor! verifique sua conexão de rede ou tente novamente mais tarde!",
            [{ text: "OK", onPress: () => {} }]
          );
        }
      } else {
        Alert.alert("Você está sem conexão conexão com a internet!",
        [{text: 'OK', onPress: ()=>{}}]
        );
      }
    });

  }, []);
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={colors.ice} />

      <Image source={logo} style={styles.logo} />
      <View style={styles.loadingArea}>
        <Text style={styles.loadingText}>Carregando...</Text>
        <LottieView
          style={{ width: 100, height: 100 }}
          source={require("../assets/lottie/loading.json")}
          autoPlay
        />
      </View>
      <View style={styles.tipArea}>
        <Text style={styles.tip}>
          Acesse o tutorial nas configurações {"\n"}caso queira entender melhor
          o aplicativo 😉
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 200,
    width: 200,
    marginTop: 20,
  },
  loadingArea: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: RFValue(13),
  },
  tipArea: {
    marginBottom: 50,
  },
  tip: {
    textAlign: "center",
    fontSize: RFValue(13),
  },
});
