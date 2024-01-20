import { authFetch } from "./../utils/authHooks";

export default async function updateUserDetail(
  user_details_id,
  address,
  city,
  state,
  postcode,
  country,
  phone
) {
  const user = { address, city, state, postcode, country, phone };
  const response = await authFetch(
    "https://antoineratat.xyz/api_shop/api/userdetail/" + user_details_id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
    responseJson ? resolve(responseJson) : reject(errorJson);
  });
}
