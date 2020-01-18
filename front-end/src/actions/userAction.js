import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  FAILIED_REGISTRATION,
  SUCCESS_REGISTRATION
} from "./actionTypes";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// lgoin User
export const login = async (email, password, dispatch) => {
  let config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  const body = {
    email,
    password
  };
  try {
    const res = await axios.post("/api/users/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    loadUser(dispatch);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: SET_ALERT,
        payload: { alertType: "error", msg: errors[0].msg }
      });
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const register = async (email, password, confirmPassword, dispatch) => {
  let config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  const body = {
    email,
    password,
    confirmPassword
  };
  try {
    await axios.post("/api/users/register", body, config);
    dispatch({
      type: SUCCESS_REGISTRATION
    });
    dispatch({
      type: SET_ALERT,
      payload: {
        alertType: "success",
        msg: "Register Sucess You can now login"
      }
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: FAILIED_REGISTRATION,
      payload: errors
    });
    dispatch({
      type: SET_ALERT,
      payload: { alertType: "error", msg: "Please Set Your data correctly" }
    });
  }
};

// logout
export const logout = dispatch => {
  dispatch({
    type: LOGOUT
  });
};
