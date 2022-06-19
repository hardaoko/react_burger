import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { profileReducer } from "./profile";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  profile: profileReducer,
});
