import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/Camera';  // Pantalla de detección de objetos
import Reportes from './screens/Reportes';  // Pantalla de reportes
import ChangeUser from './screens/ChangeUser';
import ChangeChangePhoneNumber from './screens/ChangePhoneNumber';
import Geolocalizacion from './screens/Geolocalization';  // Pantalla de geolocalización
import Settings from './screens/Settings';  // Pantalla de configuración
import User from './screens/User';  // Pantalla de usuario
import { Ionicons } from '@expo/vector-icons';  // Para iconos
import ChangePhoneNumber from './screens/ChangePhoneNumber';
import ChangePassword from './screens/ChangePassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

// Componente para el título con imagen
const TitleWithImage = () => (
  <View style={styles.titleContainer}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Detección de Objetos</Text>
  </View>
);

// Navegación por pestañas (parte inferior)
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
          tabBarLabel: 'Cámara',  // Nombre personalizado para la pestaña inferior
          title: 'Detección de Objetos', // Título diferente para la navegación inferior
          headerTitle: () => <TitleWithImage />, // Usar el componente de título
        }}  
      />
      
      <Tab.Screen 
        name="Reportes" 
        component={Reportes} 
        options={{ 
          tabBarLabel: 'Reportes',  // Nombre personalizado para la pestaña inferior
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
              Reportes
            </Text>
          ),  // Componente personalizado para el título
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
          name="Regresar" 
          component={TabNavigator} 
          options={{ 
            headerShown: false // Desactivar el encabezado
          }} 
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
    marginRight: 5, // Espacio entre el texto y la imagen
  },
});