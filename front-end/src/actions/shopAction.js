import axios from "axios";
import { SET_ALERT, SHOP_ON_SUCCESS } from "./actionTypes";

export const getShops = async dispatch => {
  try {
    const res = await axios.get("/api/shops/getShops");
    dispatch({
      type: SHOP_ON_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: SET_ALERT,
        payload: { alertType: "error", msg: "server error" }
      });
    }
  }
};

export const getFavShops = async dispatch => {
  try {
    const res = await axios.get("/api/shops/getFavShops");
    dispatch({
      type: SHOP_ON_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch({
        type: SET_ALERT,
        payload: { alertType: "error", msg: "server error" }
      });
    }
  }
};

export const likeShop = async (id, dispatch) => {
  let config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  const body = {
    id
  };
  try {
    const res = await axios.post("/api/shops/likeShop", body, config);
    dispatch({
      type: SET_ALERT,
      payload: { alertType: "success", msg: res.data.msg }
    });
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: { alertType: "error", msg: "server error" }
    });
  }
};

export const dislikeShop = async (id, dispatch) => {
  let config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  const body = {
    id
  };
  try {
    const res = await axios.post("/api/shops/dislikeShop", body, config);
    dispatch({
      type: SET_ALERT,
      payload: { alertType: "error", msg: res.data.msg }
    });
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: { alertType: "error", msg: "server error" }
    });
  }
};

export const removeShop = async (id, dispatch) => {
  let config = {
    header: {
      "Content-Type": "application/json"
    }
  };
  const body = {
    id
  };
  try {
    const res = await axios.post("/api/shops/removeShop", body, config);
    dispatch({
      type: SET_ALERT,
      payload: { alertType: "error", msg: res.data.msg }
    });
  } catch (error) {
    dispatch({
      type: SET_ALERT,
      payload: { alertType: "error", msg: "server error" }
    });
  }
};
