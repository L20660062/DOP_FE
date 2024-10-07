// EmergencyContacts.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const EmergencyContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
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
      <Text style={styles.contactText}>{item.name}: {item.phone}</Text>
      <View style={styles.contactButtons}>
        <TouchableOpacity onPress={() => handleEditContact(index)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteContact(index)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateContact}>
        <Text style={styles.buttonText}>{editingIndex !== null ? 'Update Contact' : 'Add Contact'}</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.contactList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8884ff',
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  contactList: {
    width: '100%',
    marginTop: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 18,
  },
  contactButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
});

export default EmergencyContactsScreen;
