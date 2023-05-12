import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
const Home = ({ navigation }) => {
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
        Home
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
