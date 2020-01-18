import { SHOP_ON_SUCCESS, SHOP_ON_ERROR } from "../actions/actionTypes";

export const shopInitState = {
  result: []
};

export function shopReducer(state = shopInitState, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOP_ON_SUCCESS:
      return {
        ...state,
        result: payload
      };
    case SHOP_ON_ERROR:
      return {
        ...state,
        result: []
      };
    default:
      return state;
  }
}
