import { toast, Slide } from 'react-toastify'

export default function notify(content) {
	toast(content, {
		position: 'top-center',
		autoClose: 2500,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		transition: Slide,
	})
}
