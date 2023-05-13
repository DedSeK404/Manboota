import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { logout } from "../../JS/actions/useractions";
import { useDispatch } from "react-redux";
const Home = ({ LoginSetter }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: 100,
        }}
      >
        <Button title="logout" onPress={() => dispatch(logout(LoginSetter))} />
      </Text>
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
});

export default Home;
