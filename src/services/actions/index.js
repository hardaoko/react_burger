import { getIngredientsRequest, getOrderRequest } from "../Api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const UPGRADE_ORDER_LIST = "UPGRADE_ORDER_LIST";
export const SORT_ORDER = "SORT_ORDER";

export const MODAL_DETAILS_OPEN = "MODAL_DETAILS_OPEN";
export const MODAL_ORDER_OPEN = "MODAL_DETAILS_CLOSE";
export const MODAL_CLOSE = "MODAL_CLOSE";

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
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      });
    } catch (e) {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
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
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      });
    } catch (e) {
      dispatch({
        type: GET_ORDER_FAILED,
      });
      console.error("Ошибка формирования заказа", e);
    }
  };
}

export function addIngredients(chosenIngredients, ingredient) {
  return function (dispatch) {
    chosenIngredients.push({
      element: ingredient,
      index: chosenIngredients.length,
    });
    dispatch({
      type: UPGRADE_ORDER_LIST,
      payload: chosenIngredients,
    });
  };
}

export function deleteIngredients(chosenIngredients, index) {
  return function (dispatch) {
    let arr = [...chosenIngredients];
    arr.splice(index, 1);
    arr = arr.map((item, i) => ({ ...item, index: i }));
    dispatch({
      type: UPGRADE_ORDER_LIST,
      payload: arr,
    });
  };
}

export function replaceIngredients(chosenIngredients, start, end) {
  return function (dispatch) {
    let arr = [...chosenIngredients];
    if (start === end) return;
    if (start < end) {
      arr.splice(end, 0, arr[start]);
      arr.splice(start, 1);
    } else {
      const a = arr.splice(start, 1);
      arr.splice(end, 0, a[0]);
    }

    arr = arr.map((item, i) => ({ ...item, index: i }));

    dispatch({
      type: UPGRADE_ORDER_LIST,
      payload: arr,
    });
  };
}

export function addBun(chosenIngredients, bun) {
  return function (dispatch) {
    chosenIngredients.splice(0, 1, { element: bun, index: 0 });
    dispatch({
      type: UPGRADE_ORDER_LIST,
      payload: chosenIngredients,
    });
  };
}
