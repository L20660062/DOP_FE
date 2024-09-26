//Camera.js   
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';

export default function CameraScreen() {
  const [facing, setFacing] = useState(Camera.Constants.Type.back); // Use Camera.Constants.Type
  const [permission, requestPermission] = Camera.useCameraPermissions(); // Correct desctructuring
  const [type, setType] = useState(CameraType.back);

    // Agrega el console.log aquí para ver el estado de permission
    console.log(permission); // Esto imprimirá el estado de los permisos en la consola.

    // Handle camera permission request
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('We need camera permissions to make this work!');
        }
      })();
    }, []);
  
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }

    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      );
    }

    function toggleCameraFacing() {
      setFacing(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
    }
  



  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Detectando Objetos...</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
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
});
