import React, { useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import { Row, Col, Card, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InStock from '../components/InStock'
import formatMoney from '../../utils/formatMoney'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function CartDetail(props) {
	const { cartdetail, handleDelete, decrementCount, incrementCount } = props
	const { dictionary, language } = useContext(LanguageContext) // eslint-disable-line

	const makeLink = (product) => {
		return encodeURIComponent(product.product_id + '_' + product.product_name.toLowerCase().trim().replaceAll(' ', '_'))
	}

	return (
		<>
			<Card className='mx-auto mb-3 card_cart_product'>
				<Row className='no-gutters'>
					<Col md={3} className='my-auto'>
						<Link to={'/product/' + makeLink(cartdetail)}>
							<Image className='card_product_image_quantity' src={cartdetail.images_url} />
						</Link>
					</Col>
					<Col md={5} className='text-left'>
						<Card.Body>
							<Row className='justify-content-center'>
								<Col style={{ marginBottom: '0' }}>
									<Link to={'/product/' + makeLink(cartdetail)} style={{ color: 'black' }}>
										<Card.Text className='card_cart_product_title text-center text-md-left' style={{ marginBottom: '0rem' }}>
											{cartdetail.product_name}
										</Card.Text>
									</Link>
								</Col>
							</Row>
							<Row>
								<Col style={{ marginTop: '0', marginBottom: '0' }}>
									<Card.Text className={language === 'zh-CN' ? 'font_CN_normal text-center text-md-left' : 'text-center text-md-left'}>
										{InStock(cartdetail.stock)}
									</Card.Text>
								</Col>
							</Row>
							<Row>
								<Col>
									<Card.Text className='card_cart_product_price text-center text-md-left'>${formatMoney(cartdetail.unit_price)}</Card.Text>
								</Col>
							</Row>
							<Row className='text-center text-md-left'>
								<Col>
									<Button
										onClick={() => handleDelete(cartdetail.cart_id)}
										variant='secondary'
										className='button_delete_article_cart '
										size='sm'>
										<FontAwesomeIcon color='black' size='1x' icon={['fas', 'trash-alt']} />
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Col>
					<Col md={2} className='my-auto'>
						<Row className='text-center justify-content-center text-md-right mt-2 mb-2 mb-lg-0 mt-lg-0'>
							<Col xs={3} sm={3} md={4} lg={3} xl={2} style={{ paddingRight: '0', paddingLeft: '0' }}>
								<Button
									variant='secondary'
									className='button_plus_minus'
									style={{ padding: '0.5rem' }}
									onClick={() => decrementCount(cartdetail.cart_id)}>
									-
								</Button>
							</Col>
							<Col xs={2} sm={2} md={3} lg={2} xl={2} className='quantity_modal_count my-auto ml-1 mr-2'>
								<Card.Text>{cartdetail.quantity}</Card.Text>
							</Col>
							<Col xs={3} sm={3} md={3} lg={3} xl={2} style={{ paddingRight: '0', paddingLeft: '0' }}>
								<Button
									variant='secondary'
									className='button_plus_minus'
									style={{ padding: '0.5rem' }}
									onClick={() => incrementCount(cartdetail.cart_id)}>
									+
								</Button>
							</Col>
						</Row>
					</Col>
					<Col md={2} className='my-auto'>
						<Card.Text className='mt-3 mt-md-2 mb-3 mb-md-2 mb-lg-0 mt-lg-0 text-center card_cart_product_price'>
							${formatMoney(cartdetail.total_product)}
						</Card.Text>
					</Col>
				</Row>
			</Card>
		</>
	)
}
