import React, { useContext } from 'react'
import { LanguageContext } from './../language/LanguageContext'
import { Modal, Col, Row, NavLink, Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function FilterMenuModal(props) {
	const { categories, filterItem, SortItem } = props
	const { dictionary, language } = useContext(LanguageContext)

	const handleFilter = (filter) => {
		filterItem(filter)
	}

	return (
		<>
			<Modal show={props.show} onHide={props.onHide} size='lg' className='modal' animation={false} centered>
				<Container style={{ borderBottom: '1px solid #eae8e4' }}>
					<Row className='justify-content-center'>
						<Col xs={9} style={{ borderRight: '1px solid #eae8e4', padding: '1.2rem 0rem 1rem 0rem' }}>
							<Modal.Title className={language === 'zh-CN' ? 'modal_title_CN ml-md-3' : 'modal_title ml-md-3'}>
								{dictionary.filter_products.toUpperCase()}
							</Modal.Title>
						</Col>
						<Col xs={2} onClick={props.onHide} style={{ paddingTop: '1.2rem' }} className='text-center'>
							<NavLink className='cross_close'>&#10006;</NavLink>
						</Col>
					</Row>
				</Container>

				<Container>
					<Row className='justify-content-center mt-5'>
						<Col md={11}>
							<p
								className={language === 'zh-CN' ? 'modal_subtitle text-center text-md-left' : 'modal_subtitle_CN text-center text-md-left'}
								style={{ fontSize: '1rem', fontWeight: 550 }}>
								{dictionary.by_product_category}
							</p>
						</Col>
					</Row>
					<Row className='justify-content-center'>
						<Col md={11}>
							<Row className='mt-2'>
								{categories &&
									categories.map((category) => {
										return (
											<Col xs={6} sm={6} md={4} lg={4} xl={3} key={category} className='mb-4'>
												<Button
													onClick={() => handleFilter(category)}
													style={{ width: '100%' }}
													className='button_address font_normal_size'
													variant='secondary'>
													{category}
												</Button>
											</Col>
										)
									})}
							</Row>
						</Col>
					</Row>
					<Row className='justify-content-center mt-5'>
						<Col md={11}>
							<p
								className={
									language === 'zh-CN' ? 'modal_subtitle text-left text-md-left mb-4' : 'modal_subtitle_CN text-center text-md-left mb-4'
								}
								style={{ fontSize: '1rem', fontWeight: 550 }}>
								{dictionary.by_price}
							</p>
						</Col>
					</Row>
					<Row className='justify-content-center'>
						<Col md={11}>
							<Row>
								<Col xs={6} sm={6} md={6} lg={6} xl={6} className='mb-4'>
									<Button
										onClick={() => SortItem('Low to High')}
										style={{ width: '100%' }}
										className='button_address font_normal_size my-auto'
										variant='secondary'>
										{dictionary.low_to_high}
										<FontAwesomeIcon className='ml-1' color='white' size='1x' icon={['fas', 'caret-up']} />
									</Button>
								</Col>
								<Col xs={6} sm={6} md={6} lg={6} xl={6} className='mb-4'>
									<Button
										onClick={() => SortItem('High to Low')}
										style={{ width: '100%' }}
										className={
											language === 'zh-CN'
												? 'mb-4 my-auto button_address button_modal font_CN_normal'
												: 'mb-4 my-auto button_address button_modal font_normal_size'
										}
										variant='secondary'>
										{dictionary.high_to_low}
										<FontAwesomeIcon className='ml-1' color='white' size='1x' icon={['fas', 'caret-down']} />
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</Modal>
		</>
	)
}
