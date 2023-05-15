import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const PlantContainer = ({ data }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={data.type === "tree" ? styles.treeBox : styles.plantBox}>
        <View style={styles.Content}>
          <Text>{data.name}</Text>
          <Text>{data.species}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  treeBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ec8f0a",
    width: 100,
    height: 100,
    padding: 10,
  },
  plantBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
    width: 100,
    height: 100,
    padding: 10,
  },
  Content: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});

export default PlantContainer;
