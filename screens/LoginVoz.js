import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';  // Importar expo-speech
import Logo from '../assets/Logo.jpg';
import Fondo from '../assets/fondo.webp';

const LoginVoz = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState('');

  const keyword = 'Daniel'; // Palabra clave esperada

  // Función para iniciar el reconocimiento de voz simulado
  const startListening = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { status } = await Audio.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Es necesario el permiso de micrófono para usar esta función.');
        return;
      }

      setIsListening(true);

      // Simular la grabación y el reconocimiento de voz
      setTimeout(() => {
        setIsListening(false);

        // Simular una respuesta incorrecta o correcta cambiando este valor
        const simulatedResponse = 'Daniel'; // Cambia esta palabra para simular

        // Mostrar en consola la palabra reconocida
        console.log('Palabra reconocida:', simulatedResponse);

        if (simulatedResponse === keyword) {
          // Decir con el altavoz que va a entrar
          Speech.speak('Palabra reconocida, entrando en la aplicación');
          navigation.replace('Regresar'); // Acceso correcto
        } else {
          // Decir con el altavoz que no lo reconoció
          Speech.speak('Palabra no reconocida, intente de nuevo');
          Alert.alert('Error', 'Palabra clave incorrecta');
        }
      }, 5000); // Simula 5 segundos de grabación

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
