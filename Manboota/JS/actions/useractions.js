import axios from "axios";
import {
  AUTHFAILED,
  LOADING,
  SIGNINSUCCESS,
  SIGNUPSUCCESS,
} from "../actiontypes/usertypes";

import { Alert } from "react-native";
const baseURL = "http://192.168.0.4:4500/auth/";
/**
 *@method POST /auth/signup
 *@description register a new user
 *@access public
 */
export const addUser = (newUserData) => async (dispatch) => {
  // console.log(newUserData);
  dispatch({
    type: LOADING,
  });

  try {
    const res = await axios.post(baseURL + "signup", newUserData);

    dispatch({ type: SIGNUPSUCCESS, payload: res.data.msg });
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);
    // if (error.response.data.errors) {
    //   error.response.data.errors.forEach((el) => Alert.alert(el.msg));
    // }
    // if (error.response.data.msg) {
    //   Alert.alert(error.response.data.msg);
    // }
  }
};

/**
 *@method POST /auth/signin
 *@description login user
 *@access public
 */

export const loginUser = (UserLoginData, navigation) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  // console.log(UserLoginData);
  try {
    const { data } = await axios.post(baseURL + "signin", UserLoginData);
    console.log(data);

    dispatch({ type: SIGNINSUCCESS, payload: data });

    if (data.msg === "user succsessfully logged in") {
      Alert.alert(
        "Sign in",

        data.msg,
        [{ text: "Continue" }],
        { cancelable: true }
      );
      navigation.navigate("Home");
    }
  } catch (error) {
    dispatch({ type: AUTHFAILED, payload: error });
    console.log(error);
    if (error) {
      Alert.alert(
        "Sign in",

        "you entered a wrong email/password, please try again",
        [{ text: "Continue" }],
        { cancelable: true }
      );
    }
  }
};
