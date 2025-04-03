export default async function requestLogin(email, password) {
  const user = { email, password };
  const response = await fetch("https://antoineratat.online/api_shop/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
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
