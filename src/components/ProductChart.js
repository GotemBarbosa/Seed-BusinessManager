// Importação Obrigatória
import React, { useContext } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";

// Importação de Componentes
import { PieChart } from "react-native-chart-kit";
import ProductsChartContext from "../contexts/ProductsChartContexts";
import colors from "../styles/colors";

export default function ProductChart() {
  const screenWidth = Dimensions.get("window").width;
  const { state } = useContext(ProductsChartContext);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    //
  };

  return (
    <View>
      {state.data[0] === undefined ? null : (
        <>
          <View style={styles.titleArea}>
            <Text style={styles.title}> PRODUTOS MAIS VENDIDOS </Text>
          </View>
          <PieChart
            data={state.data}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor={"sold"}
            backgroundColor={"transparent"}
            paddingLeft={"-10"}
            center={[5, 5]}
            absolute
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  //Area do titulo
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
});
