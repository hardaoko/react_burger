import { getEmailCodeRequest, getRegistrationRequest } from "../Api";

export const GET_EMAIL_CODE_REQUEST = "GET_EMAIL_CODE_REQUEST";
export const GET_EMAIL_CODE_SUCCESS = "GET_EMAIL_CODE_SUCCESS";
export const GET_EMAIL_CODE_FAILED = "GET_EMAIL_CODE_FAILED";

export const GET_REGISTRATION_REQUEST = "GET_REGISTRATION_REQUEST";
export const GET_REGISTRATION_SUCCESS = "GET_REGISTRATION_SUCCESS";
export const GET_REGISTRATION_FAILED = "GET_REGISTRATION_FAILED";

function getRegistrationFailed() {
  return { type: GET_REGISTRATION_FAILED };
}
function getEmailCodeFailed() {
  return { type: GET_EMAIL_CODE_FAILED };
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
