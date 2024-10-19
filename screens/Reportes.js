//Reportes.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Para usar íconos de Ionicons

export default function Reportes() {
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Función para manejar el envío del comentario
  const handleSubmit = () => {
    if (comment.trim()) {
      console.log('Comentario:', comment);
      console.log('Imagen seleccionada:', selectedImage);
      alert('Comentario y foto enviados correctamente');
      setComment(''); // Limpiar el campo de texto
      setSelectedImage(null); // Limpiar la imagen seleccionada
    } else {
      alert('Por favor, ingresa un comentario');
    }
  };

  // Función para seleccionar una imagen
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Se requiere permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reporte de Fallos</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe el problema que encontraste..."
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {/* Botón personalizado para subir la foto */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Ionicons name="camera-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Subir Foto</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="send-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.submitButtonText}>Enviar Comentario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 120,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlignVertical: 'top',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  submitButton: {
    borderRadius: 25,
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
