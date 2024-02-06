import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function NuloScreen() {
const navigation = useNavigation();
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
    <Text style={{fontWeight: '700', fontSize: 24, paddingBottom: 10}}>essa tela não foi programada :(</Text>
    <Image source={require('../imagens/nulo.png')} />
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
    paddingVertical: 24,
    alignItems: "center",
  },
  backImg: {
    width: 32,
    height: 36,
    borderRadius: 12,
    resizeMode: 'stretch'
  },
});