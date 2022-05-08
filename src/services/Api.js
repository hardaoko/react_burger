import { baseUrl } from "../utils/constants";

export function checkResponse(response) {
  if (!response.ok) {
    throw new Error("response is not ok");
  }
}

export const getIngredientsRequest = () => {
  return fetch(`${baseUrl}ingredients`);
};
