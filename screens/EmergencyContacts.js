import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';

const EmergencyContactsScreen = () => {
  const [contacts, setContacts] = useState([
    { name: 'Carlos López', phone: '123-456-7890' },
    { name: 'María González', phone: '098-765-4321' },
    { name: 'Ana Sánchez', phone: '555-555-5555' },
    { name: 'Luis Hernández', phone: '444-444-4444' },
    { name: 'Fernanda Pérez', phone: '333-333-3333' },
    { name: 'Raúl Jiménez', phone: '222-222-2222' },
    { name: 'Sofía Martínez', phone: '111-111-1111' },
    { name: 'David Torres', phone: '999-999-9999' },
    { name: 'Laura Flores', phone: '888-888-8888' },
    { name: 'Jorge Mendoza', phone: '777-777-7777' },
  ]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdateContact = () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Por favor, ingrese un nombre y un número de teléfono.');
      return;
    }

    if (editingIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editingIndex] = { name, phone };
      setContacts(updatedContacts);
      setEditingIndex(null);
    } else {
      setContacts([...contacts, { name, phone }]);
    }

    setName('');
    setPhone('');
  };

  const handleEditContact = (index) => {
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
    setEditingIndex(index);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const renderContactItem = ({ item, index }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <View style={styles.contactButtons}>
        <TouchableOpacity onPress={() => handleEditContact(index)} style={styles.editButton}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteContact(index)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View>
      <Text style={styles.title}>Contactos de Emergencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateContact}>
        <Text style={styles.buttonText}>{editingIndex !== null ? 'Actualizar Contacto' : 'Añadir Contacto'}</Text>
      </TouchableOpacity>
      <Text style={styles.contactsTitle}>Lista de Contactos</Text>
    </View>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderContactItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.contactList}  // Agregado margen horizontal
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={<Text style={styles.emptyText}>No hay contactos agregados aún.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  contactList: {
    paddingHorizontal: 20,  // Añadido margen horizontal para toda la lista
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactPhone: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 5,
  },
  contactButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#F59E0B',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280',
  },
  contactsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
});

export default EmergencyContactsScreen;
