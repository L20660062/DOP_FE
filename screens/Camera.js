import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back'); // Usar CameraType en lugar de Camera.Constants.Type
  const [permission, requestPermission] = useCameraPermissions(); // Usar useCameraPermissions
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null); // Estado para la dirección
  const [addressList, setAddressList] = useState([]); // Estado para la lista de direcciones
  const [locationSubscription, setLocationSubscription] = useState(null); // Estado para la suscripción

  useEffect(() => {
    // Solicitar permisos de ubicación y observar la ubicación
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 5,
          },
          async (newLocation) => {
            setLocation(newLocation);
            const addr = await Location.reverseGeocodeAsync({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
            if (addr.length > 0) {
              const newAddress = addr[0];
              setAddress(newAddress);
              setAddressList((prevList) => [
                ...prevList,
                `${newAddress.name}, ${newAddress.city}, ${newAddress.region}`,
              ]);
            }
          }
        );
        setLocationSubscription(subscription); // Guardar la suscripción
      } else {
        alert('Location permission not granted');
      }
    })();

    // Limpiar la suscripción al desmontar el componente
    return () => {
      if (locationSubscription) {
        locationSubscription.remove(); // Detener la observación de la ubicación
      }
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

  // Formato del texto a mostrar en función de la dirección
  let locationText = 'Cargando ubicación...';
  if (address) {
    locationText = `Dirección: ${address.name}, ${address.city}, ${address.region}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} type={facing}>
          <View style={styles.buttonContainer}>
            <Button
              title="Cambiar cámara"
              onPress={() =>
                setFacing((prev) =>
                  prev === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />
          </View>
        </CameraView>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.label}>{locationText}</Text>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Historial de Ubicaciones</Text>
        <FlatList
          data={addressList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  cameraContainer: {
    flex: 0.6,
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  locationContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    flex: 0.25,
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listItemContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  listItem: {
    fontSize: 14,
    color: '#555',
  },
});
