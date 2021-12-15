// Importação Obrigatória
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

// Bibliotecas
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";

// Importação de Componentes
import logo from "../../assets/icon.png";
import addButton from "../assets/addButton.jpeg";
import costsPage from "../assets/costs.jpeg";
import dataPage from "../assets/DataPage.jpeg";
import detailedSale from "../assets/detailedSale.jpeg";
import fastSale from "../assets/fastSale.jpeg";
import bottomBar from "../assets/InferiorBar.jpeg";
import activities from "../assets/Activities.jpeg";
import TopBar from "../assets/TopBar.jpeg";
import products from "../assets/products.jpeg";
import del from "../assets/delete.jpeg";
import edit from "../assets/edit.jpeg";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Tutorial({ onClose = () => {}, children }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={[colors.primaryColor, colors.blueWhite, colors.primaryColor]}
      >
        <View style={styles.swiperArea}>
          <View style={styles.dotBackground} />
          <Swiper
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.Activedot} />}
            paginationStyle={{ bottom: 5 }}
            showsButtons={true}
            loop={false}
            buttonWrapperStyle={styles.wrapperButtons}
          >
            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}>
                    {" "}
                    Bem-vindo ao Seed!{"\n"} O seu gerenciador de negócios{" "}
                  </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    Clique na setinha para prosseguir.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image source={logo} style={{ height: 200, width: 200 }} />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> VENDA DETALHADA </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    Na VENDA DETALHADA você escolherá um dos produtos que
                    cadastrou anteriormente e adicionará a quantidade vendida.
                    Para finalizar a venda, basta clicar no botão verde VENDER.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={detailedSale}
                    style={{ width: 250, height: 160 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> VENDA RÁPIDA </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    Na VENDA RÁPIDA você só precisa selecionar o valor da venda
                    e clicar no botão de VENDER. Perfeito para momentos de
                    pressa!{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={fastSale}
                    style={{ width: 300, height: 100 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> BARRA SUPERIOR </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    A barra superior da acesso as vendas, aos dados do seu
                    negócio e as seus histórico de atividades.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image source={TopBar} style={{ width: 250, height: 250 }} />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> DADOS </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    O campo DADOS é onde você tem acesso as informações do seu
                    negócio.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={dataPage}
                    style={{ width: 280, height: 300 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> ATIVIDADES </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    O campo ATIVIDADES é onde você pode verificar as atividades
                    que foram feitas no aplicativo, tanto lucro quanto despesas.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={activities}
                    style={{ width: 300, height: 250 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> MENU INFERIOR </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    O menu inferior tem como objetivo de te dar acesso as outras
                    funcionalidades do aplicativo. Clicando no ícone da
                    “caixinha” o aplicativo te levara para a tela de PRODUTOS.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={bottomBar}
                    style={{ width: 300, height: 60 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> PRODUTOS </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    O campo PRODUTOS é onde você gerencia os seus produtos.
                    Clicando na aba ESTOQUE você será redirecionado para a tela
                    onde estarão todos os seus produtos, podento adicionar mais
                    objetos ou exclui-los.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={products}
                    style={{ width: 150, height: 220 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> DESPESAS </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    O campo DESPESAS é onde você pode gerenciar todas as
                    despesas do seu negócio.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={costsPage}
                    style={{ width: 300, height: 60 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> ADICIONAR </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    O botão de MAIS, presente em várias telas, serve para
                    cadastrar itens, sejam eles produtos, funcionários, matérias
                    primas, despesas com o local ou outros.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={addButton}
                    style={{ width: 290, height: 90 }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> EDITAR </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    Para EDITAR um item basta clicar no ícone do lápis.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image source={edit} style={{ width: 300, height: 60 }} />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}> DELETAR </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    Para DELETAR um item basta arrasta-lo para o lado e clicar
                    no ícone da LIXEIRA.{" "}
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image source={del} style={{ width: 300, height: 60 }} />
                </View>
              </View>
            </View>

            <View style={styles.slide}>
              <View style={styles.item}>
                <View style={styles.titleArea}>
                  <Text style={styles.title}>
                    {" "}
                    VOCÊ FINALIZOU O TUTORIAL 😃{" "}
                  </Text>
                </View>
                <View style={styles.descriptionArea}>
                  <Text style={styles.description}>
                    {" "}
                    Agora você está hápto para começar a trabalhar e organizar
                    seu negócio, boa aventura!! {"\n"}Att: Equipe SEED
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image source={logo} style={{ height: 200, width: 200 }} />
                </View>
                <View style={styles.buttonArea}>
                  {/* <TouchableOpacity style={styles.buttonSale} onPress={InsertSale}> */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => onClose()}
                  >
                    <Text style={styles.textButton}> FINALIZAR TUTORIAL </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Swiper>
        </View>
        <View style={styles.appNameArea}>
          <Text style={styles.appName}>Seed - Gerenciador de Negócios</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  // Espaço
  container: {
    flex: 1,
    alignItems: "center",
  },
  //Area do tutorial
  swiperArea: {
    height: "80%",
  },
  //Botões do tutorial
  wrapperButtons: {
    backgroundColor: "transparent",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  //Circulos indicadores
  dot: {
    backgroundColor: colors.secondarySubColor,
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  //Circulos indicadores (quando ativo)
  Activedot: {
    backgroundColor: colors.primaryColor,
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  //slide do tutorial
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //Cada dica do tutorial
  item: {
    width: "85%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    alignItems: "center",
  },
  //area do titulo
  titleArea: {
    marginBottom: 20,
    //titulo
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  //area da descrição
  descriptionArea: {
    marginBottom: 40,
  },
  //descrição
  description: {
    fontSize: 18,
    color: colors.textGray,
  },
  //area da imagem
  imageArea: {
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.9,
  },
  //area do botao
  buttonArea: {
    marginTop: -3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  //Botão de finalizar
  button: {
    width: 250,
    height: 40,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.green,
    opacity: 0.75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  //Texto do botão
  textButton: {
    fontSize: 18,
    fontFamily: fonts.poppinsText,
    color: colors.white,
    textAlign: "center",
  },
  //Area do nome do app
  appNameArea: {
    position: "absolute",
    bottom: 20,
  },
  //texto do nome do app
  appName: {
    fontSize: 20,
    fontFamily: fonts.poppinsText,
  },
});
