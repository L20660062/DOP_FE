import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuro

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

  const handleResponseReport = () => {
    Alert.alert('Funcionalidad no implementada', 'Esta opción aún no está disponible.');
  };

  const handleEvadedObjects = () => {
    Alert.alert('Funcionalidad no implementada', 'Esta opción aún no está disponible.');
  };

  const handleSendLocation = () => {
    navigation.navigate('SendLocation'); 
  };

  const handleEmergencyContacts = () => {
    navigation.navigate('EmergencyContacts'); 
  };

  const handleSounds = () => {
    Alert.alert('Funcionalidad no implementada', 'Esta opción aún no está disponible.');
  };

  const handleVibrations = () => {
    Alert.alert('Funcionalidad no implementada', 'Esta opción aún no está disponible.');
  };

  const toggleSwitch = () => {
    setIsDarkMode(previousState => !previousState);
    Alert.alert('Modo Oscuro', `Modo oscuro ${!isDarkMode ? 'activado' : 'desactivado'}.`);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.switchContainer} onPress={toggleSwitch} activeOpacity={0.7}>
        <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color="#007AFF" style={styles.icon} />
        <Text style={styles.switchText}>  Modo Oscuro</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
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

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.button} onPress={handleGoToReportes} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Ir a Reportes</Text>
        </TouchableOpacity>

        {/* Nuevos apartados */}
        <TouchableOpacity style={styles.button} onPress={handleResponseReport} activeOpacity={0.7}>
          <Ionicons name="chatbubbles-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Respuesta de Reporte</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.button} onPress={handleEvadedObjects} activeOpacity={0.7}>
          <Ionicons name="alert-circle-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Objetos Evadidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSounds} activeOpacity={0.7}>
          <Ionicons name="volume-high-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Sonidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleVibrations} activeOpacity={0.7}>
          <Ionicons name="vibration-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Vibraciones</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.button} onPress={handleSendLocation} activeOpacity={0.7}>
          <Ionicons name="location-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Enviar Ubicación a</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleEmergencyContacts} activeOpacity={0.7}>
          <Ionicons name="people-outline" size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.buttonText}>Contactos de Emergencia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  spacer: {
    height: 20, // Ajusta la altura según necesites
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  switchText: {
    fontSize: 18,
    color: '#007AFF',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF',
    textAlign: 'left',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
