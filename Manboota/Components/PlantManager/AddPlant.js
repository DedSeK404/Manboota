import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ImageBackground,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { addPlant } from "../../JS/actions/plantactions";
import { useDispatch, useSelector } from "react-redux";

const AddPlant = ({ handleShowPlant, setPlantStyleAdd }) => {
  const currentUser = useSelector((state) => state.userR.currentUser);
  const dispatch = useDispatch();

  const closePlantModal = () => {
    setPlantStyleAdd(true);
    handleShowPlant(false);
    addPlantData.name = "";
  };

  const [addPlantData, setaddPlantData] = useState({
    type: "plant",
    species: "",
    name: "",
  });
  const handleChange = (text, input) => {
    setaddPlantData((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleSubmitPlant = () => {
    if (!addPlantData.name) {
      return Alert.alert("Post", "you left the name field empty");
    } else {
      dispatch(
        addPlant({ ...addPlantData, user: currentUser._id }, closePlantModal)
      );
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.centeredView}>
          <ImageBackground
            source={require("../../assets/PlantModal.png")}
            resizeMode="cover"
            style={styles.addContainer}
          >
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name/Number your plant"
                placeholderTextColor="#7EE068"
                onChangeText={(text) => handleChange(text, "name")}
              />
            </View>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Define plant species"
                placeholderTextColor="#7EE068"
                onChangeText={(text) => handleChange(text, "species")}
              />
            </View>
            <View style={styles.pressablesContainer}>
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handleSubmitPlant}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closePlantModal}
              >
                <Text style={{ color: "#7EE068" }}>Close</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View>
        <Image style={styles.Image} source={require("../../assets/Logo.png")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: "90%",
    alignSelf: "center",
  },
  addContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 50,
    padding: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
    height: 300,
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#7EE068",
    elevation: 0,
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "#7EE068",
    elevation: 0,
  },
  pressablesContainer: {
    marginTop: 70,
    marginBottom: -45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#7EE068",
    height: 50,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    color: "#7EE068",
  },
  Image: {
    width: 120,
    height: 140,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default AddPlant;
