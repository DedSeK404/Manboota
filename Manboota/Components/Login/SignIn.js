import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../../JS/actions/useractions";

const SignIn = ({ LoginSetter }) => {
  
  const dispatch = useDispatch();
  const [signInData, setsignInData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (text, input) => {
    setsignInData((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleSubmit = () => {
    dispatch(loginUser(signInData, LoginSetter));
  };
  const [show, setShow] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Textcontainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.Paragraph}>
          Please login to your account to proceed
        </Text>
      </View>
      <View style={styles.signInContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => handleChange(text, "email")}
        />
        <View style={styles.PasswordInput}>
          <TextInput
            style={styles.PassInput}
            placeholder="Password"
            onChangeText={(text) => handleChange(text, "password")}
            secure={true}
            secureTextEntry={show ? false : true}
          />
          <Pressable onPress={() => setShow(!show)}>
            <Image
              style={styles.Showpass}
              source={
                show
                  ? require("../../assets/Hide.png")
                  : require("../../assets/Show.png")
              }
            />
          </Pressable>
        </View>
        <Pressable style={styles.SignInBtn} onPress={handleSubmit}>
          <Text style={styles.SignInText}>Sign in</Text>
        </Pressable>
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
    backgroundColor: "#7EE068",
  },
  signInContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    backgroundColor: "white",
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 40,
  },
  Textcontainer: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    marginTop: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  Paragraph: {
    fontSize: 16,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    paddingLeft: 30,
  },
  SignInBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 32,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: "black",
  },
  SignInText: {
    color: "white",
    fontSize: 16,
  },
  PasswordInput: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  Showpass: {
    resizeMode: "cover",
    width: 43,
    height: 25,
  },
  PassInput: {
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    width: "80%",
    padding: 10,
    paddingLeft: 30,
  },
});

export default SignIn;
