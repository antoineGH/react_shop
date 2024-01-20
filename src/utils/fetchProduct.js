import { authFetch } from "./authHooks";

export default async function fetchProduct(product_id) {
  const response = await authFetch(
    "https://antoineratat.xyz/api_shop/api/product/" + product_id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let responseJson = undefined;
  let errorJson = undefined;

  if (response.ok) {
    responseJson = await response.json();
  } else {
    if (response.status === 400) {
      errorJson = await response.json();
    }
    if (response.status === 401) {
      errorJson = await response.json();
    }
  }
  return new Promise((resolve, reject) => {
    responseJson ? resolve(responseJson) : reject(errorJson.message);
  });
}
