import { LOGIN_SUCCESS, LOGIN_FAIL, SET_ALERT } from "./actionTypes";
import axios from "axios";

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
