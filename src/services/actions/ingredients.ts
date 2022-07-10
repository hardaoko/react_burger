import { getIngredientsRequest, orderRequest } from "../Api";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, AppThunk, IBurgerData, IChosenIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST" as const;
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS" as const;
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED" as const;

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST" as const;
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS" as const;
export const GET_ORDER_FAILED = "GET_ORDER_FAILED" as const;

export const DELETE_ORDER_LIST = "DELETE_ORDER_LIST" as const;
export const UPGRADE_ORDER_LIST = "UPGRADE_ORDER_LIST" as const;

export const MODAL_DETAILS_OPEN = "MODAL_DETAILS_OPEN" as const;
export const MODAL_ORDER_OPEN = "MODAL_ORDER_OPEN" as const;
export const MODAL_CLOSE = "MODAL_CLOSE" as const;

export interface IGetIngredientsRequest  {type: typeof GET_INGREDIENTS_REQUEST;}
export interface IGetIngredientsFailed  {type: typeof GET_INGREDIENTS_FAILED;}
export interface IGetOrderRequest  {type: typeof GET_ORDER_REQUEST;}
export interface IGetOrderFailed  {type: typeof GET_ORDER_FAILED;}
export interface IFeleteOrderList  {type: typeof DELETE_ORDER_LIST;}
export interface IModalOrderOpen  {type: typeof MODAL_ORDER_OPEN;}
export interface IModalClose  {type: typeof MODAL_CLOSE;}

export interface IGetIngredientsSuccess  {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: IBurgerData[]
}

export interface IGetOrderSuccess  {
  type: typeof GET_ORDER_SUCCESS;
  payload: string
}

export interface IModalDetailsOpen  {
  type: typeof MODAL_DETAILS_OPEN;
  payload: IBurgerData;
}

export interface IUpgradeOrderList  {
  type: typeof UPGRADE_ORDER_LIST;
  payload: IChosenIngredient[];
}

export type TIngredientsActions = IGetIngredientsRequest |
  IGetIngredientsSuccess |
  IGetIngredientsFailed |
  IGetOrderRequest |
  IGetOrderSuccess |
  IGetOrderFailed |
  IFeleteOrderList |
  IModalOrderOpen |
  IModalClose |
  IModalDetailsOpen |
  IUpgradeOrderList

function getIngredientsFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

function getOrderFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch ) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    try {
      getIngredientsRequest()
        .then((data) => {
          if (data) {
            dispatch({
              type: GET_INGREDIENTS_SUCCESS,
              payload: data.data,
            });
          } else {
            dispatch(getIngredientsFailed());
          }
        })
        .catch((e) => {
          dispatch(getIngredientsFailed());
          console.error("Ошибка при передаче ингредиентов", e);
        });
    } catch (e) {
      dispatch(getIngredientsFailed());
      console.error("Ошибка при передаче ингредиентов", e);
    }
  };
}

export const getOrder: AppThunk = (token: string, chosenIngredients: IChosenIngredient[]) =>  {
  return function (dispatch: AppDispatch ) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    try {
      orderRequest(token, chosenIngredients)
        .then((data) => {
          if (data) {
            dispatch({
              type: GET_ORDER_SUCCESS,
              payload: data.order.number,
            });
            dispatch({
              type: DELETE_ORDER_LIST,
            });
          } else {
            dispatch(getOrderFailed());
          }
        })
        .catch((e) => {
          dispatch(getOrderFailed());
          console.error("Ошибка формирования заказа", e);
        });
    } catch (e) {
      dispatch(getOrderFailed());
      console.error("Ошибка формирования заказа", e);
    }
  };
}

export const addIngredients = (chosenIngredients: IChosenIngredient[], ingredient: IBurgerData) =>  {
  chosenIngredients.push({
    element: ingredient,
    index: chosenIngredients.length,
    uuid: uuidv4(),
  });
  return {
    type: UPGRADE_ORDER_LIST,
    payload: chosenIngredients,
  };
}

export const deleteIngredients = (chosenIngredients: IChosenIngredient[] , index: number ) => {
  let arr = [...chosenIngredients];
  arr.splice(index, 1);
  arr = arr.map((item, i) => ({ ...item, index: i }));
  return {
    type: UPGRADE_ORDER_LIST,
    payload: arr,
  };
}

export const replaceIngredients = (chosenIngredients: IChosenIngredient[] , start: number , end: number ) =>  {
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

export const addBun = (chosenIngredients: IChosenIngredient[], bun: IBurgerData) => {
  chosenIngredients.splice(0, 1, { element: bun, index: 0, uuid: uuidv4() });
  return {
    type: UPGRADE_ORDER_LIST,
    payload: chosenIngredients,
  };
}
