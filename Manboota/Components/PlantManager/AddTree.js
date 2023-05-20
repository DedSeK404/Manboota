import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Modal,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { addPlant } from "../../JS/actions/plantactions";
import { useDispatch, useSelector } from "react-redux";

const AddTree = ({ handleShowTree,setStyleAdd }) => {
  const currentUser = useSelector((state) => state.userR.currentUser);
  const dispatch = useDispatch();

  const [style, setStyle] = useState(true);

  const closeTreeModal = () => {
    setStyle(!style);
    setStyleAdd(true)
    handleShowTree(false);
    addTreeData.name = "";
  };

  const [addTreeData, setaddPTreeData] = useState({
    type: "tree",
    species: "",
    name: "",
  });
  const handleChangeTree = (text, input) => {
    setaddPTreeData((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleSubmitTree = () => {
    if (!addTreeData.name) {
      return Alert.alert("Post", "you left the name field empty");
    } else {
      dispatch(
        addPlant({ ...addTreeData, user: currentUser._id }, closeTreeModal)
      );
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.centeredView}>
          <ImageBackground
            source={require("../../assets/TreeModal.png")}
            resizeMode="contain"
            style={styles.addContainer}
          >
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name/Number your tree"
                placeholderTextColor="#ec8f0a"
                onChangeText={(text) => handleChangeTree(text, "name")}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Define tree species"
                placeholderTextColor="#ec8f0a"
                onChangeText={(text) => handleChangeTree(text, "species")}
              />
            </View>

            <View style={styles.pressablesContainer}>
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handleSubmitTree}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeTreeModal}
              >
                <Text style={{ color: "#ec8f0a" }}>Close</Text>
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
    borderColor: "#ec8f0a",
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
    borderColor: "#ec8f0a",
    elevation: 0,
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "#ec8f0a",
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
    borderColor: "#ec8f0a",
    height: 50,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    color: "#ec8f0a",
  },
  Image: {
    width: 125,
    height: 150,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default AddTree;
