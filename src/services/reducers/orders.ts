
import { IOrdersState } from '../../utils/types';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_HISTORY_ORDERS, WS_GET_ORDERS, WS_HISTORY_CONNECTION_CLOSED, WS_HISTORY_CONNECTION_ERROR, WS_HISTORY_CONNECTION_SUCCESS } from '../actions/orders';

const initialState: IOrdersState = {
  wsOrders: false,
  wsHistoryOrders: false,
  orders: [],
  historyOrders: [],
  total: 0,
  totalToday: 0,
  orderInfoRequest: false,
  orderInfoFailed: false,
  orderInfo: null,
  ordersError: undefined,
  historyOrdersError: undefined
};

export const ordersReducer = (state = initialState, action: any): IOrdersState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsOrders: true
      };

    case WS_HISTORY_CONNECTION_SUCCESS:
      return {
        ...state,
        wsHistoryOrders: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        ordersError: action.payload,
        wsOrders: false
      };

    case WS_HISTORY_CONNECTION_ERROR:
      return {
        ...state,
        historyOrdersError: action.payload,
        wsHistoryOrders: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        ordersError: undefined,
        wsOrders: false,
        orders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_HISTORY_CONNECTION_CLOSED:
      return {
        ...state,
        historyOrdersError: undefined,
        wsHistoryOrders: false,
        historyOrders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        ordersError: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    case WS_GET_HISTORY_ORDERS:
      return {
        ...state,
        historyOrdersError: undefined,
        historyOrders: action.payload.orders,
      }
    default:
      return state;
  }
};