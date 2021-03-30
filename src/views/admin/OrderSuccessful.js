import React, { useEffect, useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import getPayload from '../../utils/getPayload'
import formatMoney from '../../utils/formatMoney'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
library.add(fas)

export default function OrderSuccessful(props) {
	const history = useHistory()
	const { total, cart, delivery } = props
	const { dictionary, language } = useContext(LanguageContext)

	useEffect(() => {
		if (props.total.length !== 0) {
			console.log('OK')
		} else {
			history.push('/')
		}
	}, [props.total.length, history])

	const delivery_company = props.location.state.responseJson.delivery_company
	const delivery_contact = props.location.state.responseJson.delivery_contact
	const delivery_status = props.location.state.responseJson.delivery_status
	const order_number = props.location.state.responseJson.order_number
	const payment_date = props.location.state.responseJson.payment_date

	const payload = getPayload()

	const getStatus = (status) => {
		if (status === 'pending') {
			return (
				<span>
					<span className='dot_limited'></span> {dictionary.pending}
				</span>
			)
		} else if (status === 'transit') {
			return (
				<span>
					<span className='dot_limited'></span> {dictionary.transit}
				</span>
			)
		}
		return (
			<span>
				<span className='dot_stock'></span> {dictionary.date}
			</span>
		)
	}

	const getDate = (dateString) => {
		const today = moment(dateString)
		return today.format('YYYY-MM-DD')
	}

	function titleCase(str) {
		str = str.toLowerCase().split(' ')
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
		}
		return str.join(' ')
	}

	return (
		<>
			<Container fluid>
				<Row>
					<Col xs={{ span: 12, order: 1 }} lg={{ span: 8, order: 1 }} style={{ backgroundColor: '#f6f5f3' }}>
						<Container className='order_vh'>
							<Row>
								<Col md={12}>
									<Row className='header_cart ml-md-2' style={{ paddingBottom: '2rem' }}>
										<Col xs={12} sm={12} md={5} lg={4} xl={3}>
											<Button
												onClick={() => history.push('/admin/collection')}
												className={language === 'zh-CN' ? 'button_cancel_cart_CN' : 'button_cancel_cart'}>
												<FontAwesomeIcon size='1x' icon={['fas', 'chevron-left']} />
												{'  '}
												{dictionary.back_to_the_shop}
											</Button>
										</Col>
										<Col xs={12} sm={12} md={7} lg={8} xl={9}></Col>
									</Row>
									<Row>
										<Col>
											<p
												className={
													language === 'zh-CN'
														? 'modal_title_CN mt-3 mt-md-0 text-center text-lg-left'
														: 'modal_title mt-3 mt-md-0 text-center text-lg-left'
												}
												style={{ marginBottom: '0rem' }}>
												{dictionary.order_successful.toUpperCase()}
											</p>
											<p
												className={
													language === 'zh-CN'
														? 'text-center text-lg-left font_normal_size_CN'
														: 'text-center text-lg-left font_normal_size'
												}
												style={{ marginBottom: '0rem' }}>
												{dictionary.order_information_description}
											</p>
										</Col>
									</Row>
									<Row>
										<Col>
											<p
												className={
													language === 'zh-CN'
														? 'font_normal_size_medium_CN text-center text-lg-left'
														: 'font_normal_size_medium text-center text-lg-left'
												}>
												{dictionary.order_information}
											</p>
											<Card className='mx-auto mb-3 card_cart_product text-left'>
												<Row>
													<Col xs={12} sm={12} md={8} lg={8} xl={8}>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{dictionary.date}: {getDate(payment_date)}
																</Card.Text>
															</Col>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{dictionary.order_number}: {order_number}{' '}
																</Card.Text>
															</Col>
														</Row>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																{' '}
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{dictionary.transporter}: {delivery_company}{' '}
																</Card.Text>
															</Col>
															<Col style={{ margin: '0.3rem' }}>
																{' '}
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{dictionary.status}: {getStatus(delivery_status)}{' '}
																</Card.Text>
															</Col>
														</Row>
													</Col>
													<Col xs={12} sm={12} md={4} lg={4} xl={4}>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{dictionary.total}: ${formatMoney(total)}{' '}
																</Card.Text>
															</Col>
														</Row>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{dictionary.contact}: {delivery_contact}
																</Card.Text>
															</Col>
														</Row>
													</Col>
												</Row>
											</Card>
											<p
												className={
													language === 'zh-CN'
														? 'font_normal_size_medium_CN text-center text-lg-left'
														: 'font_normal_size_medium text-center text-lg-left'
												}>
												{dictionary.delivery_information}
											</p>
											<Card className='mx-auto mb-3 card_cart_product text-left'>
												<Row>
													<Col xs={12} sm={12} md={8} lg={8} xl={8}>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{delivery.first_name && titleCase(delivery.first_name)}{' '}
																	{delivery.last_name && titleCase(delivery.last_name)}
																</Card.Text>
															</Col>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{delivery.phone}
																</Card.Text>
															</Col>
														</Row>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																{' '}
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{delivery.address && titleCase(delivery.address)}
																</Card.Text>
															</Col>
															<Col style={{ margin: '0.3rem' }}>
																{' '}
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{delivery.city && titleCase(delivery.city) + ' ' + delivery.postcode}
																</Card.Text>
															</Col>
														</Row>
													</Col>
													<Col xs={12} sm={12} md={4} lg={4} xl={4}>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{payload.email}
																</Card.Text>
															</Col>
														</Row>
														<Row>
															<Col style={{ margin: '0.3rem' }}>
																<Card.Text
																	className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
																	style={{ marginBottom: '0rem' }}>
																	{delivery.state && titleCase(delivery.state)},{' '}
																	{delivery.country && titleCase(delivery.country)}
																</Card.Text>
															</Col>
														</Row>
													</Col>
												</Row>
											</Card>
											<p
												className={
													language === 'zh-CN'
														? 'font_normal_size_medium_CN text-center text-lg-left'
														: 'font_normal_size_medium text-center text-lg-left'
												}>
												{dictionary.product_information}
											</p>
											<Row>
												{cart.map((cartdetail) => {
													return (
														<Col key={cartdetail.cart_id} md={12} lg={6} className='mb-2'>
															<Card className='mx-auto mb-3 card_cart_product'>
																<Row className='no-gutters'>
																	<Col md={12} className='text-left'>
																		<Row>
																			<Col style={{ marginBottom: '0' }}>
																				<Card.Text
																					className={
																						language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'
																					}
																					style={{ marginBottom: '0rem' }}>
																					{cartdetail.product_name}
																				</Card.Text>
																			</Col>
																		</Row>

																		<Row>
																			<Col style={{ margin: '1rem 1rem 0rem 1rem' }}>
																				<Card.Text
																					className={
																						language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'
																					}>
																					<span
																						className={
																							language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'
																						}
																						style={{ fontWeight: '500' }}>
																						{dictionary.unit_price}:
																					</span>{' '}
																					${formatMoney(cartdetail.unit_price)}
																				</Card.Text>
																			</Col>
																		</Row>
																		<Row>
																			<Col style={{ margin: '0 1rem' }}>
																				<Card.Text
																					className={
																						language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'
																					}>
																					<span
																						className={
																							language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'
																						}
																						style={{ fontWeight: '500' }}>
																						{dictionary.quantity}:
																					</span>{' '}
																					{cartdetail.quantity}
																				</Card.Text>
																			</Col>
																		</Row>
																		<Row>
																			<Col style={{ margin: '0rem 1rem 1rem 1rem' }}>
																				<Card.Text
																					className={
																						language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'
																					}>
																					<span
																						className={
																							language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'
																						}
																						style={{ fontWeight: '500' }}>
																						{dictionary.total_product}::
																					</span>{' '}
																					${formatMoney(cartdetail.total_product)}
																				</Card.Text>
																			</Col>
																		</Row>
																	</Col>
																</Row>
															</Card>
														</Col>
													)
												})}
											</Row>
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</Col>
					<Col xs={{ span: 12, order: 2 }} lg={{ span: 4, order: 2 }}>
						<Container>
							<Row>
								<Col
									md={8}
									lg={12}
									xl={12}
									style={{ paddingTop: '2.4rem' }}
									className='mb-4 mb-lg-3 text-center justify-content-center mx-auto'>
									<Row>
										<Col md={12} className='mb-md-4 mx-auto '>
											<p
												className={language === 'zh-CN' ? 'font_normal_size_CN text-center' : 'font_normal_size text-center'}
												style={{ marginBottom: '0rem', paddingTop: '1.4rem' }}>
												<FontAwesomeIcon className='mr-1' size='1x' icon={['fas', 'mobile-alt']} />
												{'    '}
												{dictionary.call_us}
											</p>
										</Col>
									</Row>

									<Row style={{ borderBottom: '#eae8e4 1px solid' }}>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}></Col>
										<Col xs={10} sm={10} md={10} lg={10} className='my-auto' style={{ marginBottom: '1rem' }}>
											<p
												className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
												style={{ fontSize: '1.1rem', marginBottom: '0rem', padding: '1rem' }}>
												{dictionary.packaging}
											</p>
										</Col>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}>
											<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
										</Col>
									</Row>
									<Row style={{ borderBottom: '#eae8e4 1px solid' }}>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}></Col>
										<Col xs={10} sm={10} md={10} lg={10} className='my-auto' style={{ marginBottom: '1rem' }}>
											<p
												className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
												style={{ fontSize: '1.1rem', marginBottom: '0rem', padding: '1rem' }}>
												{dictionary.shipping_delivery}
											</p>
										</Col>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}>
											<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
										</Col>
									</Row>
									<Row style={{ borderBottom: '#eae8e4 1px solid' }}>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}></Col>
										<Col xs={10} sm={10} md={10} lg={10} className='my-auto' style={{ marginBottom: '1rem' }}>
											<p
												className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
												style={{ fontSize: '1.1rem', marginBottom: '0rem', padding: '1rem' }}>
												{dictionary.collect_in_store}
											</p>
										</Col>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}>
											<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
										</Col>
									</Row>

									<Row style={{ borderBottom: '#eae8e4 1px solid' }}>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}></Col>
										<Col xs={10} sm={10} md={10} lg={10} className='my-auto' style={{ marginBottom: '1rem' }}>
											<p
												className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
												style={{ fontSize: '1.1rem', marginBottom: '0rem', padding: '1rem' }}>
												{dictionary.returns_exchanges}
											</p>
										</Col>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}>
											<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
										</Col>
									</Row>
									<Row style={{ borderBottom: '#eae8e4 1px solid' }}>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}></Col>
										<Col xs={10} sm={10} md={10} lg={10} className='my-auto' style={{ marginBottom: '1rem' }}>
											<p
												className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'}
												style={{ fontSize: '1.1rem', marginBottom: '0rem', padding: '1rem' }}>
												{dictionary.payment}
											</p>
										</Col>
										<Col xs={1} sm={1} md={1} lg={1} className='my-auto' style={{ marginBottom: '1rem' }}>
											<FontAwesomeIcon size='1x' icon={['fas', 'chevron-right']} />
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
