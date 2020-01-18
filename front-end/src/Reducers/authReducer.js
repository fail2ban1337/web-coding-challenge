import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  FAILIED_REGISTRATION,
  SUCCESS_REGISTRATION,
  REMOVE_ERRORS
} from "../actions/actionTypes";

export const authInitState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export function authReducer(state = authInitState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
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

export const errorsInitState = {
  success: false,
  errors: {
    email: {
      msg: ""
    },
    password: {
      msg: ""
    },
    confirmPassword: {
      msg: ""
    }
  }
};

export const RegisterReducer = (state = errorsInitState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUCCESS_REGISTRATION:
      return {
        ...state,
        success: true
      };
    case FAILIED_REGISTRATION:
      return {
        errors: {
          ...state.errors,
          ...payload.reduce((obj, { param, ...rest }) => {
            obj[param] = { ...rest };
            return obj;
          }, {})
        }
      };
    case REMOVE_ERRORS:
      return errorsInitState;
    default:
      return state;
  }
};
