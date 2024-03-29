import { AppDispatch } from "../../utils/types";
import {
  emailCodeRequest,
  getUserDataRequest,
  setUserDataRequest,
  loginRequest,
  passwordResetRequest,
  refreshTokenRequest,
  registrationRequest,
  logoutRequest,
} from "../Api";

export const CHANGE_NAME = "CHANGE_NAME" as const;
export const CHANGE_PASSWORD = "CHANGE_PASSWORD" as const;
export const CHANGE_EMAIL = "CHANGE_EMAIL" as const;

export const EMAIL_CODE_REQUEST = "EMAIL_CODE_REQUEST" as const;
export const EMAIL_CODE_SUCCESS = "EMAIL_CODE_SUCCESS" as const;
export const EMAIL_CODE_FAILED = "EMAIL_CODE_FAILED" as const;

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST" as const;
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS" as const;
export const REGISTRATION_FAILED = "REGISTRATION_FAILED" as const;

export const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILED = "LOGIN_FAILED" as const;

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST" as const;
export const PASSWORD_RESET_SUCCESS = "GPASSWORD_RESET_SUCCESS" as const;
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED" as const;

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST" as const;
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS" as const;
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED" as const;

export const SET_USER_DATA_REQUEST = "SET_USER_DATA_REQUEST" as const;
export const SET_USER_DATA_SUCCESS = "SET_USER_DATA_SUCCESS" as const;
export const SET_USER_DATA_FAILED = "SET_USER_DATA_FAILED" as const;

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST" as const;
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS" as const;
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED" as const;

export const LOGOUT_REQUEST = "LOGOUT_REQUEST" as const;
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS" as const;
export const LOGOUT_FAILED = "LOGOUT_FAILED" as const;

function getRegistrationFailed() {
  return { type: REGISTRATION_FAILED };
}
function getEmailCodeFailed() {
  return { type: EMAIL_CODE_FAILED };
}
function getLoginFailed() {
  return { type: LOGIN_FAILED };
}
function getPasswordResetFailed() {
  return { type: PASSWORD_RESET_FAILED };
}
function getUserDataFailed() {
  return { type: GET_USER_DATA_FAILED };
}
function setUserDataFailed() {
  return { type: SET_USER_DATA_FAILED };
}
function refreshTokenFailed() {
  return { type: REFRESH_TOKEN_FAILED };
}
function logoutFailed() {
  return { type: LOGOUT_FAILED };
}

export interface IChangeName  {type: typeof CHANGE_NAME;}
export interface IGetIngredientsFailed  {type: typeof CHANGE_PASSWORD;}
export interface IGetOrderRequest  {type: typeof CHANGE_EMAIL;}
export interface IEmailCodeRequest  {type: typeof EMAIL_CODE_REQUEST;}
export interface IEmailCodeSuccess  {type: typeof EMAIL_CODE_SUCCESS;}
export interface IEmailCodeFailed  {type: typeof EMAIL_CODE_FAILED;}
export interface IRegistrationRequest  {type: typeof REGISTRATION_REQUEST;}
export interface IRegistrationSuccess  {
  type: typeof REGISTRATION_SUCCESS,
  accessToken: string,
  password: string
}
export interface IRegistrationFailed  {type: typeof REGISTRATION_FAILED;}
export interface ILoginRequest  {type: typeof LOGIN_REQUEST;}
export interface ILoginSuccess  {
  type: typeof LOGIN_SUCCESS,
  accessToken: string,
  password: string
}
export interface ILoginFailed  {type: typeof LOGIN_FAILED;}
export interface ILogoutRequest  {type: typeof LOGOUT_REQUEST;}
export interface ILogoutSuccess  {type: typeof LOGOUT_SUCCESS;}
export interface ILogoutFailed  {type: typeof LOGOUT_FAILED;}
export interface IPasswordResetRequest  {type: typeof PASSWORD_RESET_REQUEST;}
export interface IPasswordResetSuccess  {
  type: typeof PASSWORD_RESET_SUCCESS,
  password: string;
}
export interface IPasswordResetFailed  {type: typeof PASSWORD_RESET_FAILED;}
export interface IGetUserDataRequest  {type: typeof GET_USER_DATA_REQUEST;}
export interface IGetUserDataSuccess  {
  type: typeof GET_USER_DATA_SUCCESS,
  name: string,
  email: string,
  password?: string
}
export interface IGetUserDataFailed  {type: typeof GET_USER_DATA_FAILED;}
export interface ISetUserDataRequest  {type: typeof SET_USER_DATA_REQUEST;}
export interface ISetUserDataSuccess  {type: typeof SET_USER_DATA_SUCCESS;}
export interface ISetUserDataFailed  {type: typeof SET_USER_DATA_FAILED;}
export interface IRefreshTokenRequest  {type: typeof REFRESH_TOKEN_REQUEST}
export interface IRefreshTokenSuccess  {
  type: typeof REFRESH_TOKEN_SUCCESS,
  accessToken: string
}
export interface IRefreshTokenFailed  {type: typeof REFRESH_TOKEN_FAILED;}

