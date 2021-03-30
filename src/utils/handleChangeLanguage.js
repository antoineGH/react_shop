export default function handleChangeLanguage(language) {
	if (language === 'zh-CN') {
		localStorage.setItem('language', language)
		return 'zh-CN'
	} else {
		localStorage.setItem('language', 'en-US')
		return 'en-US'
	}
}
