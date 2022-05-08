import { baseUrl } from "../utils/constants";

export function checkResponse(response) {
  if (!response.ok) {
    Promise.reject(new Error());
  } else {
    return response.json();
  }
}

export const getIngredientsRequest = () => {
  return fetch(`${baseUrl}/ingredients`).then((res) => checkResponse(res));
};
