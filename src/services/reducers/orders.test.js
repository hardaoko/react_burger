import {
  MODAL_ORDER_INFO_OPEN,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_HISTORY_ORDERS,
  WS_GET_ORDERS,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
  WS_HISTORY_CONNECTION_SUCCESS,
} from "../actions/orders";
import { ordersReducer } from "./orders";

const initialOrders = {
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
  historyOrdersError: undefined,
};

describe("Тестирование ordersReducer", () => {
  it("Тест default", () => {
    expect(ordersReducer(undefined, {})).toEqual(initialOrders);
  });

  it("Тест WS_CONNECTION_SUCCESS", () => {
    const state = initialOrders;
    const action = { type: WS_CONNECTION_SUCCESS };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      wsOrders: true,
    });
  });

  it("Тест WS_HISTORY_CONNECTION_SUCCESS", () => {
    const state = initialOrders;
    const action = { type: WS_HISTORY_CONNECTION_SUCCESS };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      wsHistoryOrders: true,
    });
  });

  it("Тест WS_CONNECTION_ERROR", () => {
    const state = { ...initialOrders, wsOrders: true };
    const action = { type: WS_CONNECTION_ERROR, payload: {} };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      ordersError: action.payload,
      wsOrders: false,
    });
  });

  it("Тест WS_HISTORY_CONNECTION_ERROR", () => {
    const state = { ...initialOrders, wsHistoryOrders: true };
    const action = { type: WS_HISTORY_CONNECTION_ERROR, payload: {} };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      historyOrdersError: action.payload,
      wsHistoryOrders: false,
    });
  });

  it("Тест WS_CONNECTION_CLOSED", () => {
    const state = {
      ...initialOrders,
      ordersError: undefined,
      wsOrders: true,
      orders: [{}, {}, {}],
      total: 12345,
      totalToday: 1234,
    };
    const action = { type: WS_CONNECTION_CLOSED };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      ordersError: undefined,
      wsOrders: false,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it("Тест WS_HISTORY_CONNECTION_CLOSED", () => {
    const state = {
      ...initialOrders,
      historyOrdersError: undefined,
      wsHistoryOrders: true,
      historyOrders: [{}, {}, {}],
      total: 12345,
      totalToday: 1234,
    };
    const action = { type: WS_HISTORY_CONNECTION_CLOSED };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      historyOrdersError: undefined,
      wsHistoryOrders: false,
      historyOrders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it("Тест WS_GET_ORDERS", () => {
    const state = { ...initialOrders, ordersError: {} };
    const action = {
      type: WS_GET_ORDERS,
      payload: {
        orders: [{}, {}, {}],
        total: 12345,
        totalToday: 1234,
      },
    };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      ordersError: undefined,
      orders: action.payload.orders,
      total: action.payload.total,
      totalToday: action.payload.totalToday,
    });
  });

  it("Тест WS_GET_HISTORY_ORDERS", () => {
    const state = { ...initialOrders, historyOrdersError: {} };
    const action = {
      type: WS_GET_HISTORY_ORDERS,
      payload: {
        orders: [{ order: 1 }, { order: 2 }, { order: 3 }],
      },
    };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      historyOrdersError: undefined,
      historyOrders: [{ order: 3 }, { order: 2 }, { order: 1 }],
    });
  });

  it("Тест MODAL_ORDER_INFO_OPEN", () => {
    const state = initialOrders;
    const action = {
      type: MODAL_ORDER_INFO_OPEN,
      payload: {},
    };
    expect(ordersReducer(state, action)).toEqual({
      ...state,
      orderInfo: action.payload,
    });
  });
});
