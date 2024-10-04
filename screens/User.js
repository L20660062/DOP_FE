import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function User() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Seleccionar");


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

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedImage }} style={styles.profileCircle} />

      <TouchableOpacity style={styles.roundedButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Subir Foto</Text>
      </TouchableOpacity>
      <View style={styles.containerRow}>
        <Text style={styles.descText2}>Nombre(s):</Text>
        <TextInput style={styles.inputPill2}></TextInput>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.descText2}>Apellido(s):</Text>
        <TextInput style={styles.inputPill2}></TextInput>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.descText2}>Fecha de Nacimiento:</Text>
        <TextInput
          style={styles.inputPill2}
          placeholder="dd/mm/yyyy"
        ></TextInput>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.descText2}>Número de Contacto:</Text>
        <TextInput
          style={styles.inputPill2}
          placeholder="xxx-xxx-xxxx"
        ></TextInput>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.descText2}>Código de Grupo:</Text>
        <TextInput
          style={styles.inputPill2}
          placeholder="xxxxx-xxxxx"
          editable={false}
        ></TextInput>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.descText2}>Género:</Text>
        <View style={styles.inputPill2}>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Masculino" value="M" />
            <Picker.Item label="Femenino" value="F" />
            <Picker.Item label="Indeterminado" value="I" />
          </Picker>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.roundedButton}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerRow: {
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  profileCircle: {
    marginTop: 10,
    width: 250,
    height: 225,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#edeef0",
    justifyContent: "",
    alignItems: "",
  },
  roundedButton: {
    width: 100,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#8884ff",
    borderColor: "#edeef0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",

    alignItems: "center",
  },
  descText2: {
    fontSize: 18,
    color: "#000",
    textAlign: "left",
    width: "%40",
    marginStart: "5%",
  },
  inputPill2: {
    borderRadius: 20,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
    width: "40%",
    height: 25,
    marginStart: "5%",
    marginEnd: "5%",
    textAlign: "center",
    justifyContent: 'center',
  },
  descText3: {
    fontSize: 18,
    color: "#000",
    textAlign: "left",
    width: "%24",
    marginStart: "5%",
  },
  picker: {
    height: 40,
    width: '100%',
  },
});
