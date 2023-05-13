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
      <View style={style ? styles.AddContainer : styles.AddContainerPressed}>
        <Pressable style={styles.Pressable} onPress={handlePress}>
          <Text style={style ? styles.text : styles.textPressed}>Add Tree</Text>
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
      {/* tree modal */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Tree modal</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeTreeModal}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
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
            Alert.alert("Modal has been closed.");
            setPlantModalVisible(!plantmodalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Plant modal</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closePlantModal}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
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
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#8a8989",
  },
  AddContainerPressed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#7EE068",
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

  //   modal css
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Add;

// 8a8989
