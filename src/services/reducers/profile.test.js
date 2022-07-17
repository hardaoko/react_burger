import {
  EMAIL_CODE_FAILED,
  EMAIL_CODE_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
} from "../actions/profile";
import { profileReducer } from "./profile";

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

describe("Тестирования profileReducer", () => {
  it("Тест 'default'", () => {
    expect(profileReducer(undefined, {})).toEqual(initialProfile);
  });

  it("Тест EMAIL_CODE_FAILED", () => {
    const state = {
      ...initialProfile,
      emailCodeRequest: true,
    };
    const action = { type: EMAIL_CODE_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      emailCodeFailed: true,
      emailCodeSuccess: false,
      emailCodeRequest: false,
    });
  });

  it("Тест EMAIL_CODE_SUCCESS", () => {
    const state = {
      ...initialProfile,
      emailCodeRequest: true,
    };
    const action = { type: EMAIL_CODE_SUCCESS };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      emailCodeFailed: false,
      emailCodeSuccess: true,
      emailCodeRequest: false,
    });
  });

  it("Тест PASSWORD_RESET_FAILED", () => {
    const state = {
      ...initialProfile,
      passwordResetRequest: true,
    };
    const action = { type: PASSWORD_RESET_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      passwordResetRequest: false,
      passwordResetSuccess: false,
      passwordResetFailed: true,
    });
  });

  it("Тест PASSWORD_RESET_SUCCESS", () => {
    const state = {
      ...initialProfile,
      passwordResetRequest: true,
    };
    const action = { type: PASSWORD_RESET_SUCCESS, password: "123456" };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      passwordResetRequest: false,
      passwordResetSuccess: true,
      passwordResetFailed: false,
      userPassword: action.password,
    });
  });

  it("Тест REGISTRATION_FAILED", () => {
    const state = {
      ...initialProfile,
      registrationRequest: true,
    };
    const action = { type: REGISTRATION_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      registrationFailed: true,
      registrationSuccess: false,
      registrationRequest: false,
    });
  });

  it("Тест REGISTRATION_SUCCESS", () => {
    const state = {
      ...initialProfile,
      passwordResetRequest: true,
    };
    const action = {
      type: REGISTRATION_SUCCESS,
      accessToken: "1234567",
      userPassword: "123456",
    };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      registrationFailed: false,
      registrationSuccess: true,
      registrationRequest: false,
      accessToken: action.accessToken,
      userPassword: action.password,
    });
  });
});
