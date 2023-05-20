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
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch } from "react-redux";
import { editPlant } from "../../JS/actions/plantactions";
import SelectDropdown from "react-native-select-dropdown";

const PlantPage = ({ changeViewHome, Data }) => {
  const [progress, setProgress] = useState(Number);

  useEffect(() => {
    if (Data.timerEnd) {
      const timer = () => {
        var date = moment().format("YYYY-MM-DD hh:mm:ss");
        var expirydate = Data.timerEnd;
        var diffr = moment.duration(moment(expirydate).diff(moment(date)));
        var hours = parseInt(diffr.asHours());
        var minutes = parseInt(diffr.minutes());
        var seconds = parseInt(diffr.seconds());
        var timeLeft = hours * 60 * 60 + minutes * 60 + seconds;
        const remap = (value, sourceMin, sourceMax, destMin = 0, destMax = 1) =>
          destMin +
          ((value - sourceMin) / (sourceMax - sourceMin)) * (destMax - destMin);

        let date1 = new Date(Data.timerStart);
        let date2 = new Date(Data.timerEnd);
        var dif = Math.abs(date1 - date2) / 1000;

        setProgress(remap(timeLeft, 0, dif));
      };
      timer();
    }
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
  const Timing = ["Day(s)", "Month(s)"];
  const endDate = moment(Data.timerEnd).format("MMMM Do YYYY, h:mm ");
  return (
    <SafeAreaView style={styles.Box}>
      <ImageBackground
        resizeMode="contain"
        source={require("../../assets/WateringBackground.png")}
        style={styles.container}
      >
        <View style={styles.ID}>
          <Text style={{ color: "#8a8989" }}>{Data.species}</Text>
          <Text style={{ color: "#8a8989" }}>{Data.name}</Text>
        </View>
        <View style={styles.timers}>
          <View style={styles.repeat}>
            <Text style={{ color: "#7EE068" }}>Set a repeating reminder</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#7EE068"
                keyboardType="numeric"
                // onChangeText={(text) => handleChange(text, "species")}
              />
            </View>
            <View>
              <SelectDropdown
                data={Timing}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  borderColor: "red",
                  borderRadius: 50,
                  width: 90,
                  backgroundColor: "#7EE068",
                  padding: -50,
                }}
                buttonTextStyle={{ color: "white", fontSize: 12 }}
                dropdownStyle={{ borderRadius: 20 }}
                rowStyle={{ backgroundColor: "#7EE068" }}
                rowTextStyle={{ color: "white", fontSize: 12 }}
              />
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
                style={{ width: 42, height: 50 }}
                source={require("../../assets/WaterLevel.png")}
              />
            </View>
            <View>
              <Text style={styles.date}>{endDate}</Text>
            </View>
          </View>
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
  container: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#0a84ec",
    borderRadius: 20,
    height: 380,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    transform: [{ scaleX: 5.1 }, { scaleY: 10 }, { translateX: 20 }],
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
    fontSize: 30,
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
  },
  repeat: {
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
  alarms: {
    borderRadius: 20,
    borderColor: "#0a84ec",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  ID: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#8a8989",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  timers: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});

export default PlantPage;
