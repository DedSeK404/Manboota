import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Pressable,
  Modal,
  Alert,
  ImageBackground,
  TextInput,
} from "react-native";

const Add = () => {
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
  };
  const closePlantModal = () => {
    setPlantModalVisible(!plantmodalVisible);
    setplantStyle(!plantstyle);
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
              style={styles.image}
              source={
                style
                  ? require("../../assets/GrayTree.png")
                  : require("../../assets/GreenTree.png")
              }
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
              style={styles.image}
              source={
                plantstyle
                  ? require("../../assets/GrayPlant.png")
                  : require("../../assets/GreenPlant.png")
              }
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
                />
              </View>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name your tree"
                  placeholderTextColor="#7EE068"
                />
              </View>

              <View style={styles.pressablesContainer}>
                <Pressable
                  style={[styles.button, styles.buttonAdd]}
                  onPress={closeTreeModal}
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
                />
              </View>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name your plant"
                  placeholderTextColor="#7EE068"
                />
              </View>

              <View style={styles.pressablesContainer}>
                <Pressable
                  style={[styles.button, styles.buttonAdd]}
                  onPress={closePlantModal}
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
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#8a8989",
  },
  AddContainerPressed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 2,
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
  image: { width: 50, height: 52 },
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
