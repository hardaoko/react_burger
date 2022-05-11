import { getIngredientsRequest, getOrderRequest } from "../Api";
import { v4 as uuidv4 } from "uuid";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const DELETE_ORDER_LIST = "DELETE_ORDER_LIST";
export const UPGRADE_ORDER_LIST = "UPGRADE_ORDER_LIST";

export const MODAL_DETAILS_OPEN = "MODAL_DETAILS_OPEN";
export const MODAL_ORDER_OPEN = "MODAL_DETAILS_CLOSE";
export const MODAL_CLOSE = "MODAL_CLOSE";

function getIngredientsFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

function getOrderFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    try {
      getIngredientsRequest().then((data) => {
        if (data) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data.data,
          });
        } else {
          dispatch(getIngredientsFailed());
        }
      });
    } catch (e) {
      dispatch(getIngredientsFailed());
      console.error("Ошибка при передаче ингредиентов", e);
    }
  };
}

export function getOrder(chosenIngredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    try {
      getOrderRequest(chosenIngredients).then((data) => {
        if (data) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orderData: data.order.number,
          });
          dispatch({
            type: DELETE_ORDER_LIST,
          });
        } else {
          dispatch(getOrderFailed());
        }
      });
    } catch (e) {
      dispatch(getOrderFailed());
      console.error("Ошибка формирования заказа", e);
    }
  };
}

export function addIngredients(chosenIngredients, ingredient) {
  chosenIngredients.push({
    element: ingredient,
    index: chosenIngredients.length,
    uuid: uuidv4(),
  });
  console.log(chosenIngredients);
  return {
    type: UPGRADE_ORDER_LIST,
    payload: chosenIngredients,
  };
}

export function deleteIngredients(chosenIngredients, index) {
  let arr = [...chosenIngredients];
  arr.splice(index, 1);
  arr = arr.map((item, i) => ({ ...item, index: i }));
  return {
    type: UPGRADE_ORDER_LIST,
    payload: arr,
  };
}

export function replaceIngredients(chosenIngredients, start, end) {
  let arr = [...chosenIngredients];
  if (start === end) return;
  if (start < end) {
    arr.splice(end, 0, arr[start]);
    arr.splice(start, 1);
  } else {
    const replacedItem = arr.splice(start, 1);
    arr.splice(end, 0, replacedItem[0]);
  }

  arr = arr.map((item, i) => ({ ...item, index: i }));

  return {
    type: UPGRADE_ORDER_LIST,
    payload: arr,
  };
}

export function addBun(chosenIngredients, bun) {
  chosenIngredients.splice(0, 1, { element: bun, index: 0, uuid: uuidv4() });
  return {
    type: UPGRADE_ORDER_LIST,
    payload: chosenIngredients,
  };
}
