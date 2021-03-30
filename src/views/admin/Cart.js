import React, { useState, useEffect, useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import fetchCart from '../../utils/fetchCart'
import deleteCart from '../../utils/deleteCart'
import updateCart from '../../utils/updateCart'
import toast from '../../utils/toast'
import CartList from './CartList'
import BarLoader from 'react-spinners/BarLoader'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function Cart(props) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [isEmpty, setIsEmpty] = useState(false)
	const [cart, setCart] = useState('')
	const [total, setTotal] = useState('')
	const { updateCartTotal, setCartItem, totalItem } = props
	const { dictionary, language } = useContext(LanguageContext)
	const history = useHistory()

	useEffect(() => {
		let mounted = true
		fetchCart()
			.then((response) => {
				if (mounted) {
					if (response.length > 1) {
						const last_elem = response.pop()
						const total = last_elem.total_cart
						setTotal(total)
						setCart(response)
						setCartItem(countCartItems(response))
					} else {
						setIsEmpty(true)
						setCartItem(0)
					}
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
	}, []) // eslint-disable-line

	function countCartItems(myCart) {
		let totalItem = 0
		myCart.forEach((item) => {
			totalItem += item.quantity
		})
		return totalItem
	}

	function handleDelete(cart_id) {
		deleteCart(cart_id)
			.then((response) => {
				toast(dictionary.product_removed)
				let totalCopy = JSON.parse(JSON.stringify(total))
				const toDelete = cart.filter((CartCopyDelete) => CartCopyDelete.cart_id === cart_id)
				totalCopy = totalCopy - toDelete[0].quantity * toDelete[0].unit_price
				setTotal(totalCopy)
				setCartItem(totalItem - toDelete[0].quantity)

				let cartCopy = JSON.parse(JSON.stringify(cart))
				cartCopy = cartCopy.filter((cartCopyDetails) => cartCopyDetails.cart_id !== cart_id)
				if (cartCopy.length === 0) {
					setIsEmpty(true)
					setTotal(0)
					setCartItem(0)
				}
				setCart(cartCopy)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	function decrementCount(cart_id) {
		let cartCopy = JSON.parse(JSON.stringify(cart))
		cartCopy.forEach((cartCopyDetail) => {
			if (cartCopyDetail.cart_id === cart_id) {
				const quantity = cartCopyDetail.quantity - 1

				let totalCopy = JSON.parse(JSON.stringify(total))
				totalCopy = totalCopy - cartCopyDetail.unit_price
				setTotal(totalCopy)

				if (quantity <= 0) {
					handleDelete(cart_id)
					return
				}

				updateCart(cart_id, quantity)
					.then((response) => {
						toast(dictionary.cart_updated)
					})
					.catch((error) => {
						console.log(error)
						toast(dictionary.error_not_cart_updated)
					})

				cartCopyDetail.quantity = quantity
				cartCopyDetail.total_product = quantity * cartCopyDetail.unit_price
				setCart(cartCopy)
				setCartItem(totalItem - 1)
			}
		})
	}

	function incrementCount(cart_id) {
		let cartCopy = JSON.parse(JSON.stringify(cart))
		cartCopy.forEach((cartCopyDetail) => {
			if (cartCopyDetail.cart_id === cart_id) {
				if (cartCopyDetail.quantity >= 5) {
					toast(dictionary.maximum_reached)
				} else {
					const quantity = cartCopyDetail.quantity + 1
					let totalCopy = JSON.parse(JSON.stringify(total))
					totalCopy = totalCopy + cartCopyDetail.unit_price
					setTotal(totalCopy)

					updateCart(cart_id, quantity)
						.then((response) => {
							toast(dictionary.cart_updated)
						})
						.catch((error) => {
							toast(dictionary.error_not_cart_updated)
						})

					cartCopyDetail.quantity = quantity
					cartCopyDetail.total_product = quantity * cartCopyDetail.unit_price
					setCart(cartCopy)
					setCartItem(totalItem + 1)
				}
			}
		})
	}

	function handleTryAgain() {
		setHasError(false)
		setIsLoaded(false)
		setIsEmpty(false)
		let mounted = true
		fetchCart()
			.then((response) => {
				if (mounted) {
					if (response.length > 1) {
						const last_elem = response.pop()
						const total = last_elem.total_cart
						setTotal(total)
						setCart(response)
					} else {
						setIsEmpty(true)
					}
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
			<>
				<Container fluid>
					<Row>
						<Col xs={12} sm={12} md={8} lg={8} xl={8} style={{ backgroundColor: '#f6f5f3' }}>
							<Container style={{ minHeight: '90vh' }}>
								<Row>
									<Col md={12}>
										<Row className='header_cart ml-md-2'>
											<Col xs={12} sm={12} md={5} lg={4} xl={3}>
												<Button
													onClick={() => history.push('/admin/collection')}
													className={language === 'zh-CN' ? 'button_cancel_cart_CN' : 'button_cancel_cart'}>
													<FontAwesomeIcon size='1x' icon={['fas', 'chevron-left']} />
													{'  '}
													{dictionary.back_to_shopping}
												</Button>
											</Col>
											<Col xs={12} sm={12} md={7} lg={8} xl={9}></Col>
										</Row>
										<Row>
											<Col>
												<p className={language === 'zh-CN' ? 'modal_title_CN' : 'modal_title'} style={{ marginBottom: '0rem' }}>
													{dictionary.my_shopping_bag.toUpperCase()}
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p className='font_normal_size text-center text-md-left'>{dictionary.error_loading_bag}</p>
											</Col>
										</Row>
										<Row>
											<Col className='text-center text-md-left' style={{ marginTop: '0rem' }}>
												<Button onClick={handleTryAgain} className='font_normal_size button_address' variant='secondary'>
													{dictionary.try_again}
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</Container>
						</Col>
						<Col xs={12} sm={12} md={4} lg={4} xl={4}>
							<Container>
								<Row>
									<Col md={11}>
										<Row className='header_cart_right ml-md-2 justify-content-center'>
											<Col md={6} style={{ paddingTop: '2.4rem' }}>
												<Button
													disabled
													className={language === 'zh-CN' ? 'button_cart font_normal_size_CN' : 'button_cart font_normal_size'}
													style={{ height: '3.3rem' }}>
													{dictionary.proceed}
													{'  '}
													<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
												</Button>
											</Col>
										</Row>
										<Row className='ml-md-2 justify-content-center'>
											<Col md={6} className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}>
												<FontAwesomeIcon size='1x' icon={['fas', 'lock']} />
												{'  '}
												{dictionary.secure_payment}
											</Col>
										</Row>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
				</Container>
			</>
		)
	}
	if (!isLoaded) {
		return (
			<Container fluid>
				<Row>
					<Col xs={12} sm={12} md={8} lg={8} xl={8} style={{ backgroundColor: '#f6f5f3' }}>
						<Container style={{ minHeight: '90vh' }}>
							<Row>
								<Col md={12}>
									<Row className='header_cart ml-md-2'>
										<Col xs={12} sm={12} md={5} lg={4} xl={3}>
											<Button
												onClick={() => history.push('/admin/collection')}
												className={language === 'zh-CN' ? 'button_cancel_cart_CN' : 'button_cancel_cart'}>
												<FontAwesomeIcon size='1x' icon={['fas', 'chevron-left']} />
												{'  '}
												{dictionary.back_to_shopping}
											</Button>
										</Col>
										<Col xs={12} sm={12} md={7} lg={8} xl={9}></Col>
									</Row>
									<Row>
										<Col>
											<p className={language === 'zh-CN' ? 'modal_title_CN' : 'modal_title'} style={{ marginBottom: '0rem' }}>
												{'My Shopping Bag'.toUpperCase()}
											</p>
										</Col>
									</Row>
									<Row className='justify-content-center text-center text-lg-left mx-auto'>
										<Col xs={4} lg={4}></Col>
										<Col xs={4} className='mx-auto' lg={4}>
											<BarLoader css={{ margin: 'auto' }} height={3} />
										</Col>
										<Col xs={4} lg={4}></Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</Col>
					<Col xs={12} sm={12} md={4} lg={4} xl={4}>
						<Container>
							<Row>
								<Col md={11}>
									<Row className='header_cart_right ml-md-2 justify-content-center'>
										<Col md={6} style={{ paddingTop: '2.4rem' }}>
											<Button
												disabled
												className={language === 'zh-CN' ? 'button_cart font_normal_size_CN' : 'button_cart font_normal_size'}
												style={{ height: '3.3rem' }}>
												{dictionary.proceed}
												{'  '}
												<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
											</Button>
										</Col>
									</Row>
									<Row className='ml-md-2 justify-content-center'>
										<Col md={6} className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}>
											<FontAwesomeIcon size='1x' icon={['fas', 'lock']} />
											{'  '}
											{dictionary.secure_payment}
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		)
	}
	if (isEmpty) {
		return (
			<Container fluid>
				<Row>
					<Col xs={12} sm={12} md={8} lg={8} xl={8} style={{ backgroundColor: '#f6f5f3' }}>
						<Container style={{ minHeight: '90vh' }}>
							<Row>
								<Col md={12}>
									<Row className='header_cart ml-md-2'>
										<Col xs={12} sm={12} md={5} lg={4} xl={3}>
											<Button
												onClick={() => history.push('/admin/collection')}
												className={language === 'zh-CN' ? 'button_cancel_cart_CN' : 'button_cancel_cart'}>
												<FontAwesomeIcon size='1x' icon={['fas', 'chevron-left']} />
												{'  '}
												{dictionary.back_to_shopping}
											</Button>
										</Col>
										<Col xs={12} sm={12} md={7} lg={8} xl={9}></Col>
									</Row>
									<Row>
										<Col>
											<p className={language === 'zh-CN' ? 'modal_title_CN' : 'modal_title'} style={{ marginBottom: '0rem' }}>
												{'My Shopping Bag'.toUpperCase()} <span className='product_details_count'>(Empty)</span>
											</p>
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</Col>
					<Col xs={12} sm={12} md={4} lg={4} xl={4}>
						<Container>
							<Row>
								<Col md={11}>
									<Row className='header_cart_right ml-md-2 justify-content-center'>
										<Col md={6} style={{ paddingTop: '2.4rem' }}>
											<Button
												disabled
												variant='secondary'
												className={language === 'zh-CN' ? 'button_cart font_normal_size_CN' : 'button_cart font_normal_size'}
												style={{ height: '3.3rem' }}>
												{dictionary.proceed}
												{'  '}
												<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
											</Button>
										</Col>
									</Row>
									<Row className='ml-md-2 justify-content-center'>
										<Col md={6} className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}>
											<FontAwesomeIcon size='1x' icon={['fas', 'lock']} />
											{'  '}
											{dictionary.secure_payment}
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		)
	} else if (!isEmpty) {
		return (
			<>
				<CartList
					cart={cart}
					total={total}
					handleDelete={handleDelete}
					decrementCount={decrementCount}
					incrementCount={incrementCount}
					updateCartTotal={updateCartTotal}
				/>

				<br />
			</>
		)
	}
}
