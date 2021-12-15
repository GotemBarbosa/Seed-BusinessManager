// Importação Obrigatória
import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

// Bibliotecas
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { RFValue } from "react-native-responsive-fontsize";

// Configurações
import colors from "../styles/colors";
import MainChartContext from "../contexts/MainChartContexts";

export default function () {
  const { state } = useContext(MainChartContext);
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: colors.secondarySubColor,
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
    useShadowColorFromDataset: false, // optional
    //
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blueWhite, colors.primaryColor, colors.primaryColor]}
    >
      <View style={styles.titleArea}>
        <Text style={styles.title}> GRÁFICO DE LUCRO </Text>
      </View>
      <View style={styles.chartArea}>
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
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Espaço
  container: {
    paddingTop: 20,
  },
  // Área do título
  titleArea: {
    position: "absolute",
    backgroundColor: colors.white,
    width: "100%",
    opacity: 0.3,
    alignItems: "center",
  },
  // Título
  title: {
    fontSize: 14.51,
    fontWeight: "bold",
  },
  // Gráfico
  chartArea: {},
  chart: {
    borderRadius: 0,
  },
});
