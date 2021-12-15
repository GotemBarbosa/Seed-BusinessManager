// Importação Obrigatória
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from "react-native";

// Bibliotecas
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import Axios from "axios";

// Importação de Componentes
import Item from "../../components/Item";
import ButtonEdit from "../../components/ButtonEdit";
import ProductChart from "../../components/ProductChart";
import LottieView from "lottie-react-native";

// Configurações
import colors from "../../styles/colors";
import StoreDataContexts from "../../contexts/StoreDataContexts";

// Contextos
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAccesContexts from "../../contexts/DataAcessContexts";

export default function Catalog() {
  const navigation = useNavigation();

  const [id, setId] = useState();
  const [products, setProducts] = useState();

  const { state, dispatch } = useContext(DataAccesContexts);
  const { data } = useContext(ImportantDataContext);
  const { dispatchSD } = useContext(StoreDataContexts);

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changeAvailable, setChangeAvailable] = useState(false);

  useEffect(() => {
    if (changeAvailable == true) {
      Axios.delete(
        data.IPV4 + `/products/delete?id=${id}&userId=${data.userId}`
      ).then((response) => setProducts(response.data));
      dispatchSD({
        type: "updateData",
      });
      setChangeAvailable(false);
    }
  }, [changeAvailable]);

  useEffect(() => {
    setIsLoading(false);

    if (state.loading === true) {
      Axios.get(data.IPV4 + `/products/get?userId=${data.userId}`).then(
        (response) => {
          setProducts(response.data);
          setIsLoading(true);
        }
      );
      dispatch({ type: "FETCH_COMPLETED" });
    }
  }, [state]);

  useEffect(() => {
    Axios.get(data.IPV4 + `/products/get?userId=${data.userId}`).then(
      (response) => {
        setProducts(response.data);
        setIsLoading(true);
      }
    );
  }, []);

  const handleRemove = () => {
    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja apagar o item do seus cadastros?",
      [
        {
          text: "Sim",
          onPress: () => {
            setChangeAvailable(true);
          },
        },
        { text: "Não", onPress: () => {} },
      ]
    );
  };

  function handleUpdate(
    id,
    name,
    price,
    description,
    stockAvailable,
    stockQuantity,
    tagId,
    selectedOption
  ) {
    navigation.navigate("UpdateProducts", {
      id: id,
      name: name,
      description: description,
      price: price,
      stockAvailable: stockAvailable,
      stockQuantity: stockQuantity,
      tagId: tagId,
      identificationType: selectedOption,
    });
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.chartArea}>
          <ProductChart />
        </View>

        <SearchBar
          platform="android"
          containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
          inputContainerStyle={{
            backgroundColor: colors.lightGray,
            borderRadius: 20,
            opacity: 0.5,
          }}
          onChangeText={(newVal) => setValue(newVal)}
          onClearText={() => {}}
          placeholder="Pesquisar..."
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => {}}
          value={value}
        />

        <View
          style={
            isLoading == false
              ? styles.productsArea
              : { flex: 1, width: "100%" }
          }
        >
          {isLoading === false ? (
            /* Aqui vem o que vai acontecer se estiver carregando*/
            <LottieView
              style={{ width: 100, height: 100 }}
              source={require("../../assets/lottie/loading.json")}
              autoPlay
            />
          ) : (
            //Caso tenha itens
            <View>
              {products
                .filter((val) => {
                  if (value == "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(value.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((val, key) => {
                  return (
                    <Swipeable
                      key={key}
                      overshootRight={false}
                      renderRightActions={() => (
                        <Animated.View>
                          <View>
                            <RectButton
                              style={styles.buttonRemove}
                              onPress={() => {
                                setId(val.id);
                                handleRemove();
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
                      <Item
                        key={key}
                        id={val.id}
                        name={val.name}
                        price={val.price}
                        stockAvailable={val.stockAvailable}
                        stockQuantity={val.stockQuantity}
                        tagId={val.tagId}
                        userAdmin={val.userAdmin}
                        description={val.description}
                        identification={val.identificationType}
                      />
                      <View style={{}} />
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                          setId(val.id);
                          handleUpdate(
                            val.id,
                            val.name,
                            val.price,
                            val.description,
                            val.stockAvailable,
                            val.stockQuantity,
                            val.tagId,
                            val.identificationType
                          );
                        }}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={29}
                          color={colors.black}
                        />
                      </TouchableOpacity>
                    </Swipeable>
                  );
                })}
              <View style={styles.listSpace} />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.pageFunctions}>
        <ButtonEdit name="plus" size={24} onPress="AddProducts" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  //Configuração da página
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  //Area do gráfico
  chartArea: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray,
  },
  //Area dos produtos
  productsArea: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  // Texto de quando não há item
  noItemText: {
    color: colors.textGray,
  },
  //Flatlist (Lista de produtos)
  productList: {
    width: "100%",
  },
  //espaço após a lista
  listSpace: {
    height: 100,
  },
  //Area de funções da página
  pageFunctions: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
  },
  //Botão de editar
  editButton: {
    width: 65,
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 40,
    right: 10,
  },
  //Botão de deletar
  buttonRemove: {
    width: 100,
    height: 75,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 5,
    right: 15,
  },
});
