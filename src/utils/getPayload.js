import jwt_decode from 'jwt-decode'

export default function getPayload() {
	const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY')).access_token
	const payload = jwt_decode(token).user_claims
	return payload
}
