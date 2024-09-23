import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/Camera';  // Pantalla de detección de objetos
import SettingsScreen from './screens/Settings';  // Pantalla de configuración
import { Ionicons } from '@expo/vector-icons';  // Para iconos

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        {/* Pantalla de Detección de Objetos */}
        <Tab.Screen 
          name="Detección de Objetos" 
          component={CameraScreen} 
          options={{ title: 'Detección de Objetos' }} 
        />
        
        {/* Pantalla de Configuración */}
        <Tab.Screen 
          name="Configuración" 
          component={SettingsScreen} 
          options={{ title: 'Configuración' }}  
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
