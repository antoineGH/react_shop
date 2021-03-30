import React, { useEffect, useRef } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import product_bg from '../../img/product_bg.jpg'

export default function ProductImage(props) {
	const { url } = props
	const cardImage = useRef()
	const spinner = useRef()

	useEffect(() => {
		let observer = new IntersectionObserver(
			(entries) =>
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						cardImage.current.src = url
						cardImage.current.className = 'product_details_image'
						// setTimeout(() => {
						spinner.current.className = 'hide_spinner'
						// }, 300)
						observer = observer.disconnect()
					}
				}),
			{ rootMargin: '0px 0px 200px 0px' }
		)
		observer.observe(cardImage.current)
	}, [url])

	return (
		<>
			<div className='card img-fluid'>
				<Card.Img ref={cardImage} variant='top' className='product_details_image_loading' src={product_bg} />
				<div className='card-img-overlay' style={{ marginTop: '40%' }}>
					<Spinner ref={spinner} animation='border' variant='secondary' className='show_spinner' />
				</div>
			</div>
		</>
	)
}
