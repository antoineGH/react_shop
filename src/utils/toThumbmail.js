export default function toThumbmail(url) {
	var arr = url.split('/')
	arr[6] = 'c_fill,h_180,w_180'
	return arr.join('/')
}
