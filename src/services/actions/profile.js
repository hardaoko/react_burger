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

export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_EMAIL = "CHANGE_EMAIL";

export const EMAIL_CODE_REQUEST = "EMAIL_CODE_REQUEST";
export const EMAIL_CODE_SUCCESS = "EMAIL_CODE_SUCCESS";
export const EMAIL_CODE_FAILED = "EMAIL_CODE_FAILED";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "GPASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";

export const SET_USER_DATA_REQUEST = "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_SUCCESS = "SET_USER_DATA_SUCCESS";
export const SET_USER_DATA_FAILED = "SET_USER_DATA_FAILED";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

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

export function getRegistration(email, password, name) {
  return function (dispatch) {
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

export function getLogin(email, password) {
  return function (dispatch) {
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

export function getUserData(token) {
  return function (dispatch) {
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

export function setUserData(token, name, email, password) {
  return function (dispatch) {
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

export function refreshToken(refreshToken) {
  return function (dispatch) {
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

export function logout(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest(refreshToken)
      .then((data) => {
        console.log("logout", data);
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

export function getEmailCode(email) {
  return function (dispatch) {
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

export function getPasswordReset(password, token) {
  return function (dispatch) {
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
        dispatch(getPasswordResetFailed(e));
        console.error("Ошибка при сбросе пароля", e);
      });
  };
}
