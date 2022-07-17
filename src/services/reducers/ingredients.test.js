import {
  DELETE_ORDER_LIST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";
import { ingredientsReducer } from "./ingredients";

const initialIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  chosenIngredients: [],
  ingredientsList: [],
  bun: null,
  orderData: "",
  orderRequest: false,
  orderFailed: false,
  orderInfo: 0,
  modalDetailsVisible: false,
  modalOrderVisible: false,
  ingredientDetails: null,
  finalCost: 0,
};

describe("First", () => {
  it("Тест 'default'", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialIngredients);
  });

  it("Тест 'GET_INGREDIENTS_FAILED'", () => {
    const state = {
      ...initialIngredients,
      ingredientsRequest: true,
    };

    const action = {
      type: GET_INGREDIENTS_FAILED,
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });

  it("Тест 'GET_INGREDIENTS_SUCCESS'", () => {
    const state = {
      ...initialIngredients,
      ingredientsRequest: true,
    };

    const action = {
      type: GET_INGREDIENTS_SUCCESS,
      payload: [{}],
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      ingredientsRequest: false,
      ingredients: action.payload,
    });
  });

  it("Тест 'DELETE_ORDER_LIST'", () => {
    const state = {
      ...initialIngredients,
      chosenIngredients: [{}, {}, {}],
    };

    const action = {
      type: DELETE_ORDER_LIST,
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      chosenIngredients: [],
    });
  });
});
