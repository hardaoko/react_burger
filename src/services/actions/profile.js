import {
  getEmailCodeRequest,
  getLoginRequest,
  getPasswordResetRequest,
  getRegistrationRequest,
} from "../Api";

export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_EMAIL = "CHANGE_EMAIL";

export const GET_EMAIL_CODE_REQUEST = "GET_EMAIL_CODE_REQUEST";
export const GET_EMAIL_CODE_SUCCESS = "GET_EMAIL_CODE_SUCCESS";
export const GET_EMAIL_CODE_FAILED = "GET_EMAIL_CODE_FAILED";

export const GET_REGISTRATION_REQUEST = "GET_REGISTRATION_REQUEST";
export const GET_REGISTRATION_SUCCESS = "GET_REGISTRATION_SUCCESS";
export const GET_REGISTRATION_FAILED = "GET_REGISTRATION_FAILED";

export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILED = "GET_LOGIN_FAILED";

export const GET_PASSWORD_RESET_REQUEST = "GET_PASSWORD_RESET_REQUEST";
export const GET_PASSWORD_RESET_SUCCESS = "GET_PASSWORD_RESET_SUCCESS";
export const GET_PASSWORD_RESET_FAILED = "GET_PASSWORD_RESET_FAILED";

function getRegistrationFailed() {
  return { type: GET_REGISTRATION_FAILED };
}
function getEmailCodeFailed() {
  return { type: GET_EMAIL_CODE_FAILED };
}
function getLoginFailed() {
  return { type: GET_LOGIN_FAILED };
}
function getPasswordResetFailed() {
  return { type: GET_PASSWORD_RESET_FAILED };
}

export function setUserName(name) {
  return { type: CHANGE_NAME, name: name };
}
export function setUserPassword(password) {
  return { type: CHANGE_PASSWORD, password: password };
}
export function setUserEmail(email) {
  return { type: CHANGE_EMAIL, email: email };
}

export function getRegistration(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: GET_REGISTRATION_REQUEST,
    });
    try {
      getRegistrationRequest(email, password, name).then((data) => {
        if (data) {
          console.log(data);
          dispatch({
            type: GET_REGISTRATION_SUCCESS,
            email: email,
            name: name,
            password: password,
          });
        } else {
          dispatch(getRegistrationFailed());
        }
      });
    } catch (e) {
      dispatch(getRegistrationFailed());
      console.error("Ошибка при регистрации", e);
    }
  };
}

export function getLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: GET_LOGIN_REQUEST,
    });
    try {
      getLoginRequest(email, password).then((data) => {
        if (data) {
          console.log("Login", data);
          dispatch({
            type: GET_LOGIN_SUCCESS,
            email: email,
            name: data.user.name,
            password: password,
          });
        } else {
          dispatch(getLoginFailed());
        }
      });
    } catch (e) {
      dispatch(getLoginFailed());
      console.error("Ошибка при входе", e);
    }
  };
}

export function getEmailCode(email) {
  return function (dispatch) {
    dispatch({
      type: GET_EMAIL_CODE_REQUEST,
    });
    try {
      getEmailCodeRequest(email).then((data) => {
        if (data) {
          dispatch({
            type: GET_EMAIL_CODE_SUCCESS,
          });
        } else {
          dispatch(getEmailCodeFailed());
        }
      });
    } catch (e) {
      dispatch(getEmailCodeFailed());
      console.error("Ошибка при отправке кода на почту", e);
    }
  };
}

export function getPasswordReset(password, token) {
  return function (dispatch) {
    dispatch({
      type: GET_PASSWORD_RESET_REQUEST,
    });
    try {
      getPasswordResetRequest(password, token).then((data) => {
        if (data) {
          console.log("PasswordReset", data);
          dispatch({
            type: GET_PASSWORD_RESET_SUCCESS,
          });
        } else {
          dispatch(getPasswordResetFailed());
        }
      });
    } catch (e) {
      dispatch(getPasswordResetFailed());
      console.error("Ошибка при сбросе пароля", e);
    }
  };
}
