// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/Camera';  
import Reportes from './screens/Reportes';  
import AnswerReporte from './screens/AnswerReporte';  
import EvadedObjects from './screens/EvadedObjects';  
import Sounds from './screens/Sounds';  
import ChangeUser from './screens/ChangeUser';
import ChangePhoneNumber from './screens/ChangePhoneNumber';
import Geolocalizacion from './screens/Geolocalization';  
import Settings from './screens/Settings';  
import User from './screens/User';  
import { Ionicons } from '@expo/vector-icons';  
import ChangePassword from './screens/ChangePassword';
import LoginScreen from './screens/LoginScreen';  
import LoginVoz from './screens/LoginVoz';  
import SendLocation from './screens/SendLocation';
import EmergencyContacts from './screens/EmergencyContacts';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

const TitleWithImage = () => (
  <View style={styles.titleContainer}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Detección de Objetos</Text>
  </View>
);

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Detección de Objetos') {
            iconName = 'camera';
          } else if (route.name === 'Geolocalización') {
            iconName = 'location';
          } else if (route.name === 'Usuario') {
            iconName = 'person';
          } else if (route.name === 'Ajustes') {
            iconName = 'build';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
      })}
    >
      <Tab.Screen 
        name="Detección de Objetos" 
        component={CameraScreen} 
        options={{ 
          tabBarLabel: 'Cámara',
          title: 'Detección de Objetos',
          headerTitle: () => <TitleWithImage />,
        }}  
      />
      <Tab.Screen 
        name="Geolocalización" 
        component={Geolocalizacion} 
        options={{ 
          tabBarLabel: 'Geolocalización',
          headerTitle: 'Geolocalización',
        }}  
      />
      <Tab.Screen 
        name="Usuario" 
        component={User} 
        options={{ 
          tabBarLabel: 'Usuario',
          headerTitle: 'Perfil de Usuario',
        }}  
      />
      <Tab.Screen 
        name="Ajustes" 
        component={Settings} 
        options={{ 
          tabBarLabel: 'Ajustes',
          headerTitle: 'Configuración de Ajustes',
        }}  
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Oculta el encabezado
        />
        <Stack.Screen 
          name="Regresar" 
          component={TabNavigator} 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="Reportes" 
          component={Reportes} 
          options={{ headerShown: true }}
        />
        <Stack.Screen 
            name="AnswerReporte" 
            component={AnswerReporte} 
            options={{ title: 'Respustas a Reporte' }} 
          />
          <Stack.Screen 
            name="EvadedObjects" 
            component={EvadedObjects} 
            options={{ title: 'Objetos Evadidos' }} 
          />
          <Stack.Screen 
            name="Sounds" 
            component={Sounds} 
            options={{ title: 'Sonidos' }} 
          />
        <Stack.Screen 
          name="ChangeUser" 
          component={ChangeUser} 
          options={{ title: 'Cambiar Usuario' }} 
        />
        <Stack.Screen 
          name="ChangePhoneNumber" 
          component={ChangePhoneNumber} 
          options={{ title: 'Cambiar Número de Teléfono' }} 
        />
        <Stack.Screen 
          name="ChangePassword" 
          component={ChangePassword} 
          options={{ title: 'Cambiar Contraseña' }} 
        />
        <Stack.Screen 
          name="SendLocation"  
          component={SendLocation} 
          options={{ title: 'Enviar Ubicación' }} 
          />
          <Stack.Screen 
          name="EmergencyContacts"  
          component={EmergencyContacts} 
          options={{ title: 'Emergencia' }} 
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
});
