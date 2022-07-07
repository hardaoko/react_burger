import type { Middleware, MiddlewareAPI } from 'redux';
import { TAppActions, AppDispatch, RootState, IWebsocketActions } from '../../utils/types';


export const socketMiddleware = (wsUrl: string, wsActions: IWebsocketActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TAppActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { profile } = getState();
      const { onInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === onInit) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${profile.accessToken.replace('Bearer ', '')}`);

      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const {data} = event;
          const parsed = JSON.parse(data);
          const {success, ...restParsedData} = parsed;

          dispatch({type: onMessage, payload: restParsedData});
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }

      next(action);
    };
  }) as Middleware;
};