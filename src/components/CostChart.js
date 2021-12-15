// Importação Obrigatória
import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Bibliotecas
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";

// Importação de Componentes

// Configurações
import colors from "../styles/colors";

// Contextos
import CostChartContexts from "../contexts/CostChartContexts";

export default function CostChart() {
  const { state } = useContext(CostChartContexts);

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
    },
    propsForHorizontalLabels: {
      fontSize: RFValue(7),
    },
    backgroundGradientFrom: colors.white,
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientTo: colors.white,
    backgroundGradientToOpacity: 0.3,
    color: (opacity = 1) => `rgba(0,10,10, ${opacity})`,
    strokeWidth: 4, // optional, default 3
    stroke: colors.primaryColor,
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blueWhite, colors.primaryColor, colors.primaryColor]}
    >
      <View style={styles.titleArea}>
        <Text style={styles.title}> GRÁFICO DE CUSTOS </Text>
      </View>
      <LineChart
        yLabelsOffset={4}
        data={state}
        width={screenWidth}
        height={340}
        yAxisLabel="R$ "
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        onDataPointClick={() => {}}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  //Configuração do componente
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
  //texto do titulo
  title: {
    fontSize: 14.51,
    fontWeight: "bold",
  },
  //configuração doS gráfico
  chart: {
    marginVertical: 0,
    borderRadius: 0,
  },
});
