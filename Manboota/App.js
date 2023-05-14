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
import * as SecureStore from "expo-secure-store";

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
  const [result, setfirst] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const LoginSetter = () => {
    setLogin(!login);
  };

  React.useEffect(() => {
    async function getValueFor() {
      let result = await SecureStore.getItemAsync("Auth");
      setfirst(result);
    }
    getValueFor();
   
  }, [login]);

  return (
    <Provider store={store}>
      {!result ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignIn">
              {(props) => <SignIn {...props} LoginSetter={LoginSetter} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home">
              {(props) => <Home {...props} LoginSetter={LoginSetter} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )}
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
