import { IOrder, IOrderResponse } from "../../utils/types";


export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_ORDERS = 'WS_GET_ORDERS' as const;

export const WS_HISTORY_CONNECTION_START = 'WS_HISTORY_CONNECTION_START' as const;
export const WS_HISTORY_CONNECTION_SUCCESS = 'WS_HISTORY_CONNECTION_SUCCESS' as const;
export const WS_HISTORY_CONNECTION_ERROR = 'WS_HISTORY_CONNECTION_ERROR' as const;
export const WS_HISTORY_CONNECTION_CLOSED = 'WS_HISTORY_CONNECTION_CLOSED' as const;
export const WS_GET_HISTORY_ORDERS = 'WS_GET_HISTORY_ORDERS' as const;

export const MODAL_ORDER_INFO_OPEN = "MODAL_ORDER_INFO_OPEN" as const;

interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START
}

interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS,
  payload: Event
}

interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR
  payload: Event
}

interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED
  payload?: CloseEvent
}

interface IWsGetOrders {
  type: typeof WS_GET_ORDERS
  payload: IOrderResponse
}

interface IWsHistoryConnectionStart {
  type: typeof WS_HISTORY_CONNECTION_START
}

interface IWsHistoryConnectionSuccess {
  type: typeof WS_HISTORY_CONNECTION_SUCCESS
  payload: Event
}

interface IWsHistoryConnectionError {
  type: typeof WS_HISTORY_CONNECTION_ERROR
  payload: Event
}

interface IWsHistoryConnectionClosed {
  type: typeof WS_HISTORY_CONNECTION_CLOSED
  payload?: CloseEvent
}

interface IWsGetHistoryOrders {
  type: typeof WS_GET_HISTORY_ORDERS
  payload: IOrderResponse
}

interface IModalOrderInfoOpen {
  type: typeof MODAL_ORDER_INFO_OPEN
  payload: IOrder
}

export interface IWebsocketActions {
  onInit: typeof WS_CONNECTION_START | typeof WS_HISTORY_CONNECTION_START,
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_HISTORY_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_HISTORY_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR | typeof WS_HISTORY_CONNECTION_ERROR,
  onMessage: typeof WS_GET_ORDERS | typeof WS_GET_HISTORY_ORDERS
}

export const wsOrdersConnectionStart = () => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsOrdersClose = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsHistoryConnectionStart = () => {
  return {
    type: WS_HISTORY_CONNECTION_START
  };
};

export const wsHistoryConnectionClose = () => {
  return {
    type: WS_HISTORY_CONNECTION_CLOSED
  };
};

export const wsAllOrdersActions = {
  onInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};

export const wsHistoryOrdersActions = {
  onInit: WS_HISTORY_CONNECTION_START,
  onOpen: WS_HISTORY_CONNECTION_SUCCESS,
  onClose: WS_HISTORY_CONNECTION_CLOSED,
  onError: WS_HISTORY_CONNECTION_ERROR,
  onMessage: WS_GET_HISTORY_ORDERS
};

export type TOrdersActions =
  IWsConnectionStart |
  IWsConnectionSuccess |
  IWsConnectionError |
  IWsConnectionClosed |
  IWsGetOrders |
  IWsHistoryConnectionStart |
  IWsHistoryConnectionSuccess |
  IWsHistoryConnectionError |
  IWsHistoryConnectionClosed |
  IWsGetHistoryOrders |
  IModalOrderInfoOpen