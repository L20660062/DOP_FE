import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native';
import { Audio } from 'expo-av'; // Para reproducir sonidos
import { Ionicons } from '@expo/vector-icons'; // Para íconos
import { useNavigation } from '@react-navigation/native'; // Para detectar la navegación y detener el sonido

export default function Sounds() {
  const [selectedSound, setSelectedSound] = useState(null);
  const [sound, setSound] = useState();
  const [scaleValue] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  const soundsList = [
    { id: 1, name: 'Alerta 1', file: require('../assets/sounds/alert1.mp3') },
    { id: 2, name: 'Alerta 2', file: require('../assets/sounds/alert2.mp3') },
    { id: 3, name: 'Alerta 3', file: require('../assets/sounds/alert3.mp3') },
  ];

  // Detener el sonido cuando el usuario regrese a la ventana anterior
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [navigation, sound]);

  // Función para detener el sonido actual si hay uno en reproducción
  async function stopPreviousSound() {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  }

  // Reproducir el sonido seleccionado
  async function playSound(soundFile) {
    await stopPreviousSound();

    const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
    setSound(newSound);
    await newSound.playAsync();
  }

  // Mostrar el cuadro de confirmación al seleccionar un sonido
  const handleSelectSound = (soundItem) => {
    // Reproduce el sonido inmediatamente cuando el usuario toca una opción
    playSound(soundItem.file);

    Alert.alert(
      'Confirmación',
      `¿Deseas seleccionar el sonido "${soundItem.name}"?`,
      [
        {
          text: 'Cancelar',
          onPress: async () => {
            // Si cancela, detenemos el sonido
            await stopPreviousSound();
          },
        },
        {
          text: 'Aceptar',
          onPress: async () => {
            setSelectedSound(soundItem.id);
            animateSoundSelection(); // Ejecutar la animación
          },
        },
      ]
    );
  };

  // Animación de escala al seleccionar el sonido
  const animateSoundSelection = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Selecciona un Sonido de Alerta</Text>
      {soundsList.map((soundItem) => (
        <TouchableOpacity
          key={soundItem.id}
          style={[
            styles.soundOption,
            selectedSound === soundItem.id ? styles.soundSelected : null,
          ]}
          onPress={() => handleSelectSound(soundItem)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={selectedSound === soundItem.id ? 'volume-high' : 'volume-medium'}
            size={24}
            color={selectedSound === soundItem.id ? '#512DA8' : '#333'}
            style={styles.icon}
          />
          <Animated.View style={[styles.textContainer, { transform: [{ scale: selectedSound === soundItem.id ? scaleValue : 1 }] }]}>
            <Text style={styles.soundText}>{soundItem.name}</Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  soundOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  soundSelected: {
    backgroundColor: '#EDE7F6', // Color de fondo si está seleccionado
    borderWidth: 2,
    borderColor: '#512DA8',
  },
  soundText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginLeft: 15,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
