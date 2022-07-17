import {
  DELETE_ORDER_LIST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  MODAL_DETAILS_OPEN,
  UPGRADE_ORDER_LIST,
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

describe("Тестирование ingredientsReducer", () => {
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

  it("Тест 'GET_ORDER_FAILED'", () => {
    const state = {
      ...initialIngredients,
      orderRequest: true,
    };

    const action = {
      type: GET_ORDER_FAILED,
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      orderRequest: false,
      orderFailed: true,
    });
  });

  it("Тест 'GET_ORDER_SUCCESS'", () => {
    const state = {
      ...initialIngredients,
      orderRequest: true,
    };

    const action = {
      type: GET_ORDER_SUCCESS,
      payload: "1234",
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      orderRequest: false,
      orderData: action.payload,
    });
  });

  it("Тест 'UPGRADE_ORDER_LIST'", () => {
    const state = initialIngredients;

    const action = {
      type: UPGRADE_ORDER_LIST,
      payload: [
        { element: { type: "bun", price: 1 } },
        { element: { type: "sauce", price: 2 } },
        { element: { type: "main", price: 3 } },
      ],
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      chosenIngredients: action.payload,
      bun: action.payload[0],
      ingredientsList: [action.payload[1], action.payload[2]],
      finalCost: 7,
    });
  });

  it("Тест 'DELETE_ORDER_LIST'", () => {
    const state = {
      ...initialIngredients,
      chosenIngredients: [{}, {}, {}],
      bun: {},
      ingredientsList: [{}, {}],
      finalCost: 123,
    };

    const action = {
      type: DELETE_ORDER_LIST,
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      chosenIngredients: [],
      bun: null,
      ingredientsList: [],
      finalCost: 0,
    });
  });

  it("Тест 'MODAL_DETAILS_OPEN'", () => {
    const state = {
      ...initialIngredients,
      ingredientDetails: {},
      modalDetailsVisible: false,
    };

    const action = {
      type: MODAL_DETAILS_OPEN,
      payload: { type: "bun" },
    };

    expect(ingredientsReducer(state, action)).toEqual({
      ...state,
      ingredientDetails: action.payload,
      modalDetailsVisible: true,
    });
  });
});
