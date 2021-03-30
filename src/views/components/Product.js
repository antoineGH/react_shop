import React, { useState, useEffect, useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import fetchProduct from '../../utils/fetchProduct'
import { useAuth } from '../../utils/authHooks'
import { Container, Row, Col, Button } from 'react-bootstrap'

export default function Product(props) {
	const getID = (url) => {
		const splitURL = url.split('_')
		return splitURL[0]
	}

	const { isDisabled, setCartItem, totalItem } = props
	const { dictionary } = useContext(LanguageContext)
	let id = getID(useParams().id)

	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [product, setProduct] = useState('false')
	const [logged] = useAuth()

	useEffect(() => {
		let mounted = true
		console.log()
		fetchProduct(id)
			.then((response) => {
				if (mounted) {
					setProduct(response)
					setIsLoaded(true)
				}
			})
			.catch((error) => {
				console.log(error)
				setHasError(true)
			})
		return () => {
			mounted = false
		}
	}, [id])

	const handleTryAgain = () => {
		setIsLoaded(false)
		setHasError(false)
		let mounted = true
		fetchProduct(id)
			.then((response) => {
				if (mounted) {
					setProduct(response)
					setIsLoaded(true)
				}
			})
			.catch((error) => {
				console.log(error)
				setHasError(true)
			})
		return () => {
			mounted = false
		}
	}

	if (hasError) {
		return (
			<Container fluid>
				<Row className='justify-content-center row_header_filter'>
					<Col md={12}>
						<Row>
							<Col>
								<p className='font_normal_size text-center'>{dictionary.error_loading_products}</p>
							</Col>
						</Row>
						<Row>
							<Col className='text-center' style={{ marginTop: '0rem' }}>
								<Button onClick={handleTryAgain} className='font_normal_size button_address' variant='secondary'>
									{dictionary.try_again}
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		)
	}
	if (!isLoaded) {
		return (
			<Container fluid>
				<Row className='justify-content-center row_header_filter'>
					<Col md={12}></Col>
				</Row>
			</Container>
		)
	}
	return (
		<>
			<ProductDetails
				product={product}
				addToCart={props.addToCart ? props.addToCart : null}
				logged={logged}
				isDisabled={isDisabled}
				setCartItem={setCartItem}
				totalItem={totalItem}
			/>
		</>
	)
}
