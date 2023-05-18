import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
  ImageBackground,
} from "react-native";
import moment from "moment";

const PlantContainer = ({ data }) => {
  const [progress, setProgress] = useState(Number);

  useEffect(() => {
    if (data.timerEnd) {
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

        let date1 = new Date(data.timerStart);
        let date2 = new Date(data.timerEnd);
        var dif = Math.abs(date1 - date2) / 1000;

        setProgress(remap(timeLeft, 0, dif));
      };
      timer();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
    borderRadius:200
  },
});

export default PlantContainer;
