import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
  ImageBackground,
  Pressable,
  Modal,
  TextInput,
  Image,
} from "react-native";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePlant, editPlant } from "../../JS/actions/plantactions";

const PlantContainer = ({ data, showEdit, showEditBool }) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(Number);
  var now = moment(new Date());

  useEffect(() => {
    const isTime = moment(data.editDate).diff(now, "seconds");
    let date1 = new Date(data.timerStart);
    let date2 = new Date(data.timerEnd);
    var dif = Math.abs(date1 - date2) / 1000;

    const time = ((isTime - 0) / (dif - 0)) * (1 - 0);

    setProgress(time);
  }, []);
  const handleDelete = () => {
    dispatch(deletePlant(data._id, data.user));
  };

  const [modalVisible, setModalVisible] = useState(false);

  const closeTreeModal = () => {
    setModalVisible(false);
  };
  const [addTreeData, setaddPTreeData] = useState({
    species: data.species,
    name: data.name,
  });
  const handleChangeTree = (text, input) => {
    setaddPTreeData((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleSubmitTree = () => {
    if (!addTreeData) {
      return Alert.alert("Edit", "you left the fields empty");
    } else {
      dispatch(
        editPlant(
          { ...addTreeData, user: data.user, plantID: data._id, token: true },
          setModalVisible
        )
      );
    }
  };
 
  return (
    <SafeAreaView style={styles.container}>
      {data.type === "tree" ? (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View>
              <View style={styles.centeredView}>
                <ImageBackground
                  source={require("../../assets/TreeModal.png")}
                  resizeMode="contain"
                  style={styles.addContainerTree}
                >
                  <View>
                    <TextInput
                      style={styles.inputTree}
                      placeholder="Edit Tree Name/Number"
                      placeholderTextColor="#ec8f0a"
                      onChangeText={(text) => handleChangeTree(text, "name")}
                    />
                  </View>
                  <View>
                    <TextInput
                      style={styles.inputTree}
                      placeholder="Edit tree species"
                      placeholderTextColor="#ec8f0a"
                      onChangeText={(text) => handleChangeTree(text, "species")}
                    />
                  </View>

                  <View style={styles.pressablesContainer}>
                    <Pressable
                      style={[styles.button, styles.buttonAddTree]}
                      onPress={handleSubmitTree}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonCloseTree]}
                      onPress={closeTreeModal}
                    >
                      <Text style={{ color: "#ec8f0a" }}>Close</Text>
                    </Pressable>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View>
              <View style={styles.centeredView}>
                <ImageBackground
                  source={require("../../assets/PlantModal.png")}
                  resizeMode="cover"
                  style={styles.addContainer}
                >
                  <View style={styles.modalContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Name/Number your plant"
                      placeholderTextColor="#7EE068"
                      onChangeText={(text) => handleChangeTree(text, "name")}
                    />
                  </View>
                  <View style={styles.modalContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Define plant species"
                      placeholderTextColor="#7EE068"
                      onChangeText={(text) => handleChangeTree(text, "species")}
                    />
                  </View>
                  <View style={styles.pressablesContainer}>
                    <Pressable
                      style={[styles.button, styles.buttonAdd]}
                      onPress={handleSubmitTree}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={closeTreeModal}
                    >
                      <Text style={{ color: "#7EE068" }}>Close</Text>
                    </Pressable>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </Modal>
        </View>
      )}

      {showEdit === data._id && showEditBool ? (
        <View
          style={
            data.type === "tree"
              ? {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  backgroundColor: "white",
                  borderRadius: 20,
                  borderWidth: 1,
                  marginBottom: 5,
                  borderColor: "#ec8f0a",
                }
              : {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  backgroundColor: "white",
                  borderRadius: 20,
                  borderWidth: 1,
                  marginBottom: 5,
                  borderColor: "#7EE068",
                }
          }
        >
          <View
            style={{
              backgroundColor: "transparent",
              padding: 10,
            }}
          >
            <Pressable onPress={() => setModalVisible(true)}>
              <Text
                style={
                  data.type === "tree"
                    ? { fontSize: 26, color: "#ec8f0a" }
                    : { fontSize: 26, color: "#7EE068" }
                }
              >
                ✎
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Pressable onPress={handleDelete}>
              <Text
                style={
                  data.type === "tree"
                    ? { fontSize: 26, color: "#ec8f0a" }
                    : { fontSize: 26, color: "#7EE068" }
                }
              >
                ⌫
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        ""
      )}

      <ImageBackground
        imageStyle={
          data.type === "tree"
            ? {
                borderRadius: 20,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#ec8f0a",
              }
            : {
                borderRadius: 20,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#7EE068",
              }
        }
        resizeMode="cover"
        source={
          data.type === "tree"
            ? require("../../assets/TreeIcon.png")
            : require("../../assets/PlantIcon.png")
        }
        style={data.type === "tree" ? styles.treeBox : styles.plantBox}
      >
        <View style={styles.Content}>
          <Text
            style={{ color: "white" }}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {data.name}
          </Text>
          <Text
            style={{ color: "white" }}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {data.species}
          </Text>
          {progress <= 0 || !data.timerEnd ? (
            ""
          ) : (
            <View style={styles.Progress}>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress}
                color={"white"}
              />
            </View>
          )}
        </View>
      </ImageBackground>
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

    borderRadius: 20,

    width: 100,
    height: 100,
    padding: 10,

    backgroundColor: "#ec8f0a",
    shadowColor: "#ec8f0a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  plantBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "80%",

    borderRadius: 20,

    width: 100,
    height: 100,
    padding: 10,

    backgroundColor: "#7EE068",
    shadowColor: "#7EE068",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Content: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  Progress: {
    transform: [{ scaleX: 1.3 }, { scaleY: 2 }, { translateX: 8 }],
  },
  // modalStyle
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  // treeModal
  centeredView: {
    width: "92%",
    alignSelf: "center",
  },
  addContainerTree: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 50,
    padding: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ec8f0a",
    height: 270,
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonCloseTree: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ec8f0a",
    elevation: 0,
  },
  buttonAddTree: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "#ec8f0a",
    elevation: 0,
  },
  pressablesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputTree: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ec8f0a",
    height: 50,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    color: "#ec8f0a",
  },
  Image: {
    width: 125,
    height: 150,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  // plantModal
  centeredView: {
    width: "92%",
    alignSelf: "center",
  },
  addContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 50,
    padding: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#7EE068",
    height: 270,
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#7EE068",
    elevation: 0,
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: "#7EE068",
    elevation: 0,
  },
  pressablesContainer: {
    marginTop: 70,
    marginBottom: -45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#7EE068",
    height: 50,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    color: "#7EE068",
  },
  Image: {
    width: 125,
    height: 150,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default PlantContainer;
