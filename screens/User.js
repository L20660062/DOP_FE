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
      <TouchableOpacity onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.profileCircle} />
        ) : (
          <View style={styles.placeholderCircle}>
            <Text style={styles.placeholderText}>Subir Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.containerRow}>
        <Text style={styles.labelText}>Nombre(s):</Text>
        <TextInput style={styles.inputPill} placeholder="Tu nombre" />
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.labelText}>Apellido(s):</Text>
        <TextInput style={styles.inputPill} placeholder="Tus apellidos" />
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.labelText}>Fecha de Nacimiento:</Text>
        <TextInput style={styles.inputPill} placeholder="dd/mm/yyyy" />
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.labelText}>Número de Contacto:</Text>
        <TextInput style={styles.inputPill} placeholder="xxx-xxx-xxxx" />
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.labelText}>Código de Grupo:</Text>
        <TextInput
          style={styles.inputPill}
          placeholder="xxxxx-xxxxx"
          editable={false}
        />
      </View>

      <View style={styles.containerRow}>
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

      <TouchableOpacity style={styles.roundedButton}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      {/* Modal para iOS */}
      {Platform.OS === "ios" && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
        >
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
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "90%",
  },
  profileCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  placeholderCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
  },
  placeholderText: {
    color: "#999",
  },
  roundedButton: {
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8884ff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  labelText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  inputPill: {
    flex: 2,
    height: 40,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    flex: 2,
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  pickerText: {
    color: "#999",
  },
  pickerAndroid: {
    height: 40,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  pickerModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
