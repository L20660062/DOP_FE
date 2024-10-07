import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChangePhoneNumber() {
  const [slideAnim] = useState(new Animated.Value(300)); // Comienza fuera de la vista (a la derecha)
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Iniciar animación de deslizamiento al montar el componente
    Animated.timing(slideAnim, {
      toValue: 0, // Mueve a la posición normal
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>Cambiar Número de Teléfono</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={25} color="#8884ff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nuevo Número de Teléfono"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      
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
    justifyContent: 'center', // Centrar verticalmente
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 25, // Bordes redondeados
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 50,
    flex: 1, // Permite que el input ocupe el espacio disponible
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8884ff', // Color del botón
    paddingVertical: 15,
    borderRadius: 25, // Bordes redondeados
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
