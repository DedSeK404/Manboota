import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { getUser, logout } from "../../JS/actions/useractions";
import { useDispatch, useSelector } from "react-redux";
import Add from "../PlantManager/Add";
import * as SecureStore from "expo-secure-store";
import Plants from "../PlantHub/Plants";
import { getallplants } from "../../JS/actions/plantactions";
import PlantPage from "../PlantHub/PlantPage";
import Upcoming from "../PlantHub/Upcoming";
import AddTree from "../PlantManager/AddTree";
import AddPlant from "../PlantManager/AddPlant";

const Home = ({ LoginSetter }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userR.currentUser);
  const loading = useSelector((state) => state.userR.authloading);

  useEffect(() => {
    async function getValueForUserID() {
      let userID = await SecureStore.getItemAsync("currentUser");
      dispatch(getUser(userID));
      dispatch(getallplants(userID));
    }
    getValueForUserID();
  }, []);
  const [plantPage, setPlantPage] = useState("");
  const [showPage, setShowPage] = useState(true);

  const changeView = (data) => {
    setPlantPage(data);
    setShowPage(!showPage);
  };
  const changeViewHome = () => {
    setShowPage(!showPage);
  };

  const [showAddTree, setShowAddTree] = useState(false);
  const [showAddPlant, setShowAddPlant] = useState(false);
  const handleShowTree = (bool) => {
    setShowAddTree(bool);
    setShowAddPlant(false);
    setPlantStyleAdd(true);
  };
  const handleShowPlant = (bool) => {
    setShowAddPlant(bool);
    setShowAddTree(false);
    setStyleAdd(true);
  };
  const [styleAdd, setStyleAdd] = useState(true);
  const [stylePlantAdd, setPlantStyleAdd] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/Background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.header}>
          <View style={styles.logocontainer}>
            {loading ? (
              <ActivityIndicator size="small" color="#7EE068" />
            ) : (
              <Text style={styles.username}>{currentUser.name}</Text>
            )}
          </View>
          <Pressable
            style={styles.logoutBtn}
            onPress={() => dispatch(logout(LoginSetter))}
          >
            <Text style={styles.logoutText}>logout</Text>
          </Pressable>
        </View>
        <View style={styles.Add}>
          <Add
            handleShowTree={handleShowTree}
            handleShowPlant={handleShowPlant}
            setPlantStyleAdd={setPlantStyleAdd}
            setStyleAdd={setStyleAdd}
            styleAdd={styleAdd}
            stylePlantAdd={stylePlantAdd}
          />
        </View>
        {showAddTree ? (
          <AddTree setStyleAdd={setStyleAdd} handleShowTree={handleShowTree} />
        ) : showAddPlant ? (
          <AddPlant
            setPlantStyleAdd={setPlantStyleAdd}
            handleShowPlant={handleShowPlant}
          />
        ) : (
          <>
            {showPage ? (
              <>
                <View style={styles.plants}>
                  <Plants changeView={changeView} setPlantPage={setPlantPage} />
                </View>
                <View style={styles.upcoming}>
                  <Upcoming />
                </View>
              </>
            ) : (
              <View style={styles.plants}>
                <PlantPage changeViewHome={changeViewHome} Data={plantPage} />
              </View>
            )}
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
    gap: 30,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15%",
    borderWidth: 1,
    borderColor: "#7EE068",
    borderRadius: 20,
    width: "90%",
    padding: 15,
    alignSelf: "center",
  },
  logoutBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "#7EE068",
  },
  username: {
    color: "#7EE068",
    fontWeight: "400",
    fontSize: 20,
  },
  logoutText: {
    color: "white",
  },
  image: {
    flex: 1,
  },
  logocontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  Logo: {
    width: 52,
    height: 60,
  },
  Add: {
    paddingTop: 20,
    alignItems: "center",
  },
  plants: {
    paddingTop: 20,
    alignItems: "center",
    height: 400,
  },
  upcoming: {
    flex: 1,
    alignItems: "center",
  },
});

export default Home;
