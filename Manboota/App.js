import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./JS/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Video, ResizeMode } from "expo-av";
import Login from "./Components/Login/Login";
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/Login/SignUp";
import Home from "./Components/Home/Home";

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace("Login");
  }, 6000);
  const video = React.useRef(null);

  return (
    <Video
      ref={video}
      style={styles.video}
      source={require("./assets/SplashScreen.mp4")}
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      shouldPlay
    />
  );
};
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
  },
});
