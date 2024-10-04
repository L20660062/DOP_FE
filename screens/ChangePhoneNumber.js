import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';

export default function ChangePhoneNumber() {
  const [slideAnim] = useState(new Animated.Value(300)); // Comienza fuera de la vista (a la derecha)
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Iniciar animación de deslizamiento al montar el componente
    Animated.timing(slideAnim, {
      toValue: 0, // Mueve a la posición normals
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>Cambiar Número de Teléfono</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nuevo Número de Teléfono"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => { /* Lógica para cambiar números */ }}
      >
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // Cambiado para alinear al inicio
    backgroundColor: '#f9f9f9', // Fondo más claro
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10, // Margen reducido
    textAlign: 'center', // Centra el título
    color: '#333', // Color del texto más oscuro
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 8, // Bordes redondeados
    backgroundColor: '#fff', // Fondo blanco para el campo de texto
  },
  button: {
    backgroundColor: '#007BFF', // Color de fondo del botón
    paddingVertical: 15, // Espaciado vertical
    borderRadius: 8, // Bordes redondeados
    alignItems: 'center', // Centrar el texto en el botón
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 18,
    fontWeight: 'bold',
  },
});
