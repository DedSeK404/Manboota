import {
  AUTHFAILED,
  CURRENTUSERAUTH,
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
  currentUserR: {},
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
        currentUser: payload.user,
        authloading: false,
        isAuth: true,
      };

    case CURRENTUSERAUTH:
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
