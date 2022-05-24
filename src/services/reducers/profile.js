import {
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_PASSWORD,
  GET_EMAIL_CODE_FAILED,
  GET_EMAIL_CODE_REQUEST,
  GET_EMAIL_CODE_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_PASSWORD_RESET_FAILED,
  GET_PASSWORD_RESET_REQUEST,
  GET_PASSWORD_RESET_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
} from "../actions/profile";

const initialProfile = {
  emailCodeRequest: false,
  emailCodeSuccess: false,
  emailCodeFailed: false,

  passwordResetRequest: false,
  passwordResetSuccess: false,
  passwordResetFailed: false,

  registrationRequest: false,
  registrationSuccess: false,
  registrationFailed: false,

  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,

  userName: "",
  userEmail: "",
  userPassword: "",
};

export const profileReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case GET_EMAIL_CODE_REQUEST: {
      return {
        ...state,
        emailCodeRequest: true,
        emailCodeSuccess: false,
        emailCodeFailed: false,
      };
    }
    case GET_EMAIL_CODE_SUCCESS: {
      return {
        ...state,
        emailCodeFailed: false,
        emailCodeSuccess: true,
        emailCodeRequest: false,
      };
    }
    case GET_EMAIL_CODE_FAILED: {
      return {
        ...state,
        emailCodeFailed: true,
        emailCodeSuccess: false,
        emailCodeRequest: false,
      };
    }
    case GET_PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetSuccess: false,
        passwordResetFailed: false,
      };
    }
    case GET_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: true,
        passwordResetFailed: false,
        userPassword: action.password,
      };
    }
    case GET_PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: false,
        passwordResetFailed: true,
      };
    }
    case GET_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registrationSuccess: false,
        registrationFailed: false,
      };
    }
    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationFailed: false,
        registrationSuccess: true,
        registrationRequest: false,
        userEmail: action.email,
        userName: action.name,
        userPassword: action.password,
      };
    }
    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        registrationFailed: true,
        registrationSuccess: false,
        registrationRequest: false,
      };
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginSuccess: false,
        loginFailed: false,
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginSuccess: true,
        loginFailed: false,
        userEmail: action.email,
        userName: action.name,
        userPassword: action.password,
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginSuccess: false,
        loginFailed: true,
      };
    }

    case CHANGE_NAME: {
      return {
        ...state,
        userName: action.name,
      };
    }
    case CHANGE_EMAIL: {
      return {
        ...state,
        userEmail: action.email,
      };
    }
    case CHANGE_PASSWORD: {
      return {
        ...state,
        userPassword: action.password,
      };
    }

    default: {
      return state;
    }
  }
};
