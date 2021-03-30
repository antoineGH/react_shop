import React, { useState, useContext, useEffect } from 'react'
import ProductsDetails from './ProductsDetails'
import { LanguageContext } from '../../language/LanguageContext'
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap'
import FilterMenuModal from '../../utils/FilterMenuModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function ProductsList(props) {
	const { products, category } = props
	// eslint-disable-next-line
	const { dictionary, language } = useContext(LanguageContext)
	const [productsFilter, setProductFilter] = useState(products)
	const [modalShow, setModalShow] = useState(false)
	const [categories, setCategories] = useState(false)
	const [activeFilter, setActiveFilter] = useState('')
	const [activeSort, setActiveSort] = useState('')

	useEffect(() => {
		setCategories(getCategories())
	}, []) // eslint-disable-line

	const filterItem = (filter) => {
		const productsFilter = products.filter((product) => {
			return product.category_name === filter
		})
		setProductFilter(productsFilter)
		if (activeSort) {
			sortItem(activeSort)
		}
		setActiveFilter(filter)

		setModalShow(false)
	}

	const sortItem = (order) => {
		if (order === 'High to Low') {
			productsFilter.sort((a, b) => {
				return b.price - a.price
			})
		} else {
			productsFilter.sort((a, b) => {
				return a.price - b.price
			})
		}
		setActiveSort(order)
		setModalShow(false)
	}

	const getCategories = () => {
		const categories = []
		products.forEach((product) => {
			categories.push(product.category_name)
		})
		return Array.from(new Set(categories))
	}

	const removeFilters = () => {
		setProductFilter(products)
		setActiveFilter('')
	}

	const removeSort = () => {
		if (activeFilter) {
			const productsFilter = products.filter((product) => {
				return product.category_name === activeFilter
			})
			setProductFilter(productsFilter)
		} else {
			setProductFilter(products)
		}
		setActiveSort('')
	}

	return (
		<>
			<Container fluid>
				<Row className='justify-content-center row_header_filter'>
					<Col md={11}>
						<Row style={{ marginRight: 0, marginLeft: 0 }}>
							<Col className='col_header_collection text-center text-md-left my-auto ml-md-4 border_right' style={{ borderBottom: '0' }}>
								<Row>
									<Col xl={8} lg={8} md={7}>
										<p className={language === 'zh-CN' ? 'navbar_menu_subitems_CN' : ''} style={{ marginBottom: '0' }}>
											{dictionary.collection} {category}
											{'  '}
											<span className={language === 'zh-CN' ? ' font_CN_normal' : 'product_details_count'}>
												({productsFilter.length} {dictionary.products})
											</span>
										</p>
									</Col>
									<Col
										xs={8}
										sm={5}
										md={5}
										lg={4}
										xl={4}
										className='text-center my-auto mx-auto justify-content-center'
										style={{ padding: '0rem', textAlign: 'center' }}>
										{activeFilter && (
											<Button
												size='sm'
												style={{ width: 'auto', height: '2rem' }}
												className='button_cart'
												variant='secondary'
												onClick={removeFilters}>
												<span style={{ color: 'white' }} className='product_details_count'>
													{activeFilter}
												</span>
												{'  '}
												<FontAwesomeIcon className='ml-2' size='xs' icon={['fas', 'times']} />
											</Button>
										)}
										{activeSort && (
											<Button
												size='sm'
												style={{ width: 'auto', height: '2rem' }}
												className='button_cart ml-4'
												variant='secondary'
												onClick={removeSort}>
												<span style={{ color: 'white' }} className='product_details_count'>
													{activeSort}
												</span>
												{'  '}
												<FontAwesomeIcon className='ml-2' size='xs' icon={['fas', 'times']} />
											</Button>
										)}
									</Col>
								</Row>
							</Col>
							<Col xs={12} sm={12} md={3} lg={2} xl={2} className='my-auto'>
								<NavLink
									onClick={() => setModalShow(true)}
									className={language === 'zh-CN' ? 'text-center filter_menu_CN font_CN_normal my-auto ' : 'text-center filter_menu my-auto'}>
									{dictionary.filter} <FontAwesomeIcon size='xs' icon={['fas', 'sliders-h']} rotation={90} />
								</NavLink>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className='text-center justify-content-center '>
					<Col md={11}>
						<Row>
							{productsFilter.map((product) => {
								return <ProductsDetails key={product.product_name} product={product} />
							})}
						</Row>
						<br />
					</Col>
				</Row>
			</Container>
			<FilterMenuModal
				className='confirm_quantity_modal'
				show={modalShow}
				onHide={() => setModalShow(false)}
				categories={categories}
				filterItem={filterItem}
				SortItem={sortItem}
			/>
		</>
	)
}
