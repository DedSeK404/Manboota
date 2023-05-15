import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Text, ActivityIndicator } from "react-native";
import { getallplants } from "../../JS/actions/plantactions";
import { useDispatch, useSelector } from "react-redux";

const Plants = () => {
  const currentUser = useSelector((state) => state.userR.currentUser);
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plantR.plants);
  const loading = useSelector((state) => state.plantR.loading);
 
  console.log(plants);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        {loading ? (
              <ActivityIndicator size="large" color="#7EE068" />
            ) : (
              <FlatList
          data={plants}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item._id}
        />
            )}
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Plants;
