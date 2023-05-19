import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

const Upcoming = () => {
  const plants = useSelector((state) => state.plantR.plants);
  var now = moment(new Date());
  const found = plants.every(
    (plant) => moment(plant.editDate).diff(now, "seconds") <= 0
  );

  return (
    <SafeAreaView style={styles.container}>
      {plants.length === 0 ? (
        <View style={styles.eventContainerEmpty}>
          <Text style={styles.Text}>You have no upcoming events</Text>
        </View>
      ) : (
        <>
          <Text style={{ color: "#0a84ec" }}>❮</Text>
          <View style={styles.scrollContainer}>
            {found ? (
              <View style={styles.eventContainerFound}>
                <Text style={styles.Text}>You have no upcoming events</Text>
              </View>
            ) : (
              ""
            )}
            <ScrollView
              disableIntervalMomentum
              snapToStart
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={true}
              endless
            >
              {plants.map((plant) => (
                <>
                  {moment(plant.editDate).diff(now, "seconds") <= 0 ||
                  !plant.timerEnd ? (
                    ""
                  ) : (
                    <View key={plant._id} style={styles.eventContainer}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="head"
                        style={styles.Text}
                      >
                        {plant.name}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginRight: 20,
                        }}
                      >
                        <Text style={styles.Text}>
                          {moment(plant.timerEnd).format("MMMM Do YYYY, h:mm ")}
                        </Text>
                        <Text style={styles.Text}>
                          {moment().diff(plant.timerEnd, "days")} days 💦
                        </Text>
                      </View>
                    </View>
                  )}
                </>
              ))}
            </ScrollView>
          </View>

          <Text style={{ color: "#0a84ec" }}>❯</Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#0a84ec",
    height: 100,
    width: "90%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: -15,
  },
  eventContainer: {
    backgroundColor: "#0a84ec",
    borderRadius: 40,
    width: 312,
    justifyContent: "center",
    paddingLeft: 25,
    marginRight: 20,
    marginLeft: 20,
  },
  eventContainerEmpty: {
    backgroundColor: "#0a84ec",
    borderRadius: 40,
    width: 312,
    justifyContent: "center",
    padding: 20,
  },
  eventContainerFound: {
    backgroundColor: "#0a84ec",
    borderRadius: 40,
    width: 312,
    justifyContent: "center",
    padding: 20,
    marginLeft: 20,
  },
  Text: {
    color: "white",
    fontWeight: 600,
  },
  scrollContainer: {
    height: 60,
    width: 352,
  },
});

export default Upcoming;
