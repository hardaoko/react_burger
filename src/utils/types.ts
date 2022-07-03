import React from "react";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IUpgradeOrderList } from "../services/actions/ingredients";
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

export type TAppActions = IUpgradeOrderList

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type AppDispatch = typeof store.dispatch;