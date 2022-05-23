import {
  GET_EMAIL_CODE_FAILED,
  GET_EMAIL_CODE_REQUEST,
  GET_EMAIL_CODE_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
} from "../actions/profile";

const initialProfile = {
  emailCodeRequest: false,
  emailCodeSuccess: false,
  emailCodeFailed: false,

  registrationRequest: false,
  registrationSuccess: false,
  registrationFailed: false,

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

    default: {
      return state;
    }
  }
};
