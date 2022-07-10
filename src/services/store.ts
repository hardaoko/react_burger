import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { allOrdersUrl, ordersHistoryUrl } from "../utils/constants";
import { wsAllOrdersActions, wsHistoryOrdersActions } from "./actions/orders";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers";

const composeEnhancers =
  typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

    const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(allOrdersUrl, wsAllOrdersActions), socketMiddleware(ordersHistoryUrl, wsHistoryOrdersActions)));

export const store = createStore(rootReducer, enhancer);
