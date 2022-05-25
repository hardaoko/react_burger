import { baseUrl } from "../utils/constants";

export function checkResponse(response) {
  console.log(response.ok);
  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    return response.json();
  }
}

export const getIngredientsRequest = () => {
  return fetch(`${baseUrl}ingredients`).then((res) => checkResponse(res));
};

export const getOrderRequest = (ingredients) => {
  const requestData = [];
  ingredients.map((item) => {
    return requestData.push(item.element._id);
  });
  return fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: requestData }),
  }).then((res) => checkResponse(res));
};

export const getRegistrationRequest = (
  emailRequest,
  passwordRequest,
  nameRequest
) => {
  return fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailRequest,
      password: passwordRequest,
      name: nameRequest,
    }),
  }).then((res) => checkResponse(res));
};

export const getLoginRequest = (emailRequest, passwordRequest) => {
  return fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailRequest,
      password: passwordRequest,
    }),
  }).then((res) => checkResponse(res));
};

export const getEmailCodeRequest = (emailRequest) => {
  return fetch(`${baseUrl}password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailRequest }),
  }).then((res) => checkResponse(res));
};

export const getPasswordResetRequest = (passwordRequest, tokenRequest) => {
  return fetch(`${baseUrl}password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: passwordRequest,
      token: tokenRequest,
    }),
  }).then((res) => checkResponse(res));
};

//  Пример из теории
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}
