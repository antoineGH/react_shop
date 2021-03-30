import React, { useState, useEffect, useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import fetchProducts from '../../utils/fetchProducts'
import ProductsList from './ProductsList'
import { useAuth } from '../../utils/authHooks'
import { Container, Row, Col, Button, NavLink } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function Products(props) {
	const { addToCart } = props
	const { dictionary, language } = useContext(LanguageContext)

	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [products, setProducts] = useState(false)
	const [logged] = useAuth()

	useEffect(() => {
		let mounted = true
		fetchProducts()
			.then((response) => {
				if (mounted) {
					setProducts(response)
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
	}, [])

	const handleTryAgain = () => {
		setIsLoaded(false)
		setHasError(false)
		let mounted = true
		fetchProducts()
			.then((response) => {
				if (mounted) {
					setProducts(response)
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
					<Col md={11}>
						<Row>
							<Col className='col_header_collection text-center text-md-left my-auto ml-md-4 border_right' style={{ borderBottom: '0' }}>
								<Row>
									<Col xl={8} lg={8} md={7} className={language === 'zh-CN' ? 'navbar_menu_subitems_CN' : ''}>
										{dictionary.collection}
									</Col>
									<Col
										xs={8}
										sm={5}
										md={5}
										lg={4}
										xl={4}
										className='text-center my-auto mx-auto justify-content-center'
										style={{ padding: '0rem', textAlign: 'center' }}></Col>
								</Row>
							</Col>
							<Col xs={12} sm={12} md={3} lg={2} xl={2} className='my-auto'>
								<NavLink
									className={language === 'zh-CN' ? 'text-center filter_menu_CN font_CN_normal my-auto ' : 'text-center filter_menu my-auto'}>
									{dictionary.filter} <FontAwesomeIcon size='xs' icon={['fas', 'sliders-h']} rotation={90} />
								</NavLink>
							</Col>
						</Row>
					</Col>
				</Row>
				<Container>
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
				</Container>
			</Container>
		)
	}
	if (!isLoaded) {
		return (
			<Container fluid>
				<Row className='justify-content-center row_header_filter'>
					<Col md={11}>
						<Row>
							<Col className='col_header_collection text-center text-md-left my-auto ml-md-4 border_right' style={{ borderBottom: '0' }}>
								<Row>
									<Col xl={8} lg={8} md={7} className={language === 'zh-CN' ? 'navbar_menu_subitems_CN' : ''}>
										{dictionary.collection}
									</Col>
									<Col
										xs={8}
										sm={5}
										md={5}
										lg={4}
										xl={4}
										className='text-center my-auto mx-auto justify-content-center'
										style={{ padding: '0rem', textAlign: 'center' }}></Col>
								</Row>
							</Col>
							<Col xs={12} sm={12} md={3} lg={2} xl={2} className='my-auto'>
								<NavLink
									className={language === 'zh-CN' ? 'text-center filter_menu_CN font_CN_normal my-auto ' : 'text-center filter_menu my-auto'}>
									{dictionary.filter} <FontAwesomeIcon size='xs' icon={['fas', 'sliders-h']} rotation={90} />
								</NavLink>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		)
	}
	return (
		<>
			<ProductsList products={products} addToCart={addToCart} logged={logged} category={'SINCE 1854'} />
		</>
	)
}
