import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrincipalScreen from "./screens/PrincipalScreen";
import ContatoScreen from "./screens/ContatoScreen";
import AdicEditScreen from "./screens/AdicEditScreen";
import NuloScreen from "./screens/NuloScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  const [CONTACTS, atualizarCONTACTS] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fields = 'name,picture,phone';

   
    fetch(`https://randomuser.me/api/?results=50&inc=${fields}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
      
        const userData = jsonResponse.results.map((result) => ({
          id: 0, 
          img: result.picture.medium,
          name: `${result.name.first} ${result.name.last}`,
          phone: result.phone,
        }));

        
        userData.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        atualizarCONTACTS(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro de fetching:', error);
        setLoading(false);
      });
  }, []);

  
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

 
  CONTACTS.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  CONTACTS.map((contact, index) => {
    contact.id = index;
   });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Principal" component={PrincipalScreen} initialParams={{ contatosAux: CONTACTS }} />
        <Stack.Screen name="Contato" component={ContatoScreen} initialParams={{ CONTACTS: CONTACTS, index: true }} />
        <Stack.Screen name="Adicionar" component={AdicEditScreen} initialParams={{ contatosAux: CONTACTS, CONTACTS: CONTACTS, atualizarCONTACTS: atualizarCONTACTS }} />
        <Stack.Screen name="Nulo" component={NuloScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  
  
  
