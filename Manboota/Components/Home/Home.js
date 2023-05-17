import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { getUser, logout } from "../../JS/actions/useractions";
import { useDispatch, useSelector } from "react-redux";
import Add from "../PlantManager/Add";
import * as SecureStore from "expo-secure-store";
import Plants from "../PlantHub/Plants";
import { getallplants } from "../../JS/actions/plantactions";
import PlantPage from "../PlantHub/PlantPage";

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
  console.log(plantPage)
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
          <Add />
        </View>
        {showPage ? (
          <View style={styles.plants}>
            <Plants changeView={changeView} setPlantPage={setPlantPage} />
          </View>
        ) : (
          <View style={styles.plants}>
            <PlantPage changeViewHome={changeViewHome} Data={plantPage} />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
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
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },
  plants: {
    flex: 1,
    marginTop: -490,
    alignItems: "center",
  },
});

export default Home;
