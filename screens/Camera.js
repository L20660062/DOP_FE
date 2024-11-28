import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Actualiza el import
import * as Location from 'expo-location';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back'); // Actualiza el valor de facing
  const [permission, requestPermission] = useCameraPermissions(); // Utiliza useCameraPermissions
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [detectedBoxes, setDetectedBoxes] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
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
      } else {
        alert('Location permission not granted');
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        sendImageToBackend(photo.uri);
      }
    }, 1000); // Detect every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const sendImageToBackend = async (uri) => {
    const formData = new FormData();
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('file', {
      uri,
      name: `frame.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch('http://192.168.0.16:5000/detect', {
        method: 'POST',
        body: formData,
      });
      const boxes = await response.json();
      setDetectedBoxes(boxes);
    } catch (error) {
      console.error('Error during object detection: ', error);
    }
  };

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

  let locationText = 'Cargando ubicación...';
  if (address) {
    locationText = `Dirección: ${address.name}, ${address.city}, ${address.region}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} type={facing} ref={cameraRef}>
          {/* Additional UI elements */}
        </CameraView>
      </View>  
      

      <View style={styles.locationContainer}>
        <Text style={styles.label}>{locationText}</Text>
      </View>

      <View style={styles.boxesContainer}>
        {detectedBoxes.map((box, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: box.y1,
              left: box.x1,
              width: box.x2 - box.x1,
              height: box.y2 - box.y1,
              borderWidth: 2,
              borderColor: 'green',
              zIndex: 1,
            }}
          >
            <Text
              style={{
                color: 'green',
                position: 'absolute',
                top: -20,
                left: 0,
                backgroundColor: 'black',
                padding: 5,
              }}
            >
              {box.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  cameraContainer: {
    flex: 0.6,
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '100%',
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
  boxesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