export type TProfileActions = IChangeName |
 IGetIngredientsFailed  |
 IGetOrderRequest  |
 IEmailCodeRequest  |
 IEmailCodeSuccess  |
 IEmailCodeFailed  |
 IRegistrationRequest  |
 IRegistrationSuccess  |
 IRegistrationFailed  |
 ILoginRequest  |
 ILoginSuccess  |
 ILoginFailed  |
 ILogoutRequest  |
 ILogoutSuccess  |
 ILogoutFailed  |
 IPasswordResetRequest  |
 IPasswordResetSuccess  |
 IPasswordResetFailed  |
 IGetUserDataRequest  |
 IGetUserDataSuccess  |
 IGetUserDataFailed  |
 ISetUserDataRequest  |
 ISetUserDataSuccess  |
 ISetUserDataFailed  |
 IRefreshTokenRequest |
 IRefreshTokenSuccess  |
 IRefreshTokenFailed

export const getRegistration = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });

    registrationRequest(email, password, name)
      .then((data) => {
        if (data) {
          dispatch({
            type: REGISTRATION_SUCCESS,
            accessToken: data.accessToken,
            password: password,
          });
          localStorage.setItem("refreshToken", data.refreshToken);
        } else {
          dispatch(getRegistrationFailed());
        }
      })
      .catch((e) => {
        dispatch(getRegistrationFailed());
        console.error("Ошибка при регистрации", e);
      });
  };
}

export const getLogin = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(email, password)
      .then((data) => {
        if (data) {
          dispatch({
            type: LOGIN_SUCCESS,
            accessToken: data.accessToken,
            password: password,
          });
          localStorage.setItem("refreshToken", data.refreshToken);
        } else {
          dispatch(getLoginFailed());
        }
      })
      .catch((e) => {
        dispatch(getLoginFailed());
        console.error("Ошибка при входе", e);
      });
  };
}

export const getUserData = (token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    getUserDataRequest(token)
      .then((data) => {
        if (data) {
          dispatch({
            type: GET_USER_DATA_SUCCESS,
            name: data.user.name,
            email: data.user.email,
          });
        } else {
          dispatch(getUserDataFailed());
        }
      })
      .catch((e) => {
        dispatch(getUserDataFailed());
        console.error("Ошибка при получении данных пользователя", e);
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
      });
  };
}

export const setUserData = (token: string, name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_USER_DATA_REQUEST,
    });
    setUserDataRequest(token, name, email, password)
      .then((data) => {
        if (data) {
          dispatch({
            type: SET_USER_DATA_SUCCESS,
          });
        } else {
          dispatch(setUserDataFailed());
        }
      })
      .catch((e) => {
        dispatch(setUserDataFailed());
        console.error("Ошибка при обновлении данных пользователя", e);
        dispatch(refreshToken(localStorage.getItem("refreshToken")));
      });
  };
}

export const refreshToken = (refreshToken: string | null) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    refreshTokenRequest(refreshToken)
      .then((data) => {
        if (data) {
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            accessToken: data.accessToken,
          });
          localStorage.setItem("refreshToken", data.refreshToken);
        } else {
          dispatch(refreshTokenFailed());
        }
      })
      .catch((e) => {
        dispatch(refreshTokenFailed());
        console.error("Ошибка при обновлении токена", e);
      });
  };
}

export const logout = (refreshToken: string | null) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest(refreshToken)
      .then((data) => {
        if (data) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          localStorage.removeItem("refreshToken");
        } else {
          dispatch(logoutFailed());
        }
      })
      .catch((e) => {
        dispatch(logoutFailed());
        console.error("Ошибка при выходе", e);
      });
  };
}

export const getEmailCode = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: EMAIL_CODE_REQUEST,
    });
    emailCodeRequest(email)
      .then((data) => {
        if (data) {
          dispatch({
            type: EMAIL_CODE_SUCCESS,
          });
        } else {
          dispatch(getEmailCodeFailed());
        }
      })
      .catch((e) => {
        dispatch(getEmailCodeFailed());
        console.error("Ошибка при отправке кода на почту", e);
      });
  };
}

export const getPasswordReset = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    passwordResetRequest(password, token)
      .then((data) => {
        if (data) {
          dispatch({
            type: PASSWORD_RESET_SUCCESS,
            password: data.user.password
          });
        } else {
          dispatch(getPasswordResetFailed());
        }
      })
      .catch((e) => {
        dispatch(getPasswordResetFailed());
        console.error("Ошибка при сбросе пароля", e);
      });
  };
}
