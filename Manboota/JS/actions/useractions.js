import axios from "axios";
import {
  AUTHFAILED,
  FAILED,
  LOADING,
  LOGOUT,
  SIGNINSUCCESS,
  SIGNUPSUCCESS,
} from "../actiontypes/usertypes";
import * as SecureStore from "expo-secure-store";
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

export const loginUser = (UserLoginData, LoginSetter) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const { data } = await axios.post(baseURL + "signin", UserLoginData);

    dispatch({ type: SIGNINSUCCESS, payload: data });
    async function save() {
      await SecureStore.setItemAsync("Auth", data.token);
    }
    save();
    LoginSetter();
    if (data.msg === "user succsessfully logged in") {
      Alert.alert(
        "Sign in",

        data.msg,
        [{ text: "Continue" }],
        { cancelable: true }
      );
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

export const logout = (LoginSetter) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  try {
    async function saveLogout() {
      await SecureStore.setItemAsync("Auth", "");
    }
    saveLogout();
    LoginSetter();
   
  } catch (error) {
    dispatch({ type: FAILED, payload: error });
    console.log(error);
  }
};
