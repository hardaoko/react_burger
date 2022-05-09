import { combineReducers } from "redux";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  UPGRADE_ORDER_LIST,
} from "../actions";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  chosenIngredients: [],

  orderData: null,
  orderRequest: false,
  orderFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        //chosenIngredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderData: action.orderData,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    case UPGRADE_ORDER_LIST: {
      return {
        ...state,
        chosenIngredients: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderData: action.orderData,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }

    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});
