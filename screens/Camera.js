//Camera.js
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Camera } from 'expo-camera/legacy'; // Asegúrate de importar Camera correctamente
import * as Location from 'expo-location'; // Importar Location

export default function CameraScreen() {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null); // Estado para la dirección
  const [addressList, setAddressList] = useState([]); // Estado para la lista de direcciones

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('We need camera permissions to make this work!');
      }
    })();

    // Lógica de ubicación
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        // Iniciar seguimiento de la ubicación
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Cambia a 5000 ms para 5 segundos
            distanceInterval: 1,
          },
          async (newLocation) => {
            setLocation(newLocation);
            const addr = await Location.reverseGeocodeAsync({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
            if (addr.length > 0) {
              const newAddress = addr[0]; // Obtener la primera dirección
              setAddress(newAddress); // Actualizar el estado de la dirección
              setAddressList((prevList) => [
                ...prevList,
                `${newAddress.name}, ${newAddress.city}, ${newAddress.region}`, // Agregar dirección a la lista
              ]);
            }
          }
        );
      } else {
        alert('Location permission not granted');
      }
    })();

    // Limpiar el intervalo al desmontar el componente
    return () => {
      Location.stopObservingLocation();
    };
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  }

  // Formato del texto a mostrar en función de la dirección
  let locationText = 'Cargando ubicación...';
  if (address) {
    locationText = `Dirección: ${address.name}, ${address.city}, ${address.region}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Detectando Objetos...</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{locationText}</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={addressList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.listItem}>{item}</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  cameraContainer: {
    flex: 0.7,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  textContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: 'black',
  },
  listContainer: {
    flex: 0.3,
    padding: 10,
  },
  listItem: {
    fontSize: 14,
    color: 'black',
  },
});
