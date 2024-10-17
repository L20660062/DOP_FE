// screens/LoginVoz.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Para iconos
import * as Speech from 'expo-speech';
import * as Permissions from 'expo-permissions';
import * as Audio from 'expo-av';
import Logo from '../assets/Logo.jpg';  // Asegúrate de que la ruta sea correcta
import Fondo from '../assets/fondo.webp';  // Imagen de fondo

const LoginVoz = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);

  // Simula el reconocimiento de voz con una palabra clave
  const keyword = 'Perro125';

  // Función para iniciar el reconocimiento de voz
  const startListening = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Es necesario el permiso de micrófono para usar esta función.');
      return;
    }

    setIsListening(true);
    // Aquí, normalmente se usaría una librería para reconocimiento de voz, como `expo-speech` o un servicio externo
    // pero en este ejemplo vamos a simular que se captura la palabra correcta.
    try {
      // Configura y empieza a grabar
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      // Simula escuchar por unos segundos
      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        setIsListening(false);

        // Aquí, en un caso real, analizarías la grabación y extraerías el texto
        const simulatedResponse = 'Perro125'; // Respuesta simulada

        if (simulatedResponse === keyword) {
          navigation.replace('Regresar'); // Redirige a la pantalla principal si coincide
        } else {
          Alert.alert('Error', 'Palabra clave incorrecta');
        }
      }, 5000); // Escucha por 5 segundos
    } catch (error) {
      setIsListening(false);
      Alert.alert('Error', 'No se pudo iniciar el reconocimiento de voz.');
    }
  };

  return (
    <ImageBackground source={Fondo} style={styles.background}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Iniciar Sesión por Voz</Text>
          <TouchableOpacity style={styles.button} onPress={startListening}>
            <Text style={styles.buttonText}>
              {isListening ? 'Escuchando...' : 'Presiona para hablar'}
            </Text>
            <Ionicons name="mic-outline" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: -80,
    width: 250,
    height: 250,
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8884ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
});

export default LoginVoz;
