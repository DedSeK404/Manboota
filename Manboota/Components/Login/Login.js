import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.Logo} source={require("../../assets/Logo.png")} />
      <View style={styles.loginContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.paragraph}>
            Your only app for managing your plant lives
          </Text>
        </View>
        <View style={styles.ButtonContainer}>
          <Pressable
            style={styles.SignInBtn}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.SignInText}>Sign in</Text>
          </Pressable>
          <Pressable
            style={styles.SignUpBtn}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.SignUpText}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  Logo: {
    resizeMode: "center",
    height: 200,
    width: 200,
    marginTop: 100,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    backgroundColor: "#7EE068",
    width: "100%",
    height: "40%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 40,
  },
  SignInBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#7EE068",
    backgroundColor: "black",
  },
  SignUpBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#7EE068",
    backgroundColor: "white",
  },
  SignInText: {
    fontSize: 16,
    color: "white",
  },
  SignUpText: {
    fontSize: 16,
    color: "black",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  ButtonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    backgroundColor: "#7EE068",
    width: "100%",
    height: "40%",
    justifyContent:"center"
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  paragraph: {
    color: "white",
  },
});

export default Login;
