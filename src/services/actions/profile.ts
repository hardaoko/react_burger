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

export function getRegistration(email: string, password: string, name: string): any {
  return function (dispatch: any) {
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

export function getLogin(email: string, password: string): any {
  return function (dispatch: any) {
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

export function getUserData(token: string): any {
  return function (dispatch: any) {
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

export function setUserData(token: string, name: string, email: string, password: string): any {
  return function (dispatch: any) {
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

export function refreshToken(refreshToken: string | null): any {
  return function (dispatch: any) {
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

export function logout(refreshToken: string | null): any {
  return function (dispatch: any) {
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

export function getEmailCode(email: string): any {
  return function (dispatch: any) {
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

export function getPasswordReset(password: string, token: string): any {
  return function (dispatch: any) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    passwordResetRequest(password, token)
      .then((data) => {
        if (data) {
          dispatch({
            type: PASSWORD_RESET_SUCCESS,
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
