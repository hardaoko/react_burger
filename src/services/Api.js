import { baseUrl } from "../utils/constants";

export function checkResponse(response) {
  if (!response.ok) {
    Promise.reject(new Error());
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
