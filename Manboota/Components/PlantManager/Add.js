import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";

const Add = ({ handleShowTree, handleShowPlant, setStyleAdd, styleAdd,setPlantStyleAdd,stylePlantAdd }) => {

  const handlePress = () => {
    setStyleAdd(false);
    handleShowTree(true);
  };
  const handlePressPlant = () => {
    setPlantStyleAdd(false);
    handleShowPlant(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.AddButtonsContainer}>
        <View style={styleAdd ? styles.AddContainer : styles.AddTreeContainer}>
          <Pressable style={styles.Pressable} onPress={handlePress}>
            <Text style={styleAdd ? styles.text : styles.TreeTextPressed}>
              Add Tree
            </Text>
            <Image
              style={styleAdd ? styles.image : styles.TreeimageActive}
              source={require("../../assets/GrayTree.png")}
            />
          </Pressable>
        </View>
        <View
          style={stylePlantAdd ? styles.AddContainer : styles.AddContainerPressed}
        >
          <Pressable style={styles.Pressable} onPress={handlePressPlant}>
            <Text style={stylePlantAdd ? styles.text : styles.textPressed}>
              Add Plant
            </Text>
            <Image
              style={stylePlantAdd ? styles.image : styles.imageActive}
              source={require("../../assets/GrayPlant.png")}
            />
          </Pressable>
        </View>
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
  AddTreeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ec8f0a",
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
    justifyContent: "space-between",
    gap: 20,
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
  TreeimageActive: {
    width: 50,
    height: 52,
    tintColor: "#ec8f0a",
  },
  text: {
    color: "#8a8989",
    fontSize: 18,
  },
  textPressed: {
    color: "#7EE068",
    fontSize: 18,
  },
  TreeTextPressed: {
    color: "#ec8f0a",
    fontSize: 18,
  },
});

export default Add;
