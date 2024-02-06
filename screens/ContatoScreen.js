import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function ContatoScreen( { route }) {
  var { id, CONTACTS } = route.params;
  const nome = CONTACTS[id].name;
  const foto = CONTACTS[id].img
  const numero = CONTACTS[id].phone;
  const navigation = useNavigation();
  CONTACTS.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  CONTACTS.map((contact, index) => {
    contact.id = index;
   });
  var contatoAux = CONTACTS;
  
  const alertaConfirmacao = () => {
    Alert.alert(
      'Deletar Contato', 
      'Tem certeza de que deseja deletar este contato?', 
      [
        {
          text: 'Sim',
          onPress: () => 
          {
            contatoAux.splice(id, 1);
            contatoAux.map((contact, index) => {
              contact.id = index;
             });
            navigation.navigate('Principal', {contatosAux: contatoAux});
          },
        },
        {
          
          text: 'Não',
          style: 'destructive'
        },
      ],
      { cancelable: false } 
    );
  };

  return (
  <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
    <ScrollView>
   <View style={styles.header}>
    <TouchableOpacity onPress={() => {
                        
                        navigation.navigate('Principal', {contatosAux: contatoAux});
                      }}>
    <Image
                            alt=""
                            resizeMode="cover"
                            source={{ uri:"https://cdn-icons-png.flaticon.com/512/3114/3114883.png" }}
                            style={styles.backImg} />
    </TouchableOpacity>
    </View>
    
    <View style={styles.container}>
    {foto ? (
                          <Image
                            alt=""
                            resizeMode="cover"
                            source={{ uri: foto  }}
                            style={styles.contatoImg} />
                        ) : (
                          <View style={[styles.contatoImg, styles.cardAvatar]}>
                            <Text style={styles.cardAvatarText}>{nome[0]}</Text>
                          </View>
                        )}
   <Text style={styles.nomeText}>{nome}</Text>
   <Text style={styles.numeroText}>{numero}</Text>
   </View>


   <View style={styles.buttonsContainer}>

   <TouchableOpacity style={styles.buttons} onPress={() => {
                        navigation.navigate("Nulo")
                      }}>
    <Image
                            alt=""
                            resizeMode="cover"
                            source={require('../imagens/ligar.png')}
                            style={styles.buttonImg} />
    <Text style={{paddingLeft: 20, fontSize: 24, paddingBottom: 3, fontWeight: '500'}}>Ligar</Text>
    </TouchableOpacity>
                      </View>
                      <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.buttons} onPress={() => {
                        navigation.navigate("Nulo")
                      }}>
    <Image
                            alt=""
                            resizeMode="cover"
                            source={require('../imagens/mensagem.png')}
                            style={styles.buttonImg} />
    <Text style={{paddingLeft: 20, fontSize: 24, paddingBottom: 10, fontWeight: '500'}}>Mensagem</Text>
    </TouchableOpacity>
    </View>
    <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.buttons} onPress={() => {
                        navigation.navigate("Adicionar", {
                          id: id,
                          editar: true
                        })
                      }}>
    <Image
                            alt=""
                            resizeMode="cover"
                            source={require('../imagens/editar.png')}
                            style={styles.buttonImg} />
    <Text style={{paddingLeft: 20, fontSize: 24, paddingBottom: 3, fontWeight: '500'}}>Editar Contato</Text>
    </TouchableOpacity>
    </View>
    <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.buttons} onPress={alertaConfirmacao}>
    <Image
                            alt=""
                            resizeMode="cover"
                            source={require('../imagens/deletar.png')}
                            style={styles.buttonImg} />
    <Text style={{paddingLeft: 20, fontSize: 24, paddingBottom: 3, fontWeight: '500'}}>Deletar Contato</Text>
    </TouchableOpacity>
    </View>
   <View>
   <Image
                            alt=""
                            resizeMode="cover"
                            source={require('../imagens/3pontos.png')}
                            style={ {
                              alignSelf: 'center',
                              paddingTop: 70,
                              width: 40,
                              height: 40,
                              resizeMode: 'contain',
                              opacity: 0.3
                            }
                            } />

   </View>
   </ScrollView>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: "center",
    borderBottomWidth: 3,
    borderColor: '#BFBFBF',
  },
  buttonsContainer: {
    paddingVertical: 24,
    backgroundColor: '#EDEDED',
    alignItems: "center",
    borderBottomWidth: 3,
    borderColor: '#d6d6d6',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 'auto',
    paddingLeft: 70,
    
  },
  buttonImg: {
    width: 50,
    height: 50,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 34
  },
  backImg: {
    width: 32,
    height: 36,
    resizeMode: 'stretch'
  },
  contatoImg: {
    width: 170,
    height: 170,
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
  nomeText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 10
  },
  numeroText: {
    fontSize: 20,
    color: '#737373',
    paddingTop: 10,
  }
});