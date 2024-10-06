import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación

// Lista de usuarios limitada a 3
const users = [
  { id: 1, name: 'Usuario 1', avatar: 'https://via.placeholder.com/100?text=ERES' },
  { id: 2, name: 'Usuario 2', avatar: 'https://via.placeholder.com/100?text=UN' },
  { id: 3, name: 'Usuario 3', avatar: 'https://via.placeholder.com/100?text=GEI' },
];

export default function ChangeUser() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [newUsername, setNewUsername] = useState('');
  const navigation = useNavigation(); // Acceder a la función de navegación

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    navigation.navigate('Login'); // Navegar a la pantalla de Login
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: selectedUser.avatar }} // Imagen del usuario seleccionado
        style={styles.profileImage} 
      />
      <Text style={styles.title}>Cambiar Usuario</Text>

      <View style={styles.userList}>
        {users.map(user => (
          <TouchableOpacity 
            key={user.id} 
            style={styles.userItem} 
            onPress={() => handleUserSelect(user)} // Cambia a la función de selección de usuario
          >
            <View style={[styles.userCard, selectedUser.id === user.id && styles.selectedCard]}>
              <Image 
                source={{ uri: user.avatar }} 
                style={styles.userAvatar} 
              />
              <Text style={[styles.userName, selectedUser.id === user.id && styles.selectedUser]}>
                {user.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nuevo Nombre de Usuario"
        value={newUsername}
        onChangeText={setNewUsername}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => { /* Lógica para agregar usuario */ }}
      >
        <Text style={styles.buttonText}>Agregar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  userList: {
    marginBottom: 20,
  },
  userItem: {
    marginVertical: 5,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#007BFF',
    backgroundColor: '#e0f7fa', // Color de fondo para el usuario seleccionado
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    color: '#555',
  },
  selectedUser: {
    fontWeight: 'bold',
    color: '#007BFF', // Color para el usuario seleccionado
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10, // Bordes redondeados
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8884ff', // Color del botón
    paddingVertical: 15,
    borderRadius: 25, // Bordes redondeados
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
