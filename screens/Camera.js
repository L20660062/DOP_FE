//Camera.js   
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text>¡Bienvenido a la pantalla de detección de objetos Con VPC!</Text>
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 325, // Ancho del cuadro
    height: 600, // Altura del cuadro
    backgroundColor: '#4CAF99', // Color de fondo del cuadro
    marginTop: 20, // Espaciado entre el texto y el cuadro
  },
});
