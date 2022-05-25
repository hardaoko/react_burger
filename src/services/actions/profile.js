import {
  emailCodeRequest,
  getUserDataRequest,
  loginRequest,
  passwordResetRequest,
  registrationRequest,
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
    dispatch(REGISTRATION_REQUEST);
    try {
      registrationRequest(email, password, name)
        .then((data) => {
          if (data) {
            dispatch({
              type: REGISTRATION_SUCCESS,
              accessToken: data.accessToken,
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
    } catch (e) {
      dispatch(getRegistrationFailed());
      console.error("Ошибка при регистрации", e);
    }
  };
}

export function getLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      loginRequest(email, password)
        .then((data) => {
          if (data) {
            console.log("Login", data);
            dispatch({
              type: LOGIN_SUCCESS,
              accessToken: data.accessToken,
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
    } catch (e) {
      dispatch(getLoginFailed());
      console.error("Ошибка при входе", e);
    }
  };
}

export function getUserData(token) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    try {
      getUserDataRequest(token)
        .then((data) => {
          if (data) {
            console.log("PasswordReset", data);
            dispatch({
              type: GET_USER_DATA_SUCCESS,
            });
          } else {
            dispatch(getUserDataFailed());
          }
        })
        .catch((e) => {
          dispatch(getUserDataFailed());
          console.error("Ошибка при сбросе пароля", e);
        });
    } catch (e) {
      dispatch(getUserDataFailed());
      console.error("Ошибка при сбросе пароля", e);
    }
  };
}

export function getEmailCode(email) {
  return function (dispatch) {
    dispatch({
      type: EMAIL_CODE_REQUEST,
    });
    try {
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
    } catch (e) {
      dispatch(getEmailCodeFailed());
      console.error("Ошибка при отправке кода на почту", e);
    }
  };
}

export function getPasswordReset(password, token) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    try {
      passwordResetRequest(password, token)
        .then((data) => {
          if (data) {
            console.log("PasswordReset", data);
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
    } catch (e) {
      dispatch(getPasswordResetFailed());
      console.error("Ошибка при сбросе пароля", e);
    }
  };
}
