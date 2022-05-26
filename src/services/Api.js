import { baseUrl } from "../utils/constants";

export function checkResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText + " - " + response.status);
  } else {
    return response.json();
  }
}

export const getIngredientsRequest = () => {
  return fetch(`${baseUrl}ingredients`).then((res) => checkResponse(res));
};

export const orderRequest = (ingredients) => {
  const requestData = [];
  ingredients.map((item) => {
    return requestData.push(item.element._id);
  });
  return fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ ingredients: requestData }),
  }).then((res) => checkResponse(res));
};

export const registrationRequest = (
  emailRequest,
  passwordRequest,
  nameRequest
) => {
  return fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: emailRequest,
      password: passwordRequest,
      name: nameRequest,
    }),
  }).then((res) => checkResponse(res));
};

export const loginRequest = (emailRequest, passwordRequest) => {
  return fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: emailRequest,
      password: passwordRequest,
    }),
  }).then((res) => checkResponse(res));
};

export const emailCodeRequest = (emailRequest) => {
  return fetch(`${baseUrl}password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ email: emailRequest }),
  }).then((res) => checkResponse(res));
};

export const passwordResetRequest = (passwordRequest, tokenRequest) => {
  return fetch(`${baseUrl}password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      password: passwordRequest,
      token: tokenRequest,
    }),
  }).then((res) => checkResponse(res));
};

export const getUserDataRequest = (token) => {
  return fetch(`${baseUrl}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  }).then((res) => checkResponse(res));
};

export const setUserDataRequest = (token, name, email, password) => {
  return fetch(`${baseUrl}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  }).then((res) => checkResponse(res));
};

export const refreshTokenRequest = (refreshToken) => {
  return fetch(`${baseUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => checkResponse(res));
};

export const logoutRequest = (refreshToken) => {
  return fetch(`${baseUrl}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => checkResponse(res));
};
