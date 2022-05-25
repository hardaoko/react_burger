import {
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_PASSWORD,
  EMAIL_CODE_FAILED,
  EMAIL_CODE_REQUEST,
  EMAIL_CODE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
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

  accessToken: "",
};

export const profileReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case EMAIL_CODE_REQUEST: {
      return {
        ...state,
        emailCodeRequest: true,
        emailCodeSuccess: false,
        emailCodeFailed: false,
      };
    }
    case EMAIL_CODE_SUCCESS: {
      return {
        ...state,
        emailCodeFailed: false,
        emailCodeSuccess: true,
        emailCodeRequest: false,
      };
    }
    case EMAIL_CODE_FAILED: {
      return {
        ...state,
        emailCodeFailed: true,
        emailCodeSuccess: false,
        emailCodeRequest: false,
      };
    }
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetSuccess: false,
        passwordResetFailed: false,
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: true,
        passwordResetFailed: false,
        userPassword: action.password,
      };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: false,
        passwordResetFailed: true,
      };
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
        registrationSuccess: false,
        registrationFailed: false,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationFailed: false,
        registrationSuccess: true,
        registrationRequest: false,
        accessToken: action.accessToken,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationFailed: true,
        registrationSuccess: false,
        registrationRequest: false,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginSuccess: false,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginSuccess: true,
        loginFailed: false,
        accessToken: action.accessToken,
      };
    }
    case LOGIN_FAILED: {
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
