import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as SMS from 'expo-sms';  // Importar API de SMS

export default function GeolocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado.');
        return;
      }

      // Iniciar el seguimiento continuo de la ubicación
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Actualización cada 5 segundos
          distanceInterval: 1, // Actualización si se mueve más de 1 metro
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => {
        // Limpiar la suscripción al desmontar el componente
        locationSubscription.remove();
      };
    })();
  }, []);

  const sendLocationSMS = async () => {
    if (location) {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const message = `Mi ubicación actual es:\nLatitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`;
        const { result } = await SMS.sendSMSAsync(
          ['1234567890'], // Reemplaza con el número de teléfono
          message
        );

        // Manejar el resultado del envío de SMS
        if (result === 'sent') {
          Alert.alert('SMS enviado', 'Tu ubicación ha sido enviada.');
        } else if (result === 'cancel') {
          Alert.alert('SMS cancelado', 'El envío del SMS fue cancelado.');
        } else {
          Alert.alert('SMS cancelado', 'El envío del SMS fue cancelado.');
        }
      } else {
        Alert.alert('Error', 'El servicio de SMS no está disponible en este dispositivo.');
      }
    } else {
      Alert.alert('Error', 'No se ha podido obtener la ubicación.');
    }
  };

  let text = 'Cargando ubicación...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitud: ${location.coords.latitude}, Longitud: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,  // Ajusta el zoom del mapa
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            description="Aquí estás"
          />
        </MapView>
      )}

      {/* Botón para enviar la ubicación por SMS usando TouchableOpacity */}
      <TouchableOpacity style={styles.button} onPress={sendLocationSMS}>
        <Text style={styles.buttonText}>Enviar Ubicación por SMS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300, // Altura del mapa
  },
  button: {
    backgroundColor: '#8884ff', // Color de fondo del botón
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20, // Tamaño de fuente del texto
    color: 'white', // Color del texto del botón
    textAlign: 'center',
    //fontWeight: 'bold',
  }
});
