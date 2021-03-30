import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import formatMoney from '../../utils/formatMoney'
import ProductImage from './ProductImage'

export default function ProductsDetails(props) {
	const { product } = props

	const makeLink = (product) => {
		return encodeURIComponent(product.product_id + '_' + product.product_name.toLowerCase().trim().replaceAll(' ', '_'))
	}

	return (
		<>
			<Col md={4}>
				<Link to={'/product/' + makeLink(product)}>
					<Card className='card_details_products'>
						<Card.Body className='card_details_product'>
							<ProductImage url={product.images_url} />
							<Card.Text className='mt-2 text_product_details'>{product.product_name}</Card.Text>
							<Card.Text className='text_product_price'>${formatMoney(product.price)}</Card.Text>
						</Card.Body>
					</Card>
				</Link>
			</Col>
		</>
	)
}
