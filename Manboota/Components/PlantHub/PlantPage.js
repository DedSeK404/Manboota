import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { editPlant } from "../../JS/actions/plantactions";

const PlantPage = ({ changeViewHome, Data }) => {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [waterDate, setWaterDate] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
const dodo = waterDate
  const handleConfirm = (date) => {
    const time = moment(date).format("YYYY-MM-DD hh:mm:ss");
    setWaterDate(time);
    hideDatePicker();
    dispatch(editPlant({ timerEnd: dodo, plantID: Data._id,timerStart: moment().format("YYYY-MM-DD hh:mm:ss"), user:Data.user}));
  };

  console.log(waterDate);

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
