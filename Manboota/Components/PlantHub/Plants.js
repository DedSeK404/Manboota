import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  Text,
} from "react-native";
import PlantContainer from "./PlantContainer";
import { useDispatch, useSelector } from "react-redux";
import { RefreshControl } from "react-native";
import { getallplants } from "../../JS/actions/plantactions";
const Plants = ({ changeView }) => {
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plantR.plants);
  const loading = useSelector((state) => state.plantR.loading);
  const [refreshing, setRefreshing] = useState(false);

  const [treeFilter, setTreeFilter] = useState("");
  const [plantFilter, setPlantFilter] = useState("");
  const currentUser = useSelector((state) => state.userR.currentUser);

  const ID = currentUser._id;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (ID) {
      dispatch(getallplants(ID));
    }

    setRefreshing(false);
  }, []);
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
      {plants.length === 0 ? (
        <Image
          style={{
            flex: 1,
            resizeMode: "contain",
            borderWidth: 1,
            borderColor: "#07EE06",
            width: 350,
            borderRadius: 20,
            marginBottom: 20,
          }}
          source={require("../../assets/Catalogue.png")}
        />
      ) : (
        <>
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
              style={
                treeStyle ? styles.pressableTreeActive : styles.pressableTree
              }
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
          <View
            style={
              all
                ? styles.scrollableContainerBlue
                : treeStyle
                ? styles.scrollableContainerTree
                : styles.scrollableContainerPlant
            }
          >
            {treeFilter && treeFilter.length == 0 ? (
              <Image
                resizeMode="contain"
                style={{ flex: 1, width: "100%" }}
                source={require("../../assets/Notrees.png")}
              />
            ) : plantFilter && plantFilter.length == 0 ? (
              <Image
                resizeMode="contain"
                style={{ flex: 1, width: "100%" }}
                source={require("../../assets/Noplants.png")}
              />
            ) : (
              <View style={styles.list}>
                {loading ? (
                  <ActivityIndicator
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      marginTop: 120,
                    }}
                    size="large"
                    color="#7EE068"
                  />
                ) : (
                  <FlatList
                    data={plantFilter || treeFilter || plants}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => changeView(item)}>
                        <PlantContainer data={item} />
                      </Pressable>
                    )}
                    keyExtractor={(item) => item._id}
                    numColumns={3}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    style={{ height: 265 }}
                  />
                )}
              </View>
            )}
          </View>
        </>
      )}
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
  scrollableContainerBlue: {
    height: 270,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#0a84ec",
    marginTop: 25,
  },
  scrollableContainerTree: {
    height: 270,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ec8f0a",
    marginTop: 25,
  },
  scrollableContainerPlant: {
    height: 270,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
    marginTop: 25,
  },
});

export default Plants;
