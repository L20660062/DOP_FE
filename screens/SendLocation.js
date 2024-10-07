// SendLocation.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';

const CONTACTS = [
  { id: '1', name: 'Contacto 1', phone: '1234567890' },
  { id: '2', name: 'Contacto 2', phone: '0987654321' },
  { id: '3', name: 'Contacto 3', phone: '1122334455' },
];

export default function SendLocation() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    sendLocationToContacts(loc.coords);
  };

  const sendLocationToContacts = (coords) => {
    const message = `Estoy compartiendo mi ubicación. Mi ubicación actual es: https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    
    // Asegurarse de que haya un contacto seleccionado
    if (!selectedContact) {
      Alert.alert('Atención', 'Selecciona un contacto.');
      return;
    }

    const contact = CONTACTS.find(contact => contact.id === selectedContact);
    if (contact) {
      const url = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'No se pudo abrir la aplicación de mensajería');
      });
    }
  };

  const toggleContactSelection = (id) => {
    setSelectedContact(prevSelectedContact => 
      prevSelectedContact === id ? null : id
    );
  };

  const sendLocation = () => {
    getLocation();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el contacto de emergencia:</Text>
      <FlatList
        data={CONTACTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.contactItem, selectedContact === item.id && styles.selectedContact]}
            onPress={() => toggleContactSelection(item.id)}
          >
            <Icon name="person-circle-outline" size={30} color="#333" style={styles.icon} />
            <Text style={styles.contactText}>{item.name}</Text>
            {selectedContact === item.id && (
              <Icon name="checkmark-circle" size={20} color="#4caf50" />
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={sendLocation}>
        <Text style={styles.buttonText}>Enviar Ubicación</Text>
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
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  contactItem: {
    height: 60, // Altura fija para evitar cambios de tamaño
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 10,
  },
  selectedContact: {
    backgroundColor: '#d0f0c0',
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Para que el texto ocupe el espacio restante
    marginLeft: 10, // Espacio entre el ícono y el texto
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el texto
  },
  button: {
    backgroundColor: '#8884ff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
