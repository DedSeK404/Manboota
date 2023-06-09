import axios from "axios";
import { Alert } from "react-native";
import {
  EDITPLANT,
  GETALLPLANTS,
  PLANTADDEDSUCCESSFULLY,
  PLANTFAILED,
  PLANTLOADING,
  DELETEPLANT,
} from "../actiontypes/planttypes";

const baseURL = "http://192.168.0.4:4500/plant/";

/**
 *@method POST /plant/add
 *@description add a new tree/plant
 *@access private
 */
export const addPlant = (plantData, closePlantModal) => async (dispatch) => {
  dispatch({
    type: PLANTLOADING,
  });

  try {
    const res = await axios.post(baseURL + "add", plantData);

    dispatch({ type: PLANTADDEDSUCCESSFULLY });
    Alert.alert(
      "Post",

      res.data.msg,
      [{ text: "Continue" }],
      { cancelable: true }
    );
    closePlantModal();
    dispatch(getallplants(plantData.user));
  } catch (error) {
    dispatch({ type: PLANTFAILED, payload: error });
    console.log(error);
    if (error.response.data.errors) {
      error.response.data.errors.forEach((el) =>
        Alert.alert(
          "Post",

          el.msg,
          [{ text: "Continue" }],
          { cancelable: true }
        )
      );
    }
    if (error.response.data.msg) {
      Alert.alert(
        "Post",

        error.response.data.msg,
        [{ text: "Continue" }],
        { cancelable: true }
      );
    }
  }
};

/**
 * @route get /plant/
 * @description get all plants
 * @access protected(authenticated)
 */
export const getallplants = (user) => async (dispatch) => {
  dispatch({ type: PLANTLOADING });

  try {
    const { data } = await axios.get(`${baseURL}/${user}`);

    dispatch({ type: GETALLPLANTS, payload: data });
  } catch (error) {
    dispatch({ type: PLANTFAILED, payload: error });
    Alert.alert("Post", error, [{ text: "Continue" }], { cancelable: true });
  }
};

/**
 * @route patch /plant/edit
 * @description update plant
 * @access protected
 */
export const editPlant =
  (editData, setIsSet, setModalVisible) => async (dispatch) => {
    dispatch({
      type: PLANTLOADING,
    });

    try {
      const { data } = await axios.patch(baseURL + "edit", editData);

      Alert.alert(
        "Edit",

        data.msg,
        [{ text: "Continue" }],
        { cancelable: true }
      );
      dispatch(getallplants(editData.user));
      dispatch({ type: EDITPLANT, payload: data.msg });
      if (setIsSet) {
        setIsSet(true);
      }
      if (data.msg == "Your repeating timer was cancelled") {
        setIsSet(false);
      }
      if (setModalVisible) {
        setModalVisible(false);
      }
    } catch (error) {
      dispatch({ type: PLANTFAILED, payload: error });
      console.log(error);
      if (error.response.data.errors) {
        error.response.data.errors.forEach((el) =>
          Alert.alert(
            "Edit",

            el.msg,
            [{ text: "Continue" }],
            { cancelable: true }
          )
        );
      }
    }
  };

/**
 * @route delete /plant/delete/${plantID}
 * @description delete plant
 * @access protected
 */
export const deletePlant = (plantID, user) => async (dispatch) => {
  dispatch({
    type: PLANTLOADING,
  });

  try {
    const { data } = await axios.delete(baseURL + `delete/${plantID}`);

    Alert.alert(
      "Delete",

      data.msg,
      [{ text: "Continue" }],
      { cancelable: true }
    );
    dispatch({ type: DELETEPLANT });
    dispatch(getallplants(user));
  } catch (error) {
    dispatch({ type: PLANTFAILED, payload: error });
    console.log(error);
  }
};
