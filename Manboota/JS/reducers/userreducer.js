import {
  AUTHFAILED,
  GETCURRENTAUTHUSER,
  LOADING,
  LOGOUT,
  SIGNINSUCCESS,
  SIGNUPSUCCESS,
} from "../actiontypes/usertypes";

const initialState = {
  authloading: true,
  error: null,
  Alert: "",
  currentUser: {},
  isAuth: false,
};

export const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, authloading: true };

    case SIGNUPSUCCESS:
      return { ...state, authloading: false, Alert: payload };

    case SIGNINSUCCESS:
      return {
        ...state,
        Alert: payload.msg,
        authloading: false,
        isAuth: true,
      };

    case GETCURRENTAUTHUSER:
      return {
        ...state,
        currentUser: payload,
        isAuth: true,
        authloading: false,
      };

    case LOGOUT:
      return {
        ...state,
        authloading: true,
        error: null,
        Alert: null,
        currentUser: {},
        isAuth: false,
      };
    case AUTHFAILED:
      return { ...state, error: payload, authloading: false };

    default:
      return state;
  }
};
