// Geolocalization.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as SMS from 'expo-sms'; // Importar API de SMS
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación

export default function GeolocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null); // Estado para la dirección
  const navigation = useNavigation(); // Obtener el objeto de navegación

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
          timeInterval: 30000, // Actualización cada 30 segundos
          distanceInterval: 1, // Actualización si se mueve más de 1 metro
        },
        async (newLocation) => {
          setLocation(newLocation);
          // Obtener la dirección basada en las coordenadas
          const address = await Location.reverseGeocodeAsync({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
          setAddress(address[0]); // Guardar la primera dirección en el estado
        }
      );

      return () => {
        // Limpiar la suscripción al desmontar el componente
        locationSubscription.remove();
      };
    })();
  }, []);

  const handleSendLocation = () => {
    navigation.navigate('SendLocation'); 
  };

  const sendLocationSMS = async () => {
    if (location) {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const message = `Mi ubicación actual es:\n${address ? address.name : ''}, ${address ? address.city : ''}, ${address ? address.region : ''}`; // Mensaje con la dirección
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
          Alert.alert('Error', 'No se pudo enviar el SMS.');
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
  } else if (address) {
    text = `Dirección: ${address.name}, ${address.city}, ${address.region}`; // Muestra la dirección
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
            description={address ? `${address.name}, ${address.city}` : 'Aquí estás'}
          />
        </MapView>
      )}

      {/* Botón para enviar la ubicación por SMS usando TouchableOpacity */}
      <TouchableOpacity style={styles.button} onPress={handleSendLocation}>
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
  }
});
