export default function getLanguage() {
	var userLang = navigator.language || navigator.userLanguage
	if (userLang === 'zh-CN') {
		return 'zh-CN'
	} else {
		return 'en-US'
	}
}
