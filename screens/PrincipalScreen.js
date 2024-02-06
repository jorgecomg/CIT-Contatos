import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'



export default function PrincipalScreen({ route }) {
  var { contatosAux } = route.params;
  [CONTACTS, setContatos] = useState(contatosAux.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())));

  var contatosAgrupados = CONTACTS.reduce((acc, contatoAt) => {
    var firstLetra = contatoAt.name[0].toUpperCase();
    if (!acc[firstLetra]) acc[firstLetra] = [];
    acc[firstLetra].push(contatoAt);
    return acc;
   }, {});


  const navigation = useNavigation();


  return (
    <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contatos</Text>
        </View>
        <TouchableOpacity onPress={() => {
                        navigation.navigate("Adicionar", {
                          id: -1,
                          editar: false
                        })
                      }}>
        <Text style={{paddingHorizontal: 24, fontSize: 22, fontWeight: '700', color: '#03a1fc',}}>+ Adicionar Contato</Text>
        </TouchableOpacity>
          <View style={styles.section}>
            <View style={styles.sectionItems}>
              {Object.keys(contatosAgrupados).map((letra) => (
 <View key={letra}>
    <Text style={styles.sectionTitle}>{letra}</Text>

    {/*nem com uma ARMA APONTADA NA MINHA CABEÇA eu consigo explicar esse bloco de código a seguir. deus nos elimine.*/}
    {contatosAgrupados[letra].map(({ id, img, name, phone }) => (
      <View key={id} style={styles.cardWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Contato", {
              id: id,
              index: true,
            });
          }}>
          <View style={styles.card}>
            {img ? (
              <Image
                alt=""
                resizeMode="cover"
                source={{ uri: img }}
                style={styles.cardImg} />
            ) : (
              <View style={[styles.cardImg, styles.cardAvatar]}>
                <Text style={styles.cardAvatarText}>{name[0]}</Text>
              </View>
            )}

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{name}</Text>
              <Text style={styles.cardPhone}>{phone}</Text>
            </View>

            <View style={styles.cardAction}>
              <FeatherIcon
                color="#9ca3af"
                name="chevron-right"
                size={22} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ))}
 </View>
))}

            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 14
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  section: {
    marginTop: 12,
    paddingLeft: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  sectionItems: {
    marginTop: 8,
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  },
  cardAction: {
    paddingRight: 16,
  },
});

