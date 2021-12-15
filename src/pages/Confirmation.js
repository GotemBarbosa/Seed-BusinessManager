// Importações obrigatórias
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Bibliotecas
import { useNavigation } from "@react-navigation/core";

// Configuração
import fonts from "../styles/fonts";
import colors from "../styles/colors";

export default function Confirmation({ route }) {
  const { type, item } = route.params;
  const navigation = useNavigation();

  function handleMoveBack() {
    navigation.popToTop();
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎉</Text>

        <Text style={styles.title}>
          {type === "Insert"
            ? "Cadastro realizado!"
            : item === "Employee"
            ? "Funcionário atualizado!"
            : item === "RawMaterial"
            ? "Matéria prima atualizada!"
            : item === "OtherCost"
            ? "Gasto atualizado!"
            : "Produto atualizado!"}
        </Text>
        <Text style={styles.subTitle}>
          {type === "Insert"
            ? "Seu cadastro foi realizado com sucesso! "
            : item === "Employee"
            ? "Seu funcionário foi atualizado com sucesso! "
            : item === "RawMaterial"
            ? "Sua materia prima foi atualizada com sucesso! "
            : item === "OtherCost"
            ? "Seu gasto foi atualizado com sucesso! "
            : "Seu produto foi atualizado com sucesso! "}

          {item === "Employee"
            ? 'Não se esqueça que para pagar o salário de um funcionário você deve clicar no botão "Pagar" :D'
            : item === "RawMaterial"
            ? 'Não se esqueça que para adicionar um gasto de sua matéria prima você deve clicar no botão "Adic. Gasto" :D'
            : item === "OtherCost"
            ? 'Não se esqueça que, para adicionar um gasto deste item, você deve clicar no botão "Adic. Gasto" :D'
            : "Não se esqueça de que, sempre que fizer uma venda deste item, você deve cadastrar na PÁGINA INICIAL"}
        </Text>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleMoveBack}>
            <Text style={styles.buttonText}>Obrigado !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //Configuração da página
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  // Espaço
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  // Título
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.darkGray,
    lineHeight: 38,
    marginTop: 15,
  },
  // Subtítulo
  subTitle: {
    fontFamily: fonts.poppinsText,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    color: colors.textGray,
  },
  // Emoji
  emoji: {
    fontSize: 70,
  },
  // Espaço inferior
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
  // Botão
  button: {
    backgroundColor: colors.limeGreen,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  // Texto do botão
  buttonText: {
    fontSize: 25,
    color: colors.white,
    fontFamily: fonts.poppinsText,
  },
});
