import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons


export default function Settings() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuros

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword'); 
  };

  const handleChangePhoneNumber = () => {
    navigation.navigate('ChangePhoneNumber'); 
  };

  const handleChangeUser = () => {
    navigation.navigate('ChangeUser'); 
  };

  const handleGoToReportes = () => {
    navigation.navigate('Reportes'); 
  };

  const toggleSwitch = () => {
    setIsDarkMode(previousState => !previousState);
    Alert.alert('Modo Oscuro', `Modo oscuro ${!isDarkMode ? 'activado' : 'desactivado'}.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <TouchableOpacity style={styles.switchContainer} onPress={toggleSwitch} activeOpacity={0.7}>
        <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color="#007AFF" style={styles.icon} />
        <Text style={styles.switchText}>  Modo Oscuro</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }} // Color de la pista
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'} // Color del botón
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword} activeOpacity={0.7}>
          <Ionicons name="lock-closed-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangePhoneNumber} activeOpacity={0.7}>
          <Ionicons name="call-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Cambiar Número de Teléfono</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangeUser} activeOpacity={0.7}>
          <Ionicons name="person-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Cambiar Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGoToReportes} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Ir a Reportes</Text>
        </TouchableOpacity>
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7', // Color de fondo
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Color de texto del título
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF', // Color de fondo del contenedor del switch
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Color del borde inferior del switch
  },
  switchText: {
    fontSize: 18,
    color: '#007AFF', // Color de texto del switch
    flex: 1, // Para que el texto ocupe el espacio disponible
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden', // Asegura que los bordes redondeados se mantengan
  },
  button: {
    backgroundColor: '#FFFFFF', // Color de fondo de los botones
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Color del borde inferior de los botones
    justifyContent: 'flex-start', // Alinear el contenido hacia la izquierda
    flexDirection: 'row', // Mostrar icono y texto en fila
    alignItems: 'center', // Centrar verticalmente
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF', // Color azul de texto
    textAlign: 'left', // Alinear texto a la izquierda
    marginLeft: 10, // Espacio entre el icono y el texto
  },
  icon: {
    marginRight: 10, // Espacio entre el icono y el texto
  },
});
