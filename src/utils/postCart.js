import { authFetch } from './authHooks'

export default async function postCart(quantity, product_id) {
	const cartdetail = { quantity, product_id }
	const response = await authFetch('https://flask-shop-application-api.herokuapp.com/api/cart', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(cartdetail),
	})
	let responseJson = undefined
	let errorJson = undefined
	if (response.ok) {
		responseJson = await response.json()
	} else {
		if (response.status === 400) {
			errorJson = await response.json()
		}
		if (response.status === 401) {
			errorJson = await response.json()
		}
	}
	return new Promise((resolve, reject) => {
		responseJson ? resolve(responseJson) : reject(errorJson)
	})
}
