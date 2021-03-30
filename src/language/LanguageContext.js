import { createContext } from 'react'
import { dictionaryList } from './languages'

export const LanguageContext = createContext({
	userLanguage: 'en-US',
	dictionnary: dictionaryList['en-US'],
})
