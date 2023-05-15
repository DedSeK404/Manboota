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

const Add = () => {
  const currentUser = useSelector((state) => state.userR.currentUser);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [plantmodalVisible, setPlantModalVisible] = useState(false);
  const [style, setStyle] = useState(true);
  const [plantstyle, setplantStyle] = useState(true);
  const handlePress = () => {
    setStyle(!style);
    setModalVisible(true);
  };
  const handlePressPlant = () => {
    setplantStyle(!plantstyle);
    setPlantModalVisible(true);
  };
  const closeTreeModal = () => {
    setModalVisible(!modalVisible);
    setStyle(!style);
    addTreeData.name = "";
  };
  const closePlantModal = () => {
    setPlantModalVisible(!plantmodalVisible);
    setplantStyle(!plantstyle);
    addPlantData.name = "";
  };
  // add tree
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

  // add plant
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
    <SafeAreaView style={styles.container}>
      <View style={styles.AddButtonsContainer}>
        <View style={style ? styles.AddContainer : styles.AddContainerPressed}>
          <Pressable style={styles.Pressable} onPress={handlePress}>
            <Text style={style ? styles.text : styles.textPressed}>
              Add Tree
            </Text>
            <Image
              style={style ? styles.image : styles.imageActive}
              source={require("../../assets/GrayTree.png")}
            />
          </Pressable>
        </View>
        <View
          style={plantstyle ? styles.AddContainer : styles.AddContainerPressed}
        >
          <Pressable style={styles.Pressable} onPress={handlePressPlant}>
            <Text style={plantstyle ? styles.text : styles.textPressed}>
              Add Plant
            </Text>
            <Image
              style={plantstyle ? styles.image : styles.imageActive}
              source={require("../../assets/GrayPlant.png")}
            />
          </Pressable>
        </View>
      </View>

      {/* tree modal */}

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setStyle(!style);
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <ImageBackground
              source={require("../../assets/TreeModal.png")}
              resizeMode="cover"
              style={styles.modalView}
            >
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Define tree species"
                  placeholderTextColor="#7EE068"
                  onChangeText={(text) => handleChangeTree(text, "species")}
                />
              </View>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name/Number your tree"
                  placeholderTextColor="#7EE068"
                  onChangeText={(text) => handleChangeTree(text, "name")}
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
                  <Text style={{ color: "#7EE068" }}>Close</Text>
                </Pressable>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      </View>

      {/* plant modal */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={plantmodalVisible}
          onRequestClose={() => {
            setplantStyle(!plantstyle);
            setPlantModalVisible(!plantmodalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <ImageBackground
              source={require("../../assets/PlantModal.png")}
              resizeMode="cover"
              style={styles.modalView}
            >
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Define plant species"
                  placeholderTextColor="#7EE068"
                  onChangeText={(text) => handleChange(text, "species")}
                />
              </View>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name/Number your plant"
                  placeholderTextColor="#7EE068"
                  onChangeText={(text) => handleChange(text, "name")}
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
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  AddContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#8a8989",
  },
  AddContainerPressed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
  },
  AddButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  Pressable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 50,
    height: 52,
  },
  imageActive: {
    width: 50,
    height: 52,
    tintColor: "#7EE068",
  },
  text: {
    color: "#8a8989",
    fontSize: 18,
  },
  textPressed: {
    color: "#7EE068",
    fontSize: 18,
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
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressablesContainer: {
    marginTop: 70,
    marginBottom: -45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //   modal css
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 50,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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
});

export default Add;
