//Importação Obrigatória
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

//Bibliotecas
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

//Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

//Contextos
import StoreDataContexts from "../../contexts/StoreDataContexts";

export default function StoreData() {
  const { state } = useContext(StoreDataContexts);
  console.log();

  const [dataShow, setDataShow] = useState(true);
  const [dataShowQuantity, setDataShowQuantity] = useState(true);
  const [dataShowHistory, setDataShowHistory] = useState(true);
  const [eye, setEye] = useState("eye-sharp");
  const [eyeQuantity, setEyeQuantity] = useState("eye-sharp");
  const [eyeHistory, setEyeHistory] = useState("eye-sharp");

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingBottom: 15,
        marginTop: 5,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <View style={styles.content}>
        <View style={[styles.dataTitleArea, { marginBottom: 40 }]}>
          <View style={styles.dataTitleContent}>
            <Text style={styles.dataTitleText}> Dados financeiros</Text>
          </View>
          <Ionicons
            name={eye}
            style={styles.dataEye}
            onPress={() => {
              setDataShow(!dataShow);
              eye == "eye-sharp"
                ? setEye("eye-off-sharp")
                : setEye("eye-sharp");
            }}
          />
        </View>
        {/* Dados financeiros */}
        <Text style={styles.alertSpam}> *Referente a este mês </Text>

        <View
          style={[styles.longItem, { backgroundColor: colors.secondaryColor }]}
        >
          <Text style={styles.itemTitleText}>Lucro Líquido: </Text>
          <Text style={styles.longValueText}>
            {" "}
            {dataShow == true ? (
              "R$" + state.storeData.netProfit
            ) : (
              <Text style={{ marginTop: -10 }}>******</Text>
            )}
          </Text>
        </View>

        <View style={styles.itensPositionArea}>
          <View style={[styles.item, { backgroundColor: colors.primaryColor }]}>
            <Text style={styles.itemText}>Lucro Bruto:</Text>
            <Text style={styles.valueText}>
              {" "}
              {dataShow == true ? (
                "R$" + state.storeData.grossProfit
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>

          <View style={[styles.item, { backgroundColor: colors.primaryColor }]}>
            <Text style={styles.itemText}>Gasto Total:</Text>
            <Text style={styles.valueText}>
              {" "}
              {dataShow == true ? (
                "R$" + state.storeData.spents
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.itensPositionArea}>
          <View
            style={[styles.item, { backgroundColor: colors.secondaryColor }]}
          >
            <Text style={styles.itemText}>Salário dos funcionários:</Text>
            <Text style={styles.valueText}>
              {" "}
              {dataShow == true ? (
                "R$" + state.storeData.employeesWage
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
          <View
            style={[styles.item, { backgroundColor: colors.secondaryColor }]}
          >
            <Text style={styles.itemText}>Gasto com matéria prima:</Text>
            <Text style={styles.valueText}>
              {" "}
              {dataShow == true ? (
                "R$" + state.storeData.rawMaterialsSpent
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.itensPositionArea}>
          <View style={[styles.item, { backgroundColor: colors.primaryColor }]}>
            <Text style={styles.itemText}>Gastos do local:</Text>
            <Text style={styles.valueText}>
              {" "}
              {dataShow == true ? (
                "R$" + state.storeData.localCostsSpent
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
          <View style={[styles.item, { backgroundColor: colors.primaryColor }]}>
            <Text style={styles.itemText}>Outros gastos:</Text>
            <Text style={styles.valueText}>
              {" "}
              {dataShow == true ? (
                "R$" + state.storeData.otherCostsSpent
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.dataTitleArea}>
          <View style={styles.dataTitleContent}>
            <Text style={styles.dataTitleText}> Quantidades </Text>
          </View>

          <Ionicons
            name={eyeQuantity}
            style={styles.dataEye}
            onPress={() => {
              setDataShowQuantity(!dataShowQuantity);
              eyeQuantity == "eye-sharp"
                ? setEyeQuantity("eye-off-sharp")
                : setEyeQuantity("eye-sharp");
            }}
          />
        </View>
        {/* Quantidades */}

        <View
          style={[
            styles.longItem,
            { backgroundColor: colors.darkIce, marginTop: 25 },
          ]}
        >
          <Text style={styles.itemTitleText}>Total de produtos vendidos: </Text>
          <Text style={[styles.longValueText, { marginTop: 25 }]}>
            {" "}
            {dataShowQuantity == true ? (
              state.storeData.allSoldItens
            ) : (
              <Text style={{ marginTop: -10 }}>******</Text>
            )}
          </Text>
        </View>

        <View style={styles.itensPositionArea}>
          <View style={[styles.item, { backgroundColor: colors.darkIce }]}>
            <Text style={[styles.itemText, { top: 5 }]}>
              Produtos vendidos {"\n"}este mês:
            </Text>
            <Text style={[styles.valueText, { marginTop: 30 }]}>
              {dataShowQuantity == true ? (
                state.storeData.thisMonthSoldItens
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
          <View style={[styles.item, { backgroundColor: colors.darkIce }]}>
            <Text style={[styles.itemText, { top: 5 }]}>
              Produtos vendidos {"\n"}mês passado:
            </Text>
            <Text style={[styles.valueText, { marginTop: 30 }]}>
              {dataShowQuantity == true ? (
                state.storeData.lastMonthSoldItens
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.itensPositionArea}>
          <View style={[styles.item, { backgroundColor: colors.darkIce }]}>
            <Text style={[styles.itemText, { top: 5 }]}>
              Quantidade {"\n"}de produtos:
            </Text>
            <Text style={[styles.valueText, { marginTop: 30 }]}>
              {dataShowQuantity == true ? (
                state.storeData.productsQuantity
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
          <View style={[styles.item, { backgroundColor: colors.darkIce }]}>
            <Text style={[styles.itemText, { top: 5 }]}>
              Quantidade {"\n"}de funcionários:
            </Text>
            <Text style={[styles.valueText, { marginTop: 30 }]}>
              {dataShowQuantity == true ? (
                state.storeData.employeesQuantity
              ) : (
                <Text style={{ marginTop: -10 }}>******</Text>
              )}
            </Text>
          </View>
        </View>

        <View style={styles.dataTitleArea}>
          <View style={styles.dataTitleContent}>
            <Text style={styles.dataTitleText}>Histórico de dados</Text>
          </View>
          <Ionicons
            name={eyeHistory}
            style={styles.dataEye}
            onPress={() => {
              setDataShowHistory(!dataShowHistory);
              eyeHistory == "eye-sharp"
                ? setEyeHistory("eye-off-sharp")
                : setEyeHistory("eye-sharp");
            }}
          />
        </View>
        {/* Histórico de dados  */}

        <View style={[styles.longItem, { backgroundColor: colors.limeGreen }]}>
          <Text style={styles.itemTitleText}>Total já lucrado: </Text>
          <Text style={styles.longValueText}>
            {dataShowHistory == true ? (
              "R$" + state.storeData.allProfited
            ) : (
              <Text style={{ marginTop: -10 }}>******</Text>
            )}
          </Text>
        </View>

        <View
          style={[
            styles.longItem,
            { backgroundColor: colors.lightRed, opacity: 0.8 },
          ]}
        >
          <Text style={styles.itemTitleText}>Total já gasto: </Text>
          <Text style={styles.longValueText}>
            {dataShowHistory == true ? (
              "R$" + state.storeData.allSpented
            ) : (
              <Text style={{ marginTop: -10 }}>******</Text>
            )}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  //Conteúdo da página
  content: {
    flex: 1,
    alignItems: "center",
  },
  //Spam
  alertSpam: {
    marginBottom: 10,
    position: "absolute",
    left: 35,
    top: 90,
    fontSize: 14,
    fontFamily: fonts.heading,
  },
  //Área do título
  dataTitleArea: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "row",
  },
  //Conteúdo do título
  dataTitleContent: {
    width: 250,
    height: 50,
    borderRadius: 40,
    backgroundColor: colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  //Texto do título
  dataTitleText: {
    fontSize: 20,
    fontFamily: fonts.heading,
  },
  //Campo grande
  longItem: {
    height: 120,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  //Posição dos itens
  itensPositionArea: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  //Item normal
  item: {
    height: 120,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  //Texto do título
  itemTitleText: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 20,
    fontFamily: fonts.heading,
    opacity: 0.46,
  },
  //Texto do item
  itemText: {
    position: "absolute",
    top: 10,
    left: 8,
    fontSize: RFValue(16),
    fontFamily: fonts.heading,
    opacity: 0.46,
  },
  //Texto do campo grande
  longValueText: {
    fontSize: RFValue(35),
    fontFamily: fonts.heading,
    color: colors.darkGray,
  },
  //Valor do texto
  valueText: {
    marginTop: 25,
    fontSize: RFValue(23),
    fontFamily: fonts.heading,
    color: colors.darkGray,
  },
  //Olho que esconde opção
  dataEye: {
    fontSize: 30,
    position: "absolute",
    right: 15,
  },
});
