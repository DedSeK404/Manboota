import { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
  Pressable,
  Image,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch } from "react-redux";
import { editPlant } from "../../JS/actions/plantactions";
import SelectDropdown from "react-native-select-dropdown";

const PlantPage = ({ changeViewHome, Data }) => {
  var now = moment(new Date());

  const [dayNumbers, setDayNumbers] = useState(Number);
  const [month, setMonth] = useState("");
  const [isSet, setIsSet] = useState(
    Data.timerRepeat === "cancelled" || !Data.timerRepeat ? false : true
  );
  var repeatTime = moment().add(month, dayNumbers);

  const isTimeRemaining = moment(Data.timerRepeat).diff(now, "seconds");

  useEffect(() => {
    if (isTimeRemaining < 0) {
      Alert.alert("Timer", `you need to water ${Data.name}`);
    }
  }, []);

  const handleConfirmRepeat = () => {
    if (!dayNumbers) {
      return Alert.alert("Timer", "you left the timer input empty");
    }
    if (!month) {
      return Alert.alert(
        "Timer",
        "you didn't select an option (minutes/days/months)"
      );
    }
    dispatch(
      editPlant(
        {
          timerRepeat: repeatTime,
          plantID: Data._id,
          user: Data.user,
        },
        setIsSet
      )
    );
  };
  const handleEdit = () => {
    setIsSet(false);
  };
  const handleCancel = () => {
    dispatch(
      editPlant(
        {
          timerRepeat: "cancelled",
          plantID: Data._id,
          user: Data.user,
        },
        setIsSet
      )
    );
  };

  const [progress, setProgress] = useState(Number);

  useEffect(() => {
    const isTime = moment(Data.editDate).diff(now, "seconds");
    let date1 = new Date(Data.timerStart);
    let date2 = new Date(Data.timerEnd);
    var dif = Math.abs(date1 - date2) / 1000;

    const time = ((isTime - 0) / (dif - 0)) * (1 - 0);

    setProgress(time);
  }, []);

  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const time = moment(date).format("YYYY-MM-DD hh:mm:ss");

    hideDatePicker();
    dispatch(
      editPlant({
        timerEnd: time,
        plantID: Data._id,
        timerStart: moment().format("YYYY-MM-DD hh:mm:ss"),
        user: Data.user,
        editDate: date,
      })
    );
  };
  const Timing = ["minutes", "days", "months"];
  const endDate = moment(Data.timerEnd).format("MMMM Do YYYY, h:mm ");
  const [sow, setShow] = useState(false);
  return (
    <SafeAreaView style={styles.Box}>
      <ImageBackground
        resizeMode="contain"
        source={require("../../assets/WateringBackground.png")}
        style={styles.container}
      >
        <View style={Data.type === "tree" ? styles.IDtree : styles.IDplant}>
          <Text
            style={
              Data.type === "tree" ? { color: "#ec8f0a" } : { color: "#7EE068" }
            }
          >
            {Data.species}
          </Text>
          <Text
            style={
              Data.type === "tree" ? { color: "#ec8f0a" } : { color: "#7EE068" }
            }
          >
            {Data.name}
          </Text>
        </View>
        {/* onTimeReminder */}
        <View style={styles.timers}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 20,
              borderColor: "#7EE068",
              borderWidth: 1,
              backgroundColor: "white",
              gap: -15,
            }}
          >
            <View style={styles.repeat}>
              <Text style={isSet ? { color: "#8a8989" } : { color: "#7EE068" }}>
                Set a repeating reminder
              </Text>
              <View>
                <TextInput
                  style={isSet ? styles.inputFalse : styles.input}
                  placeholder="0"
                  placeholderTextColor={isSet ? "#8a8989" : "#7EE068"}
                  keyboardType="numeric"
                  editable={isSet ? false : true}
                  onChangeText={(text) => setDayNumbers(text, "species")}
                />
              </View>
              <View>
                <SelectDropdown
                  data={Timing}
                  onSelect={(selectedItem, index) => {
                    setMonth(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={
                    isSet
                      ? {
                          borderRadius: 50,
                          width: 90,
                          backgroundColor: "#8a8989",
                          padding: -50,
                        }
                      : {
                          borderRadius: 50,
                          width: 90,
                          backgroundColor: "#7EE068",
                          padding: -50,
                        }
                  }
                  buttonTextStyle={{ color: "white", fontSize: 12 }}
                  dropdownStyle={{ borderRadius: 20 }}
                  rowStyle={{ backgroundColor: "#7EE068" }}
                  rowTextStyle={{ color: "white", fontSize: 12 }}
                  disabled={isSet ? true : false}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Pressable
                style={
                  isSet
                    ? { backgroundColor: "#8a8989", borderRadius: 20 }
                    : { backgroundColor: "#7EE068", borderRadius: 20 }
                }
                onPress={handleConfirmRepeat}
                disabled={isSet ? true : false}
              >
                <Text
                  style={{
                    color: "white",
                    padding: 18,
                    width: 80,
                    textAlign: "center",
                  }}
                >
                  Set
                </Text>
              </Pressable>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={{ backgroundColor: "#0a84ec", borderRadius: 20 }}
                  onPress={handleEdit}
                >
                  <Text style={{ color: "white", fontSize: 24, padding: 10 }}>
                    ✎
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleCancel}
                  style={{ backgroundColor: "red", borderRadius: 20 }}
                >
                  <Text style={{ color: "white", fontSize: 24, padding: 10 }}>
                    X
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.oneTime}>
            <Text style={{ color: "#0a84ec" }}>Set a one time reminder</Text>
            <View>
              <Pressable style={styles.btnDate} onPress={showDatePicker}>
                <Text style={{ color: "white", fontSize: 12 }}>
                  Pick a date
                </Text>
              </Pressable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={true}
                minimumDate={new Date()}
              />
            </View>
          </View>
        </View>
        {progress <= 0 || progress > 1 || !Data.timerEnd ? (
          ""
        ) : (
          <View style={styles.alarms}>
            <View style={styles.progressBox}>
              <View style={styles.Progress}>
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={progress}
                  color={"#0a84ec"}
                />
              </View>
              <Image
                style={{ width: 34, height: 40 }}
                source={require("../../assets/WaterLevel.png")}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.date}>{endDate}</Text>
              </View>
              <View>
                <Text style={styles.dateR}>
                  {isTimeRemaining > 1
                    ? moment(Data.timerRepeat).format("MMMM Do YYYY, h:mm ")
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        )}

        {isTimeRemaining > 1 && !progress ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#7EE068",
              borderRadius: 20,
              backgroundColor: "white",
              padding: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#7EE068", fontSize: 20 }}>
              {moment(Data.timerRepeat).format("MMMM Do YYYY, h:mm ")}
            </Text>
          </View>
        ) : (
          ""
        )}
      </ImageBackground>
      <Pressable style={styles.btn} onPress={changeViewHome}>
        <Text style={styles.back}>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Box: {
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#7EE068",
    width: 40,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    color: "#7EE068",
  },
  inputFalse: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#8a8989",
    width: 40,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    color: "#8a8989",
  },
  container: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#0a84ec",
    borderRadius: 20,
    height: 380,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },

  Progress: {
    transform: [{ scaleX: 5.5 }, { scaleY: 8 }, { translateX: 20 }],
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#0a84ec",
    borderRadius: 40,
    padding: 20,
  },
  btnDate: {
    backgroundColor: "#0a84ec",
    borderRadius: 40,
    padding: 15,
  },
  back: {
    fontWeight: 600,
    color: "white",
    alignSelf: "center",
  },
  progressBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    color: "#0a84ec",
    fontSize: 15,
  },
  dateR: {
    color: "#7EE068",
    fontSize: 15,
  },
  oneTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#0a84ec",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
  },
  repeat: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  alarms: {
    borderRadius: 20,
    borderColor: "#0a84ec",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    marginTop: 10,
  },
  IDtree: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#ec8f0a",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  IDplant: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#7EE068",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  timers: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginTop: 10,
  },
});

export default PlantPage;
