// Importação Obrigatória
import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Bibliotecas
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

// Configurações
import colors from "../styles/colors";

// Contextos
import ProfitChartContext from "../contexts/ProfitChartContexts";

export default function ProfitChart() {
  const { state } = useContext(ProfitChartContext);

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: colors.orange,
    decimalPlaces: 2, // optional, defaults to 2dp
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "3",
      //strokeWidth: "2",
      //stroke: colors.purple,
    },
    propsForHorizontalLabels: {
      fontSize: RFValue(7),
    },
    //
    backgroundGradientFrom: colors.white,
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientTo: colors.white,
    backgroundGradientToOpacity: 0.3,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 4, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blueWhite, colors.primaryColor, colors.primaryColor]}
    >
      <View style={styles.titleArea}>
        <Text style={styles.title}> GRÁFICO DE RECEITA </Text>
      </View>
      <LineChart
        yLabelsOffset={4}
        data={state}
        width={screenWidth} // from react-native
        height={340}
        yAxisLabel="R$ "
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1D
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        onDataPointClick={() => {}}
      />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  //Configuração da página
  container: {
    paddingTop: 20,
  },
  //Area do titulo
  titleArea: {
    position: "absolute",
    backgroundColor: colors.white,
    width: "100%",
    opacity: 0.3,
    alignItems: "center",
  },
  //Texto do titulo
  title: {
    fontSize: 14.51,
    fontWeight: "bold",
  },
  //Configuração do gráfico
  chart: {
    marginVertical: 0,
    borderRadius: 0,
  },
});
