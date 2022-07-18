import {
  EMAIL_CODE_FAILED,
  EMAIL_CODE_SUCCESS,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  SET_USER_DATA_FAILED,
  SET_USER_DATA_SUCCESS,
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
      password: "123456",
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

  it("Тест LOGIN_FAILED", () => {
    const state = {
      ...initialProfile,
      loginRequest: true,
    };
    const action = { type: LOGIN_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      loginRequest: false,
      loginSuccess: false,
      loginFailed: true,
    });
  });

  it("Тест LOGIN_SUCCESS", () => {
    const state = {
      ...initialProfile,
      loginRequest: true,
    };
    const action = {
      type: LOGIN_SUCCESS,
      accessToken: "1234567",
      password: "123456",
    };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      loginRequest: false,
      loginSuccess: true,
      loginFailed: false,
      accessToken: action.accessToken,
      userPassword: action.password,
      isAuth: true,
    });
  });

  it("Тест GET_USER_DATA_FAILED", () => {
    const state = {
      ...initialProfile,
      getUserDataRequest: true,
      isAuth: true,
    };
    const action = { type: GET_USER_DATA_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      getUserDataRequest: false,
      getUserDataSuccess: false,
      getUserDataFailed: true,
      isAuth: false,
    });
  });

  it("Тест GET_USER_DATA_SUCCESS", () => {
    const state = {
      ...initialProfile,
      loginRequest: true,
      isAuth: false,
    };
    const action = {
      type: GET_USER_DATA_SUCCESS,
      name: "user",
      email: "user@123.com",
      password: "123456",
    };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      getUserDataRequest: false,
      getUserDataSuccess: true,
      getUserDataFailed: false,
      userName: action.name,
      userEmail: action.email,
      userPassword: action.password || "",
      isAuth: true,
    });
  });

  it("Тест SET_USER_DATA_FAILED", () => {
    const state = {
      ...initialProfile,
      setUserDataRequest: true,
    };
    const action = { type: SET_USER_DATA_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      setUserDataRequest: false,
      setUserDataSuccess: false,
      setUserDataFailed: true,
    });
  });

  it("Тест SET_USER_DATA_SUCCESS", () => {
    const state = {
      ...initialProfile,
      setUserDataRequest: true,
    };
    const action = { type: SET_USER_DATA_SUCCESS };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      setUserDataRequest: false,
      setUserDataSuccess: true,
      setUserDataFailed: false,
    });
  });

  it("Тест REFRESH_TOKEN_FAILED", () => {
    const state = {
      ...initialProfile,
      refreshTokenRequest: true,
      isAuth: true,
    };
    const action = { type: REFRESH_TOKEN_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      refreshTokenRequest: false,
      refreshTokenSuccess: false,
      refreshTokenFailed: true,
      isAuth: false,
    });
  });

  it("Тест REFRESH_TOKEN_SUCCESS", () => {
    const state = {
      ...initialProfile,
      refreshTokenRequest: true,
    };
    const action = { type: REFRESH_TOKEN_SUCCESS, accessToken: "1234567" };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      refreshTokenRequest: false,
      refreshTokenSuccess: true,
      refreshTokenFailed: false,
      accessToken: action.accessToken,
      isAuth: true,
    });
  });

  it("Тест LOGOUT_FAILED", () => {
    const state = {
      ...initialProfile,
      logoutRequest: true,
    };
    const action = { type: LOGOUT_FAILED };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      logoutRequest: false,
      logoutSuccess: false,
      logoutFailed: true,
    });
  });

  it("Тест LOGOUT_SUCCESS", () => {
    const state = {
      ...initialProfile,
      logoutRequest: true,
      isAuth: true,
    };
    const action = { type: LOGOUT_SUCCESS };
    expect(profileReducer(state, action)).toEqual({
      ...state,
      logoutRequest: false,
      logoutSuccess: true,
      logoutFailed: false,
      loginSuccess: false,
      userName: "",
      userEmail: "",
      userPassword: "",
      isAuth: false,
    });
  });
});
