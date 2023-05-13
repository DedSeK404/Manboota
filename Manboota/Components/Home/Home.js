import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import { logout } from "../../JS/actions/useractions";
import { useDispatch, useSelector } from "react-redux";
const Home = ({ LoginSetter }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userR.currentUser);
  console.log(currentUser);
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
            <Text style={styles.username}>{currentUser.name}</Text>
          </View>
          <Pressable
            style={styles.logoutBtn}
            onPress={() => dispatch(logout(LoginSetter))}
          >
            <Text style={styles.logoutText}>logout</Text>
          </Pressable>
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
    color: "white.",
  },
  image: {
    flex: 1,
  },logocontainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },Logo:{
    width:50,
    height:60,
    
  }
});

export default Home;
