import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Modal,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function User() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Seleccionar");
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a la galería.");
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

  const openPickerModal = () => {
    if (Platform.OS === "ios") {
      setModalVisible(true);
    }
  };

  const closePickerModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.profileCircle} />
          ) : (
            <View style={styles.placeholderCircle}>
              <Text style={styles.placeholderText}>Subir Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.profileName}>Tu Nombre Aquí</Text>
        <Text style={styles.profileSubText}>Usuario</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formRow}>
          <View style={styles.halfWidth}>
            <Text style={styles.labelText}>Nombre(s):</Text>
            <TextInput style={styles.inputPill} placeholder="Tu nombre" />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.labelText}>Apellido(s):</Text>
            <TextInput style={styles.inputPill} placeholder="Tus apellidos" />
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={styles.halfWidth}>
            <Text style={styles.labelText}>Fecha de Nacimiento:</Text>
            <TextInput style={styles.inputPill} placeholder="dd/mm/yyyy" />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.labelText}>Número de Contacto:</Text>
            <TextInput style={styles.inputPill} placeholder="xxx-xxx-xxxx" />
          </View>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.labelText}>Código de Grupo:</Text>
          <TextInput style={styles.inputPill} placeholder="xxxxx-xxxxx" editable={false} />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.labelText}>Género:</Text>
          {Platform.OS === "ios" ? (
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={openPickerModal}
            >
              <Text style={styles.pickerText}>
                {selectedValue === "Seleccionar"
                  ? "Seleccionar Género"
                  : selectedValue}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValue}
                style={styles.pickerAndroid}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Femenino" value="F" />
                <Picker.Item label="Indeterminado" value="I" />
              </Picker>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {Platform.OS === "ios" && (
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerModal}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                  setSelectedValue(itemValue);
                  closePickerModal();
                }}
              >
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Femenino" value="F" />
                <Picker.Item label="Indeterminado" value="I" />
              </Picker>
              <Button title="Cerrar" onPress={closePickerModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f4f6f9",
    alignItems: "center",
  },
  profileContainer: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Sombra para Android
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#6c63ff",
    marginBottom: 15,
  },
  placeholderCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#6c63ff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  placeholderText: {
    color: "#6c63ff",
    fontSize: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileSubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  halfWidth: {
    flex: 1,
    marginRight: 10,
  },
  labelText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  inputPill: {
    height: 45,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  pickerText: {
    color: "#333",
  },
  pickerAndroid: {
    height: 40,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  roundedButton: {
    flex: 1,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#6c63ff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
