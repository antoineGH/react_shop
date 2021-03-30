import React, { useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import { Card, Row, Col, Button } from 'react-bootstrap'
import formatMoney from '../../utils/formatMoney'
import moment from 'moment'

export default function OrderDetails(props) {
	const { order, MoreInformation } = props
	const { dictionary, language } = useContext(LanguageContext)

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
				<span className='dot_stock'></span> date
			</span>
		)
	}

	const getDate = (dateString) => {
		const today = moment(dateString)
		return today.format('YYYY-MM-DD')
	}

	const handleMoreInformation = () => {
		MoreInformation(order.order_number)
	}

	return (
		<>
			<Card className='mx-auto mb-3 card_cart_product text-left' style={{ padding: '1rem' }}>
				<Row>
					<Col xs={12} sm={12} md={8} lg={8} xl={8}>
						<Row>
							<Col style={{ margin: '0.3rem' }}>
								<Card.Text className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'} style={{ marginBottom: '0rem' }}>
									{dictionary.date}: {getDate(order.payment_date)}
								</Card.Text>
							</Col>
							<Col style={{ margin: '0.3rem' }}>
								<Card.Text className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'} style={{ marginBottom: '0rem' }}>
									{dictionary.order_number}: {order.order_number}{' '}
								</Card.Text>
							</Col>
						</Row>
						<Row>
							<Col style={{ margin: '0.3rem' }}>
								{' '}
								<Card.Text className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'} style={{ marginBottom: '0rem' }}>
									{dictionary.transporter}: {order.delivery_company}{' '}
								</Card.Text>
							</Col>
							<Col style={{ margin: '0.3rem' }}>
								{' '}
								<Card.Text className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'} style={{ marginBottom: '0rem' }}>
									{dictionary.status}: {getStatus(order.delivery_status)}{' '}
								</Card.Text>
							</Col>
						</Row>
					</Col>
					<Col xs={12} sm={12} md={4} lg={4} xl={4}>
						<Row>
							<Col style={{ margin: '0.3rem' }}>
								<Card.Text className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'} style={{ marginBottom: '0rem' }}>
									{dictionary.total}: ${formatMoney(order.total_order)}{' '}
								</Card.Text>
							</Col>
						</Row>
						<Row>
							<Col style={{ margin: '0.3rem' }}>
								<Card.Text className={language === 'zh-CN' ? 'font_normal_size_CN' : 'font_normal_size'} style={{ marginBottom: '0rem' }}>
									<Button
										onClick={handleMoreInformation}
										variant='secondary'
										className='button_cart'
										size='sm'
										style={{ width: 'auto', height: '2rem' }}>
										{dictionary.more_information}
									</Button>{' '}
								</Card.Text>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	)
}
