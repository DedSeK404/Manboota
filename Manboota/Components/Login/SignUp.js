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
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../JS/actions/useractions";

const SignUp = () => {
  const dispatch=useDispatch()
  const [show, setShow] = useState(false);
  const [RetypeShow, setRetypeShow] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleChange = (text, input) => {
    setSignUpData((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleSubmit=()=>{
    dispatch(addUser(signUpData))
  }
  // console.log(signUpData);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Textcontainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.Paragraph}>
          Please create an account to proceed
        </Text>
      </View>
      <View style={styles.signInContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          title="email"
          onChangeText={(text) => handleChange(text, "email")}
        />
        <View style={styles.PasswordInput}>
          <TextInput
            style={styles.PassInput}
            placeholder="Password"
            secure={true}
            secureTextEntry={show ? false : true}
            title="password"
            onChangeText={(text) => handleChange(text, "password")}
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
        <View style={styles.PasswordInput}>
          <TextInput
            style={styles.PassInput}
            placeholder="Re-type password"
            secure={true}
            secureTextEntry={RetypeShow ? false : true}
            title="re-type password"
            onChangeText={(text) => handleChange(text, "re-type password")}
          />
          <Pressable onPress={() => setRetypeShow(!RetypeShow)}>
            <Image
              style={styles.Showpass}
              source={
                RetypeShow
                  ? require("../../assets/Hide.png")
                  : require("../../assets/Show.png")
              }
            />
          </Pressable>
        </View>
        <View style={styles.username}>
          <Text>Please choose a username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            title="name"
            onChangeText={(text) => handleChange(text, "name")}
          />
        </View>
        <Pressable style={styles.SignUpBtn} onPress={handleSubmit}>
          <Text style={styles.SignInText}>Sign up</Text>
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
    gap: 30,
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
    width: "100%",
    paddingLeft: 30,
  },
  SignUpBtn: {
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
  username: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
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
    paddingLeft: 30,
  },
});

export default SignUp;
