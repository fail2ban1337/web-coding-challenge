import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT
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
    console.log(res);
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

// Register User
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
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
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

// logout
export const logout = dispatch => {
  dispatch({
    type: LOGOUT
  });
};
