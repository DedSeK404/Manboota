import { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch } from "react-redux";
import { editPlant } from "../../JS/actions/plantactions";

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

  const endDate = moment(Data.timerEnd).format("MMMM Do YYYY, h:mm ");
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{Data.name}</Text>
      </View>
      <Button title="back" onPress={changeViewHome} />
      <View>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          isDarkModeEnabled={true}
          minimumDate={new Date()}
        />
      </View>
      {progress <= 0 || !Data.timerEnd ? (
        ""
      ) : (
        <View style={styles.Progress}>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={progress}
            color={"#1B9BE0"}
          />
        </View>
      )}
      {progress <= 0 || !Data.timerEnd ? "" : <Text>{endDate}</Text>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
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
  modalView: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 50,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PlantPage;
