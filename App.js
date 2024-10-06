// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from './screens/Camera';  // Pantalla de detección de objetos
import Reportes from './screens/Reportes';  // Pantalla de reportes
import ChangeUser from './screens/ChangeUser';
import ChangePhoneNumber from './screens/ChangePhoneNumber';
import Geolocalizacion from './screens/Geolocalization';  // Pantalla de geolocalización
import Settings from './screens/Settings';  // Pantalla de configuración
import User from './screens/User';  // Pantalla de usuario
import { Ionicons } from '@expo/vector-icons';  // Para iconos
import ChangePassword from './screens/ChangePassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Componente para el título con imagen
const TitleWithImage = () => (
  <View style={styles.titleContainer}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Detección de Objetos</Text>
  </View>
);

// Pantalla de login
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí validas las credenciales (simple validación para ejemplo)
    if (username === 'XD' && password === '1234') {
      // Si las credenciales son correctas, navega a la pantalla principal con pestañas
      navigation.replace('Main'); // 'replace' evita que el usuario regrese al login
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}

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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ocultar encabezado en la pantalla de login
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} // Ocultar encabezado en la pantalla principal
        />
        <Stack.Screen 
          name="Reportes" 
          component={Reportes} 
          options={{ headerShown: true }} // Puedes decidir si quieres que el encabezado se muestre o no
        />
        <Stack.Screen 
          name="ChangeUser" 
          component={ChangeUser} 
          options={{ headerShown: true }} // Puedes decidir si quieres que el encabezado se muestre o no
        />
        <Stack.Screen 
          name="ChangePhoneNumber" 
          component={ChangePhoneNumber} 
          options={{ headerShown: true }} // Puedes decidir si quieres que el encabezado se muestre o no
        />
        <Stack.Screen 
          name="ChangePassword" 
          component={ChangePassword} 
          options={{ headerShown: true }} // Puedes decidir si quieres que el encabezado se muestre o no
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
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
