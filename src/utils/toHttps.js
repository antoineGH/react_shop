export default function toHttps(url) {
	var arr = url.split('/')
	arr[0] = 'https:'
	return arr.join('/')
}
