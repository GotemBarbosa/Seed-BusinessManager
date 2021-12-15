// Importação Obrigatória
import React, { useContext, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";

// Bibliotecas
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Axios from 'axios';

// Importação de Componentes
import PageTicket from "../../components/PageTicket";
import Header from "../../components/Header";
import boxImg from '../../assets/Box.png'

// Configurações
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import CostChartContexts from '../../contexts/CostChartContexts';
import MainChartContexts from '../../contexts/MainChartContexts'; 
import StoreDataContexts from "../../contexts/StoreDataContexts";
import ImportantDataContext from "../../contexts/ImportantDataContexts";
import DataAcessContexts from "../../contexts/DataAcessContexts";

export default function AddEmployees() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [avarage, setAvarage] = useState(0);
  const [cost, setCost] = useState("");
  const [selectedOption, setSelectedOption] = useState("none")

  const  {data} = useContext(ImportantDataContext)
  const  {dispatch} = useContext(DataAcessContexts)
  const {dispatchM} = useContext(MainChartContexts)
  const {dispatchC} = useContext(CostChartContexts)
  const {dispatchSD} = useContext(StoreDataContexts)

  const insertRawMaterial = async () => {
    if(name == "" || cost == "" || avarage=="" || isNaN(cost) == true || isNaN(avarage) == true) {
      Alert.alert("Erro", "Nenhum campo deve estar vazio ou ter um valor inválido", 
        [
          { text: "OK", onPress: () => {} }
        ]
      );
    }else{
      await Axios.post(data.IPV4+"/rawmaterials/insert", {
        name: name,
        value: cost,
        quantity: avarage,
        userAdmin: data.userId,
        identificationType: selectedOption,
      }).then((response) => {dispatch({type: 'FETCH_SUCCESS'})}).catch(re => {console.log('Erro: '+re)});
  
      dispatchM({
        type: 'changeChart',
      })
  
      dispatchC({
        type: 'changeChart',
      })
      dispatchSD({
        type: 'updateData',
      })
  
      navigation.navigate('Confirmation',{
        type:'Insert',
        item:'RawMaterial'
      })
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Matéria Prima" icon={true} navigate="AuthRoutes" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ticketTitleView}>
          <PageTicket
            title="Adicionar matéria prima"
            color={colors.primaryColor}
            image="box"
          />
        </View>

        <View style={styles.rawMaterialIdentificationView}>
            <View style={styles.rawMaterialIdentificationOption}>
              <TouchableOpacity 
              style={[styles.identificationOption,selectedOption==='first'?styles.selectedStyle:{}, {backgroundColor:colors.red}]}
              onPress={()=>{
                selectedOption==='first'?setSelectedOption('none'):setSelectedOption('first')
              }}
              >
                <Image source={boxImg} style={styles.Image} />    
              </TouchableOpacity>
            </View>
            <View style={styles.rawMaterialIdentificationOption}>
              <TouchableOpacity 
                style={[styles.identificationOption,selectedOption==='second'?styles.selectedStyle:{}, {backgroundColor:colors.secondaryColor}]}
                onPress={()=>{
                  selectedOption==='second'?setSelectedOption('none'):setSelectedOption('second')

                }}
              >
                <Image source={boxImg} style={styles.Image} />
              </TouchableOpacity>
            </View>
            <View style={styles.rawMaterialIdentificationOption}>
              <TouchableOpacity 
                style={[styles.identificationOption,selectedOption==='third'?styles.selectedStyle:{}, {backgroundColor:colors.primaryColor}]}
                onPress={()=>{
                  selectedOption==='third'?setSelectedOption('none'):setSelectedOption('third')
                }}
              >
                <Image source={boxImg} style={styles.Image} />
              </TouchableOpacity>
            </View>
          </View>

        <View style={styles.inputView}>
          <View style={styles.item}>
            <Text style={styles.text}>Nome: </Text>
            <TextInput
              style={styles.input}
              placeholder="Insira o nome"
              onChangeText={(text)=>setName(text)}
              maxLength={30}
            />
          </View>
          <View style={styles.item}> 
            <Text style={styles.text}>Quantidade: </Text>
            <TextInput
              style={styles.input}
              placeholder="Insira a quantidade"
              keyboardType="numeric"
              onChangeText={(text)=>setAvarage(Number(text.replace(",", ".")))}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Custo: </Text>
            <TextInput
              style={styles.input}
              placeholder="Insira o custo"
              keyboardType="numeric"
              onChangeText={(text)=>setCost(Number(text.replace(",", ".")))}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: "rgba(126, 217, 87, 0.87)" },
              ]}
              onPress={insertRawMaterial}
            >
              <Text style={styles.textButton}> Salvar</Text>
              <Entypo name="check" size={25} color="white" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  //Ticket da página
  ticketTitleView: {
    width: 250,
  },
  rawMaterialIdentificationView:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 15,
  },
  rawMaterialIdentificationOption:{
    height: 100,
    marginHorizontal: 15,
  },
  Image:{
    height: 50,
    width: 50
  },
  identificationOption:{
    height: 85,
    width: 85,
    opacity: 0.70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStyle: {
    borderWidth: 4, 
    borderColor: colors.green,
  },
  //Formulário
  inputView: {
    paddingHorizontal: 5,
    flex: 1,
  },
  item:{
    width: '100%',
    alignItems: 'center',
  },  
  //Titulo de cada entrada
  text: {
    width: '90%',
    marginHorizontal: 15,
    paddingVertical: 5,
    fontFamily: fonts.heading,
    fontSize: 15,
  },
  //Caixas de texto
  input: {
    color: colors.darkGray,
    width: "95%",
    height: 45,
    fontSize: 14,
    padding: 10,
    textAlign: "left",
    borderRadius: 15,
    borderColor: colors.black,
    backgroundColor: "rgba(242, 242, 242, 1)",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    marginHorizontal: 10,
  },

  textButton: {
    color: colors.white,
    fontSize: 25,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  //Botão de salvar
  saveButton: {
    marginTop: 10,
    marginBottom: 10,
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
});
