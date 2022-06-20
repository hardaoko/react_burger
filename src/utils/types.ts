import PropTypes from "prop-types";
import React from "react";


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
