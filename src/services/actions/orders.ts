

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

interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START
}

interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS
}

interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR
}

interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED
}

interface IWsGetOrders {
  type: typeof WS_GET_ORDERS
  payload: any
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

export type TOrdersType =
  IWsConnectionStart |
  IWsConnectionSuccess |
  IWsConnectionError |
  IWsConnectionClosed |
  IWsGetOrders