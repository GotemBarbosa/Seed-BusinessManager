// Importação Obrigatória
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Linking,
  Alert
} from "react-native";

// Bibliotecas
import { Switch } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { RectButton } from "react-native-gesture-handler";

// Importação de Componentes
import Header from "../components/Header";
import Tutorial from "../components/Tutorial";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Settings() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Header title="Configurações" />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          zIndex: 1,
          borderTopStartRadius: 23,
          borderTopEndRadius: 23,
        }}
      >
        <StatusBar translucent={true} backgroundColor={colors.gray} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {modalVisible === true ? (
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <Tutorial
                onClose={() => {
                  setModalVisible(false);
                }}
              />
            </Modal>
          ) : null}

          <View style={styles.option}>
            <RectButton 
              rippleColor={colors.lightGray} 
              style={styles.button} 
              onPress={()=>{
                Linking.openURL('https://seed-gerenciadordenegocios.000webhostapp.com/conditions.html')
              }}>
              <Text style={styles.text}>Termos de uso</Text>
            </RectButton>
          </View>
          <View style={styles.option}>
            <RectButton 
              rippleColor={colors.lightGray} 
              style={styles.button} s
              onPress={()=>{
                Linking.openURL('https://seed-gerenciadordenegocios.000webhostapp.com/privacy.html')
              }}>
              <Text style={styles.text}>Política de privacidade</Text>
            </RectButton>
          </View>

          <View style={styles.option}>
            <RectButton
              rippleColor={colors.lightGray}
              style={styles.button}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.text}>Reproduzir tutorial</Text>
            </RectButton>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  //Configuração da página
  container: {
    flex: 1,
  },
  //Area de cada opção
  option: {
    height: 83,
    width: Dimensions.get("window").width,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray,
  },
  //View do dark mode
  darkmodeOption: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    paddingLeft: 15,
  },
  //Texto de cada opção
  text: {
    fontFamily: fonts.text,
    fontSize: 14,
  },
  //botão para selecionar cada opção
  button: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 15,
  },
});
