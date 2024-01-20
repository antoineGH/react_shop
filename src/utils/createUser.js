export default async function createUser(email, first_name, last_name) {
  const user = { email, first_name, last_name };
  const response = await fetch(
    "https://antoineratat.xyz/api_shop/api/register",
    {
      method: "POST",
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
