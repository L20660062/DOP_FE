import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Asegúrate de tener react-navigation instalado

export default function Settings() {
  const navigation = useNavigation();

  const handleChangePassword = () => {
    Alert.alert('Cambio de Contraseña', 'Aquí puedes cambiar tu contraseña.');
  };

  const handleChangePhoneNumber = () => {
    Alert.alert('Cambio de Número', 'Aquí puedes personalizar tu número de teléfono.');
  };

  const handleChangeUser = () => {
    Alert.alert('Cambio de Usuario', 'Aquí puedes cambiar tu usuario.');
  };

  const handleGoToReportes = () => {
    navigation.navigate('Reportes');  // Cambia el nombre a como lo tengas definido en la navegación
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangePhoneNumber}>
          <Text style={styles.buttonText}>Cambiar Número de Teléfono</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangeUser}>
          <Text style={styles.buttonText}>Cambiar Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGoToReportes}>
          <Text style={styles.buttonText}>Ir a Reportes</Text>
        </TouchableOpacity>

        {/* Otras configuraciones */}
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Configuración Adicional', 'Aquí puedes agregar más configuraciones.')}>
          <Text style={styles.buttonText}>Configuración Adicional</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7', // Color de fondo similar a iOS
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Color de texto del título
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
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF', // Color azul de texto, similar a iOS
    textAlign: 'center',
  },
});
