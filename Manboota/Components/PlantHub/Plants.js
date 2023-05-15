import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import PlantContainer from "./PlantContainer";
import { useSelector } from "react-redux";

const Plants = () => {
  const plants = useSelector((state) => state.plantR.plants);
  const loading = useSelector((state) => state.plantR.loading);

  const [treeFilter, setTreeFilter] = useState("");
  const [plantFilter, setPlantFilter] = useState("");

  const [all, setAllStyle] = useState(true);
  const [treeStyle, setTreeStyle] = useState(false);
  const [plantStyle, setPlantStyle] = useState(false);

  const treeOnlyFilter = () => {
    setPlantFilter("");
    setTreeFilter(plants.filter((e) => e.type === "tree"));
    setTreeStyle(true);
    setPlantStyle(false);
    setAllStyle(false);
  };
  const plantOnlyFilter = () => {
    setTreeFilter("");
    setPlantFilter(plants.filter((e) => e.type === "plant"));
    setTreeStyle(false);
    setPlantStyle(true);
    setAllStyle(false);
  };
  const setAll = () => {
    setTreeFilter("");
    setPlantFilter("");
    setTreeStyle(false);
    setPlantStyle(false);
    setAllStyle(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pressableContainer}>
        <Pressable
          style={all ? styles.pressableAllActive : styles.pressableAll}
          onPress={setAll}
        >
          <Image
            style={all ? styles.allIconActive : styles.allIcon}
            source={require("../../assets/All.png")}
          />
        </Pressable>
        <Pressable
          style={treeStyle ? styles.pressableTreeActive : styles.pressableTree}
          onPress={treeOnlyFilter}
        >
          <Image
            style={treeStyle ? styles.treeIconActive : styles.treeIcon}
            source={require("../../assets/TreesOnly.png")}
          />
        </Pressable>
        <Pressable
          style={
            plantStyle ? styles.pressablePlantActive : styles.pressablePlant
          }
          onPress={plantOnlyFilter}
        >
          <Image
            style={plantStyle ? styles.plantIconActive : styles.plantIcon}
            source={require("../../assets/PlantsOnly.png")}
          />
        </Pressable>
      </View>
      <View style={styles.scrollableContainer}>
        <ScrollView>
          <View style={styles.list}>
            {loading ? (
              <ActivityIndicator size="large" color="#7EE068" />
            ) : (
              <FlatList
                data={plantFilter || treeFilter || plants}
                renderItem={({ item }) => <PlantContainer data={item} />}
                keyExtractor={(item) => item._id}
                numColumns={3}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  pressableContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "80%",
  },
  allIcon: {
    width: 95,
    height: 40,
  },
  allIconActive: {
    width: 95,
    height: 40,
    tintColor: "white",
  },
  treeIcon: {
    width: 95,
    height: 40,
  },
  treeIconActive: {
    width: 95,
    height: 40,
    tintColor: "white",
  },
  plantIcon: {
    width: 95,
    height: 40,
  },
  plantIconActive: {
    width: 95,
    height: 40,
    tintColor: "white",
  },
  pressableAll: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#0a84ec",
  },
  pressableAllActive: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#0a84ec",
    backgroundColor: "#0a84ec",
  },
  pressablePlant: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
  },
  pressablePlantActive: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
    backgroundColor: "#7EE068",
  },
  pressableTree: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ec8f0a",
  },
  pressableTreeActive: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ec8f0a",
    backgroundColor: "#ec8f0a",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  scrollableContainer: {
    height: "67%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
    marginTop: 25,
  },
});

export default Plants;
