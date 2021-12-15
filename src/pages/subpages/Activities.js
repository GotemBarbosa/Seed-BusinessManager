//Importação Obrigatória

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
} from "react-native";

//Bibliotecas
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

//Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

//Contextos
import MainChartContext from "../../contexts/MainChartContexts";
import CostChartContexts from "../../contexts/CostChartContexts";
import ProfitChartContext from "../../contexts/ProfitChartContexts";
import ProductsChartContext from "../../contexts/ProductsChartContexts";
import StoreDataContexts from "../../contexts/StoreDataContexts";
import ActivitiesContexts from "../../contexts/ActivitiesContexts";

export default function Activities() {
  const [isLoading, setIsLoading] = useState(true);

  const { state, dispatchA } = useContext(ActivitiesContexts);
  const { dispatchM } = useContext(MainChartContext);
  const { dispatchP } = useContext(ProfitChartContext);
  const { dispatchPr } = useContext(ProductsChartContext);
  const { dispatchSD } = useContext(StoreDataContexts);
  const { dispatchC } = useContext(CostChartContexts);

  useEffect(() => {
    if (state.activititiesData != undefined) setIsLoading(false);
  }, [state]);

  function getDate(data) {
    const date = new Date(data);
    const insertDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    return insertDate;
  }

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
        <View style={styles.activitiesArea}>
          {isLoading === false
            ? state.activititiesData.map((val, key) => {
                return (
                  <Swipeable
                    key={key}
                    containerStyle={{ width: "100%" }}
                    overshootRight={false}
                    renderRightActions={() => (
                      <Animated.View>
                        <View>
                          <RectButton
                            style={styles.buttonRemove}
                            onPress={() => {
                              Alert.alert(
                                "Atenção!",
                                "Você tem certeza que deseja apagar essa ação do seus registros?",
                                [
                                  {
                                    text: "Sim",
                                    onPress: () => {
                                      dispatchA({
                                        type: "deleteData",
                                        payload: {
                                          id: val.id,
                                          type:
                                            val.fromTable === "1"
                                              ? "profit"
                                              : "spent",
                                        },
                                      });
                                      dispatchA({
                                        type: "updateData",
                                      });
                                      dispatchM({
                                        type: "changeChart",
                                      });
                                      dispatchP({
                                        type: "changeChart",
                                      });
                                      dispatchPr({
                                        type: "changeChart",
                                      });
                                      dispatchC({
                                        type: "changeChart",
                                      });
                                      dispatchSD({
                                        type: "updateData",
                                      });
                                    },
                                  },
                                  { text: "Não", onPress: () => {} },
                                ]
                              );
                            }}
                          >
                            <Feather
                              name={"trash"}
                              size={32}
                              color={colors.white}
                            />
                          </RectButton>
                        </View>
                      </Animated.View>
                    )}
                  >
                    <View style={styles.item}>
                      <View style={styles.item}>
                        <View style={styles.itemInformation}>
                          <View style={styles.itemIdentification}>
                            <View
                              style={[
                                styles.iconArea,
                                val.fromTable === "1"
                                  ? { backgroundColor: colors.limeGreen }
                                  : { backgroundColor: colors.red },
                              ]}
                            >
                              {val.fromTable === "1" ? (
                                <MaterialIcons
                                  name="attach-money"
                                  size={32}
                                  color="white"
                                />
                              ) : (
                                <MaterialIcons
                                  name="money-off"
                                  size={32}
                                  color="white"
                                />
                              )}
                            </View>
                          </View>
                          <View style={styles.itemData}>
                            <Text style={styles.itemTextTitle}>
                              {val.fromTable === "1"
                                ? "Venda realizada"
                                : "Despesa adicionada"}
                            </Text>
                            <Text style={styles.itemTextIdentification}>
                              {val.fromTable === "1"
                                ? val.name === "Fast Sale"
                                  ? "Venda Rápida"
                                  : val.name
                                : null}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.itemValues}>
                          <Text
                            style={[
                              styles.itemPrice,
                              val.fromTable === "1"
                                ? { color: "green" }
                                : { color: colors.texRed },
                            ]}
                          >
                            {val.fromTable === "1" ? "+" : "-"}R$ {val.value}
                          </Text>
                          <Text style={styles.itemDate}>
                            {getDate(val.date)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Swipeable>
                );
              })
            : null}
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
  //Area do histórico
  activitiesArea: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  //Cada item
  item: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    padding: 8,
    borderRadius: 9,
    justifyContent: "space-between",
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  //Informações do item
  itemInformation: {
    flexDirection: "row",
    width: 220,
    justifyContent: "space-around",
    alignItems: "center",
  },
  //Identificação do item
  itemIdentification: {
    height: 45,
    width: 45,
  },
  //Área do icone do item
  iconArea: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  //Dados do item
  itemData: {
    // backgroundColor: 'red',
    height: "100%",
    width: 170,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  //Titulo do item
  itemTextTitle: {
    color: colors.darkGray,
    fontSize: RFValue(13),
    fontWeight: "bold",
  },
  //Texto de identificação do item
  itemTextIdentification: {
    color: colors.textLightGray,
  },
  //Valores do item
  itemValues: {
    justifyContent: "center",
  },
  //Preço do item
  itemPrice: {
    fontSize: RFValue(15),
    fontFamily: fonts.poppinsText,
  },
  //Data do item
  itemDate: {
    marginTop: -5,
    fontSize: RFValue(9),
    textAlign: "right",
    color: colors.textLightGray,
  },
  //Botão de remover
  buttonRemove: {
    width: 80,
    height: 60,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
