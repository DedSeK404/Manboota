import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
} from "react-native";
import moment from "moment";

const PlantContainer = ({ data }) => {
  const [first, setfirst] = useState(1);
  const [timeLefts, setTimeLeft] = useState(Number);


  useEffect(() => {
    const id = setInterval(() => setfirst((oldCount) => oldCount + 0.1), 1000);
console.log(id)
    // return () => {
    //   clearInterval(id);
    // };
    const timer = () => {
      var date = moment().format("YYYY-MM-DD hh:mm:ss");
      var expirydate = data.timerEnd;
      var diffr = moment.duration(moment(expirydate).diff(moment(date)));
      var hours = parseInt(diffr.asHours());
      var minutes = parseInt(diffr.minutes());
      var seconds = parseInt(diffr.seconds());
      var timeLeft = hours * 60 * 60 + minutes * 60 + seconds;
      const remap = (value, sourceMin, sourceMax, destMin = 0, destMax = 1) =>
        destMin +
        ((value - sourceMin) / (sourceMax - sourceMin)) * (destMax - destMin);

       console.log(`timeleft: ${timeLeft}`);

      let date1 = new Date(data.timerStart);
      let date2 = new Date(data.timerEnd);
      var dif = Math.abs(date1 - date2) / 1000;
       console.log(dif);

      setTimeLeft(remap(timeLeft, 0, dif))
    };
    timer()
    
  }, [first]);
  

  // console.log(timeLefts);
  return (
    <SafeAreaView style={styles.container}>
      <View style={data.type === "tree" ? styles.treeBox : styles.plantBox}>
        <View style={styles.Content}>
          <Text>{data.name}</Text>
          <Text>{data.species}</Text>

          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={timeLefts}
          />
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
