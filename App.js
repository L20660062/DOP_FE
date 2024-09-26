//App.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/Camera';  // Pantalla de detección de objetos
import SettingsScreen from './screens/Settings';  // Pantalla de configuración
import { Ionicons } from '@expo/vector-icons';  // Para iconos

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

// Componente para el título con imagen
const TitleWithImage = () => (
  <View style={styles.titleContainer}>
    <Image 
      source={require('./assets/Logo Letras.png')} // Reemplaza con tu imagen
      style={styles.titleImage} 
    />
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
          } else if (route.name === 'Configuración') {
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
        name="Configuración" 
        component={SettingsScreen} 
        options={{ 
          tabBarLabel: 'Ajustes',  // Nombre personalizado para la pestaña inferior
          title: 'Configuración'  // Título para la pestaña
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
          name="Main" 
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
  titleImage: {
    width: 95, // Ajusta el tamaño de la imagen
    height: 95, // Ajusta el tamaño de la imagen
    resizeMode: 'contain',
    marginLeft: 10,
  },
});
