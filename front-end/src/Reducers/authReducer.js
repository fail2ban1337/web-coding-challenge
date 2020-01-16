import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/actionTypes";

export const authInitState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export function authReducer(state = authInitState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
