import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ordersReducer } from "./orders";
import { profileReducer } from "./profile";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  profile: profileReducer,
  orders: ordersReducer,
});
