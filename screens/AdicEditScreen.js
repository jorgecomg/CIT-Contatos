import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export default function AdicionarScreen( { route }) {
  
  const navigation = useNavigation();
  var { id, contatosAux, editar } = route.params;

  editar ? (titleString = "Editar") : (titleString = "Adicionar")
  const [nomeAux, setNome] = useState(editar ? (contatosAux[id].name) : (""));
  const [fotoAux, setFoto] = useState(editar ? (contatosAux[id].img) : (""));
  const [numeroAux, setNumero] = useState(editar ? (contatosAux[id].phone) : (""));

  
  salvarContato = () => {
    var index;
    if (id !== -1) {
      contatosAux[id] = {
        id: id,
        img: fotoAux,
        name: nomeAux,
        phone: numeroAux,
      }
      index = true;  
   } else {
    id = contatosAux.length;
    contatosAux.push({
      id: id,
      img: fotoAux,
      name: nomeAux,
      phone: numeroAux,

    });
    index = false;
    

   }
        
        navigation.navigate('Contato', {CONTACTS: contatosAux, id: id, index: index});
  }
   
  return (
  <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
    <View style={styles.header}>
    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                      }}>
    <Image
                            alt=""
                            resizeMode="cover"
                            source={{ uri:"https://cdn-icons-png.flaticon.com/512/3114/3114883.png" }}
                            style={styles.backImg} />
    </TouchableOpacity>
    </View>
    <View style={styles.container}>
          <Text style={{
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 'bold',
            paddingBottom: 20
            }}>
              {titleString} Contato
            </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginRight: 'auto',
          paddingLeft: 20,
        }}>
            {fotoAux ? (
                          <Image
                            alt=""
                            resizeMode="cover"
                            source={{ uri: fotoAux }}
                            style={styles.contatoImg} />
                        ) : (
                          <View style={[styles.contatoImg, styles.cardAvatar]}>
                            <Text style={styles.cardAvatarText}>{nomeAux[0]}</Text>
                          </View>
                        )}
                        <View style={{ paddingLeft: 10 }}>
            <TextInput style={styles.caixaTexto} defaultValue={nomeAux} placeholder='Nome' onChangeText={(newValue) =>setNome(newValue)}></TextInput>
            </View>
    </View>
    <View style={styles.container}>
    <TextInput style={[styles.caixaTexto, { width: 340, marginTop: 20, marginBottom: 50}]} defaultValue={fotoAux} placeholder='Foto (URL)' onChangeText={(newValue) =>setFoto(newValue)}/>
    <TextInput style={[styles.caixaTexto, { width: 340}]} defaultValue={numeroAux} placeholder='Número' keyboardType={'phone-pad'} onChangeText={(newValue) =>setNumero(newValue)}></TextInput> 

    <TouchableOpacity onPress={salvarContato} style={{
      paddingTop: 30
    }}>
    <Text style={{
     fontSize: 32,
     fontWeight: '700',
     color: '#FFFFFF',
     backgroundColor: '#0063FF',
    borderRadius: 15,
    width: 120,
    height: 45,
    textAlign: 'center',
    }}>Salvar</Text>
    </TouchableOpacity>


    </View>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 18,
    paddingTop: 34
  },
  container: {
    paddingVertical: 14,
    alignItems: "center",
  },
  backImg: {
    width: 32,
    height: 36,
    borderRadius: 12,
    resizeMode: 'stretch'
  },
  caixaTexto: {
    fontSize: 18,
    paddingLeft: 10,
    backgroundColor: '#E9E9E9',
    width: 200,
    height: 40,
    borderRadius: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#BFBFBF'
  },
  contatoImg: {
    width: 140,
    height: 140,
    borderRadius: 95,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 10
  },
});