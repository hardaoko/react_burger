import React from "react";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IUpgradeOrderList } from "../services/actions/ingredients";
import { TOrdersType } from "../services/actions/orders";
import { store } from "../services/store";


export interface IBurgerData {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  uuid: string,
  __v: number,
  _id: string,
}

export interface IOrder {
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string,
}

export interface IIngredientDetailsProps {
  title?: string
}

export interface IModalProps {
  title?: string,
  children: React.ReactNode,
  onClose: () => void
}

export interface IModalOverlayProps {
  onClose: () => void
}

export interface IChosenIngredient {
  element: IBurgerData,
  index: number,
  uuid: string,
}

export interface IRouteProps {
  children?: React.ReactNode;
  path?: string;
}

export interface IOrderComponentProps {
  order: IOrder,
  onOpen: () => void,
  isStatus?: boolean
}

export interface IWebsocketActions {
  onInit: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string
}



export interface IIngredientsState {
  ingredients: IBurgerData[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  chosenIngredients: IChosenIngredient[],
  ingredientsList: IChosenIngredient[],
  bun: IChosenIngredient | null,
  orderData: number,
  orderRequest: boolean,
  orderFailed: boolean,
  orderInfo: number,
  modalDetailsVisible: boolean,
  modalOrderVisible: boolean,
  ingredientDetails: IBurgerData | null,
  finalCost: number,
};

export interface IProfileState {
  emailCodeRequest: boolean,
  emailCodeSuccess: boolean,
  emailCodeFailed: boolean,
  passwordResetRequest: boolean,
  passwordResetSuccess: boolean,
  passwordResetFailed: boolean,
  registrationRequest: boolean,
  registrationSuccess: boolean,
  registrationFailed: boolean,
  loginRequest: boolean,
  loginSuccess: boolean,
  loginFailed: boolean,
  logoutRequest: boolean,
  logoutSuccess: boolean,
  logoutFailed: boolean,
  getUserDataRequest: boolean,
  getUserDataSuccess: boolean,
  getUserDataFailed: boolean,
  setUserDataRequest: boolean,
  setUserDataSuccess: boolean,
  setUserDataFailed: boolean,
  refreshTokenRequest: boolean,
  refreshTokenSuccess: boolean,
  refreshTokenFailed: boolean,
  isAuth: boolean,
  userName: string,
  userEmail: string,
  userPassword: string,
  accessToken: string,
};

export interface IOrdersState  {
  wsOrders: boolean,
  wsHistoryOrders: boolean,
  orders: IOrder[],
  historyOrders: IOrder[],
  total: number,
  totalToday: number,
  orderInfoRequest: boolean,
  orderInfoFailed: boolean,
  orderInfo: IOrder | null,
  ordersError: undefined | Event,
  historyOrdersError: undefined | Event
};

export type TAppActions = IUpgradeOrderList | TOrdersType

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type AppDispatch = typeof store.dispatch;