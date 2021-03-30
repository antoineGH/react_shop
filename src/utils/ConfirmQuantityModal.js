import { Modal, Button, Col, Row, NavLink, Container, Image } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { LanguageContext } from './../language/LanguageContext'
import ClipLoader from 'react-spinners/ClipLoader'
import formatMoney from './../utils/formatMoney'
import toast from './../utils/toast'
import InStock from '../views/components/InStock'

export default function ConfirmQuantityModal(props) {
	const [quantity, setQuantity] = useState(1)
	const { product, addToCart, isDisabled } = props
	const { dictionary, language } = useContext(LanguageContext)

	function incrementQuantity() {
		if (quantity >= 5) {
			toast(dictionary.maximum_reached)
			return
		}
		setQuantity((currentQuantity) => currentQuantity + 1)
	}

	function decrementQuantity() {
		if (quantity <= 1) return
		setQuantity((currentQuantity) => currentQuantity - 1)
	}

	function handleAddToCart(product_id, quantity, product) {
		addToCart(product_id, quantity, product)
		props.onHide(false)
	}

	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size=''
			animation={false}
			aria-labelledby='contained-modal-title-vcenter'
			className='modal_quantity'
			centered>
			<Container style={{ borderBottom: '1px solid #eae8e4' }}>
				<Row className='justify-content-center'>
					<Col xs={9} style={{ borderRight: '1px solid #eae8e4', padding: '1.2rem 0rem 1rem 0rem' }}>
						<Modal.Title className={language === 'zh-CN' ? 'modal_title_CN ml-md-3' : 'modal_title ml-md-3'}>
							{dictionary.select_quantity.toUpperCase()}
						</Modal.Title>
					</Col>
					<Col xs={2} onClick={props.onHide} style={{ paddingTop: '1.2rem' }} className='text-center'>
						<NavLink className='cross_close'>&#10006;</NavLink>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row className='justify-content-center mt-4'>
					<Col md={11}>
						<Row>
							<Col style={{ margin: '0rem' }}>
								<p className='product_title_quantity'>{product.product_name}</p>
							</Col>
						</Row>
						<Row>
							<Col style={{ margin: '0rem' }}>
								<p className={language === 'zh-CN' ? 'product_stock_single_CN' : 'product_stock_single'}>{InStock(product.stock)}</p>
							</Col>
						</Row>
						<Row>
							<Col xs={6} sm={6} md={6} lg={6} xl={6} style={{ margin: '0.3rem' }}>
								<Image className='product_image_quantity' src={product.images_url} />
							</Col>
							<Col xs={5} sm={5} md={5} lg={5} xl={5} className='my-auto'>
								<Row>
									<Col xs={3} sm={3} md={3} lg={3} xl={2} style={{ paddingRight: '0', paddingLeft: '0' }}>
										<Button variant='secondary' className='button_plus_minus' onClick={decrementQuantity} size='sm' disabled={isDisabled}>
											-
										</Button>
									</Col>
									<Col xs={2} sm={2} md={3} lg={3} xl={2} className='quantity_modal_count my-auto ml-1 mr-2'>
										{quantity}
									</Col>
									<Col xs={3} sm={3} md={3} lg={3} xl={2} style={{ paddingRight: '0', paddingLeft: '0' }}>
										<Button variant='secondary' className='button_plus_minus' onClick={incrementQuantity} size='sm' disabled={isDisabled}>
											+
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row className='my-auto mx-auto'>
							<Col xs={5} sm={5} md={5} lg={5} xl={5} style={{ margin: '0.3rem' }}>
								<p className='product_price_single text-center'>${formatMoney(product.price)}</p>
							</Col>
						</Row>

						<Row className='justify-content-center mx-auto'>
							<Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingLeft: '0', paddingRight: '0' }}>
								<Button
									variant='secondary'
									className={language === 'zh-CN' ? 'button_cart font_CN_normal' : 'button_cart'}
									size='sm'
									disabled={isDisabled}
									onClick={() => handleAddToCart(product.product_id, quantity, product)}>
									{dictionary.place_in_cart}
									{isDisabled && <ClipLoader css='margin-bottom: -0.4%; margin-left: 1.5%' color={'white'} size={15} />}
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</Modal>
	)
}
