import React, { useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import { CardElement } from '@stripe/react-stripe-js'
import './CardSectionStyles.css'

const CARD_ELEMENT_OPTIONS = {
	style: {
		base: {
			color: '#32325d',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '1.2rem',
			'::placeholder': {
				color: '#aab7c4',
			},
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	},
}

export default function CardSection() {
	const { dictionary, language } = useContext(LanguageContext)
	return (
		<>
			<p className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'} style={{ marginBottom: '0rem' }}>
				{dictionary.card_details}
			</p>
			<CardElement hidePostalCode={true} options={CARD_ELEMENT_OPTIONS} />
		</>
	)
}
