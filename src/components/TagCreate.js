// Importação Obrigatória
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";

// Bibliotecas
import { AntDesign } from "@expo/vector-icons";
import Axios from "axios";

// Configurações
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// Contextos
import TagsColorsContexts from "../contexts/TagsColorsContexts";
import TagsContexts from "../contexts/TagsContexts";
import ImportantDataContext from "../contexts/ImportantDataContexts";
import DataAcessContexts from "../contexts/DataAcessContexts";

export default function TagCreate() {
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTag, setSelectedTag] = useState(0);

  const [tags, setTags] = useState();
  const [thereIsItens, setThereIsItems] = useState(false);

  const tagsColor = useContext(TagsColorsContexts);
  const { state, dispatch } = useContext(DataAcessContexts);
  const { data } = useContext(ImportantDataContext);
  const { dispatchTg } = useContext(TagsContexts);

  useEffect(() => {
    if (state.loading === true) {
      Axios.get(data.IPV4 + `/tags/get?userId=${data.userId}`).then(
        (response) => {
          setTags(response.data);
          setThereIsItems(true);
        }
      );
      dispatchTg({
        type: "SendId",
        payload: {
          id: 0,
        },
      });
      dispatch({ type: "FETCH_COMPLETED" });
    }
  }, [state]);

  useEffect(() => {
    dispatchTg({
      type: "SendId",
      payload: {
        id: 0,
      },
    });
    Axios.get(data.IPV4 + `/tags/get?userId=${data.userId}`).then(
      (response) => {
        setTags(response.data);
        setThereIsItems(true);
      }
    );
  }, []);

  function handleDeleteTag(id) {
    Alert.alert("Atenção!", "Você tem certeza que deseja deletar esta tag?", [
      {
        text: "Sim",
        onPress: () => {
          Axios.delete(
            data.IPV4 + `/tags/delete?id=${id}&userId=${data.userId}`
          ).then(() => {
            Axios.get(data.IPV4 + `/tags/get?userId=${data.userId}`).then(
              (response) => {
                setTags(response.data);
                setThereIsItems(true);
              }
            );
          });
        },
      },
      { text: "Não", onPress: () => {} },
    ]);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tag,
        { backgroundColor: item.colorName },
        selectedTag == item.id
          ? { borderColor: "#39ff14", borderWidth: 2 }
          : { borderColor: "#fff", borderWidth: 0.5 },
      ]}
      onPress={() => {
        setSelectedTag(item.id);
        dispatchTg({
          type: "SendId",
          payload: {
            id: item.id,
          },
        });
      }}
    >
      <Text style={styles.tagName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => {
          handleDeleteTag(item.id);
        }}
        style={styles.deleteTag}
      >
        <AntDesign name="closecircleo" size={16} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tagButton}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <AntDesign name="pluscircleo" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalTitleArea}>
                <Text style={styles.modalTitle}>Criar Tag</Text>
              </View>
              <Text style={styles.modalText}>Nome da tag: </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Insira o nome"
                onChangeText={(text) => setName(text)}
              />
              <Text style={[styles.modalText, { color: colors.textGray }]}>
                Selecione a cor:
              </Text>
              {thereIsItens === true ? (
                <FlatList
                  scrollEnabled={true}
                  contentContainerStyle={{
                    alignSelf: "center",
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  data={tagsColor.state.tagsColors}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.tagModalSquare,
                        { backgroundColor: item.color },
                        selectedColorId == item.id
                          ? { borderColor: "#39ff14", borderWidth: 2 }
                          : { borderColor: "#fff", borderWidth: 0.5 },
                      ]}
                      onPress={() => {
                        setSelectedColorId(item.id);
                        setSelectedColor(item.color);
                      }}
                    />
                  )}
                />
              ) : null}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.actButton,
                    { backgroundColor: "rgba(217, 87, 87, 0.87)" },
                  ]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSelectedColor("#F7F7F7");
                    setSelectedColorId(2);
                  }}
                >
                  <Text>CANCELAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.actButton,
                    { backgroundColor: "rgba(126, 217, 87, 0.87)" },
                  ]}
                  onPress={() => {
                    if (name == "") {
                      Alert.alert(
                        "Atenção!",
                        "Não pode ter campos em branco?",
                        [
                          {
                            text: "Sim",
                            onPress: () => {},
                          },
                          { text: "Não", onPress: () => {} },
                        ]
                      );
                    } else {
                      Axios.post(data.IPV4 + "/tags/insert", {
                        name: name,
                        colorName: selectedColor,
                        userAdmin: data.userId,
                      })
                        .then((response) => {
                          dispatch({ type: "FETCH_SUCCESS" });
                        })
                        .catch((re) => {
                          console.log("Erro: " + re);
                        });
                      setModalVisible(!modalVisible);
                    }
                  }}
                >
                  <Text>ADICIONAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.viewArea}>
        <View style={styles.tagArea}>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{
                alignSelf: "flex-start",
              }}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={tags}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  //Configuração do componente
  container: {
    flex: 1,
  },
  //Botão para adicionar tagg
  tagButton: {
    marginBottom: 10,
    marginLeft: 25,
  },
  //Modal ------------------
  //View centralizadora
  centeredView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: "30%",
    left: "10%",
    marginTop: 22,
  },
  //Background do modal
  modalBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  //Conteudo do modal
  modalContent: {
    height: 280,
    width: "95%",
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.white,
    elevation: 8,
  },
  //Area do titulo
  modalTitleArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    height: 40,
    alignItems: "center",
  },
  //Titulo
  modalTitle: {
    fontSize: 19,
    fontFamily: fonts.text2,
  },
  //Textos
  modalText: {
    width: "100%",

    marginTop: 3,
    marginBottom: 5,
    fontFamily: fonts.text2,
    fontSize: 16,
  },
  //Caixa de texto
  textInput: {
    color: colors.darkGray,
    width: "100%",
    height: 40,
    fontSize: 14,
    padding: 10,
    textAlign: "left",
    borderRadius: 20,
    borderColor: colors.black,
    backgroundColor: "rgba(242, 242, 242, 1)",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 10,
  },
  //Quadrado com a cor
  tagModalSquare: {
    height: 35,
    width: 35,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: colors.lightGray,
    borderRadius: 5,
  },
  //Botão de ação
  actButton: {
    width: 100,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  //Botões do modal
  modalButtons: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  //Fim Modal --------------

  //Area
  viewArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  //Area das tags
  tagArea: {
    flex: 1,
    width: "90%",
    backgroundColor: "rgba(242, 242, 242, 1)",
    borderRadius: 15,
    paddingLeft: 5,
  },
  //Cada tag
  tag: {
    paddingHorizontal: 10,
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 8,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  //titulo tag
  tagName: {
    color: colors.white,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: fonts.poppinsText,
    fontSize: 11,
  },
  //botão de deletar tag
  deleteTag: {
    marginLeft: 10,
  },
});
