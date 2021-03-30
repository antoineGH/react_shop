import { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import getPayload from './utils/getPayload'
import { useAuth } from './utils/authHooks'
import Admin from './layouts/Admin'
import Auth from './layouts/Auth'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import getLanguage from './utils/getLanguage'
import handleChangeLanguage from './utils/handleChangeLanguage'
import { LanguageContext } from './language/LanguageContext'
import { dictionaryList } from './language/languages'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import './App.css'

const stripePromise = loadStripe('pk_test_51I0sNCJMWVhN0k8zv6aFqdXTZogNVcWUXaNn4fLveufGd9NlbOwohY7n17D0Ui7pGWTUOUzbXoZMesAkkM0eG4JI00jkOAUKXU')

function App() {
	const [logged] = useAuth()
	let payload = ''
	if (logged) {
		payload = getPayload()
	}
	const [language, setLanguage] = useState('')
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('language') === null) {
			const language = getLanguage()
			localStorage.setItem('language', language)
			setLanguage(language)
			setIsLoaded(true)
		} else {
			setLanguage(localStorage.getItem('language'))
			setIsLoaded(true)
		}
	}, [])

	function handleUpdateLanguage(language) {
		setLanguage(language)
		handleChangeLanguage(language)
	}

	function LanguageProvider({ children }) {
		const provider = {
			language,
			dictionary: dictionaryList[language],
		}

		return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>
	}

	if (!isLoaded) {
		return null
	} else {
		return (
			<Elements stripe={stripePromise}>
				<LanguageProvider>
					<div className='App'>
						<ToastContainer
							position='top-center'
							autoClose={4000}
							hideProgressBar
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							transition={Slide}
						/>
						<BrowserRouter>
							<Switch>
								{!logged && <Auth handleUpdateLanguage={handleUpdateLanguage} language={language} />}
								{logged && <Admin handleUpdateLanguage={handleUpdateLanguage} language={language} userInfo={payload} />}
								<Redirect from='/' to='/products' />
							</Switch>
						</BrowserRouter>
					</div>
				</LanguageProvider>
			</Elements>
		)
	}
}

export default App
