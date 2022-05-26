import {
  EMAIL_CODE_FAILED,
  EMAIL_CODE_REQUEST,
  EMAIL_CODE_SUCCESS,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  SET_USER_DATA_FAILED,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
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

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,

  getUserDataRequest: false,
  getUserDataSuccess: false,
  getUserDataFailed: false,

  setUserDataRequest: false,
  setUserDataSuccess: false,
  setUserDataFailed: false,

  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenFailed: false,

  isAuth: false,

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
        userPassword: action.password,
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
        userPassword: action.password,
        isAuth: true,
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
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        getUserDataRequest: true,
        getUserDataSuccess: false,
        getUserDataFailed: false,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataSuccess: true,
        getUserDataFailed: false,
        userName: action.name,
        userEmail: action.email,
        userPassword: action.password,
        isAuth: true,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataSuccess: false,
        getUserDataFailed: true,
        isAuth: false,
      };
    }
    case SET_USER_DATA_REQUEST: {
      return {
        ...state,
        setUserDataRequest: true,
        setUserDataSuccess: false,
        setUserDataFailed: false,
      };
    }
    case SET_USER_DATA_SUCCESS: {
      return {
        ...state,
        setUserDataRequest: false,
        setUserDataSuccess: true,
        setUserDataFailed: false,
      };
    }
    case SET_USER_DATA_FAILED: {
      return {
        ...state,
        setUserDataRequest: false,
        setUserDataSuccess: false,
        setUserDataFailed: true,
      };
    }

    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenSuccess: false,
        refreshTokenFailed: false,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenSuccess: true,
        refreshTokenFailed: false,
        accessToken: action.accessToken,
        isAuth: true,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenSuccess: false,
        refreshTokenFailed: true,
        isAuth: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutSuccess: false,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: true,
        logoutFailed: false,
        loginSuccess: false,
        userName: "",
        userEmail: "",
        userPassword: "",
        isAuth: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: false,
        logoutFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
