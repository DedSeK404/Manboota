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

const Home = ({ LoginSetter }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userR.currentUser);
  const loading = useSelector((state) => state.userR.authloading);
  useEffect(() => {
    async function getValueForUserID() {
      let userID = await SecureStore.getItemAsync("currentUser");
      dispatch(getUser(userID));
    }
    getValueForUserID();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/Background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.header}>
          <View style={styles.logocontainer}>
            <Image
              style={styles.Logo}
              source={require("../../assets/Logo.png")}
            />
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "15%",
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
    width: 50,
    height: 60,
  },
  Add: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
});

export default Home;
