import { baseUrl } from "../utils/constants";
import { IChosenIngredient } from "../utils/types";

export function checkResponse(response: Response) {

  if (!response.ok) {
    throw Error(response.statusText + " - " + response.status);
  } else {
    return response.json();
  }
}

export const getIngredientsRequest = async () => {
  const res = await fetch(`${baseUrl}ingredients`);
  return checkResponse(res);
};

export const orderRequest = async (token: string, ingredients: IChosenIngredient[]) => {
  const requestData: string[] = [];
  ingredients.map((item) => {
    return requestData.push(item.element._id);
  });
  const res = await fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify({ ingredients: requestData }),
  });
  return checkResponse(res);
};

export const registrationRequest = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
  return checkResponse(res);
};

export const loginRequest = async (email: string, password: string) => {
  const res = await fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return checkResponse(res);
};

export const emailCodeRequest = async (email: string) => {
  const res = await fetch(`${baseUrl}password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ email: email }),
  });
  return checkResponse(res);
};

export const passwordResetRequest = async (password: string, token: string) => {
  const res = await fetch(`${baseUrl}password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
  return checkResponse(res);
};

export const getUserDataRequest = async (token: string) => {
  const res = await fetch(`${baseUrl}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  });
  return checkResponse(res);
};

export const setUserDataRequest = async (token: string, name: string, email: string, password: string) => {
  const res = await fetch(`${baseUrl}auth/user`, {
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
  });
  return checkResponse(res);
};

export const refreshTokenRequest = async (refreshToken: string | null) => {
  const res = await fetch(`${baseUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
  return checkResponse(res);
};

export const logoutRequest = async (refreshToken: string | null) => {
  const res = await fetch(`${baseUrl}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
  return checkResponse(res);
};
