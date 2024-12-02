import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech'; // Importa expo-speech para la voz

const DETECTION_INTERVAL_MS = 1500; // Intervalo de detección en milisegundos (5 segundos)

export default function CameraScreen() {
  const [facing, setFacing] = useState('back'); 
  const [permission, requestPermission] = useCameraPermissions(); 
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [detectedBoxes, setDetectedBoxes] = useState([]);
  const cameraRef = useRef(null);

  const genderDictionary = {
    "persona": "femenino",
    "bicicleta": "femenino",
    "carro": "masculino",
    "moto": "femenino",
    "avión": "masculino",
    "camión": "masculino",
    "tren": "masculino",
    "camioneta": "femenino",
    "lancha": "femenino",
    "semáforo": "masculino",
    "hidrante": "masculino",
    "señal de alto": "femenino",
    "parquímetro": "masculino",
    "banca": "femenino",
    "pájaro": "masculino",
    "gato": "masculino",
    "perro": "masculino",
    "caballo": "masculino",
    "borrego": "masculino",
    "vaca": "femenino",
    "elefante": "masculino",
    "oso": "masculino",
    "cebra": "femenino",
    "jirafa": "femenino",
    "mochila": "femenino",
    "sombrilla": "femenino",
    "bolsa": "femenino",
    "corbata": "femenino",
    "maleta": "femenino",
    "frisbee": "masculino",
    "esquís": "masculino",
    "tabla de snowboard": "femenino",
    "pelota": "femenino",
    "papalote": "masculino",
    "bate de béisbol": "masculino",
    "guante de béisbol": "masculino",
    "patineta": "femenino",
    "tabla de surf": "femenino",
    "raqueta de tenis": "femenino",
    "botella": "femenino",
    "copa de vino": "femenino",
    "taza": "femenino",
    "tenedor": "masculino",
    "cuchillo": "masculino",
    "cuchara": "femenino",
    "tazón": "masculino",
    "plátano": "masculino",
    "manzana": "femenino",
    "sándwich": "masculino",
    "naranja": "femenino",
    "brócoli": "masculino",
    "zanahoria": "femenino",
    "hot dog": "masculino",
    "pizza": "femenino",
    "donita": "femenino",
    "pastel": "masculino",
    "silla": "femenino",
    "sofá": "masculino",
    "planta en maceta": "femenino",
    "cama": "femenino",
    "comedor": "masculino",
    "escusado": "masculino",
    "tele": "femenino",
    "laptop": "femenino",
    "mouse": "masculino",
    "control": "masculino",
    "teclado": "masculino",
    "celular": "masculino",
    "microondas": "masculino",
    "horno": "masculino",
    "tostador": "masculino",
    "lavabo": "masculino",
    "refrigerador": "masculino",
    "libro": "masculino",
    "reloj": "masculino",
    "florero": "masculino",
    "tijeras": "femenino",
    "oso de peluche": "masculino",
    "secadora de pelo": "femenino",
    "cepillo de dientes": "masculino"
  };


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
    }, DETECTION_INTERVAL_MS);

    return () => clearInterval(interval); 
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
      const { detections } = await response.json();
      setDetectedBoxes(detections || []);
      announceDetections(detections || []);
    } catch (error) {
      console.error('Error during object detection: ', error);
    }
  };

  const getArticle = (label, count) => {
    const gender = genderDictionary[label] || 'masculino'; // Por defecto masculino
    const article = gender === 'femenino' ? (count === 1 ? 'una' : `${count}`) : (count === 1 ? 'un' : `${count}`);
    return `${article} ${label}`;
  };
  
  const announceDetections = (detections) => {
    if (detections.length === 0) {
      Speech.speak('No se detectaron objetos', { rate: 1.5, voice: 'es-ES' });
      return;
    }
  
    const messages = detections.map((box) => getArticle(box.label, box.count));
    Speech.speak(messages.join('. '), { rate: 1.5, voice: 'es-ES' });
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
});
