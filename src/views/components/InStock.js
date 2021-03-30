import React, { useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'

export default function InStock(stock) {
	const { dictionary } = useContext(LanguageContext)

	if (stock <= 0) {
		return (
			<span>
				<span className='dot_nostock'></span> {dictionary.not_in_stock}
			</span>
		)
	} else if (stock <= 10) {
		return (
			<span>
				<span className='dot_limited'></span> {dictionary.limited_stock}
			</span>
		)
	}
	return (
		<span>
			<span className='dot_stock'></span> {dictionary.in_stock}
		</span>
	)
}
