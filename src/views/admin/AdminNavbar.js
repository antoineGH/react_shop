import React, { useEffect, useContext } from 'react'
import { Navbar, Nav, Button, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { useHistory, NavLink, Link } from 'react-router-dom'
import Flags from 'country-flag-icons/react/3x2'
import { LanguageContext } from '../../language/LanguageContext'
import { logout } from '../../utils/authHooks'
import fetchCart from '../../utils/fetchCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function AdminNavbar(props) {
	useEffect(() => {}, [props.language])

	const history = useHistory()
	const { totalItem, setCartItem } = props
	const { dictionary, language } = useContext(LanguageContext)

	useEffect(() => {
		let mounted = true
		fetchCart()
			.then((response) => {
				if (mounted) {
					if (response.length > 1) {
						response.pop()
						setCartItem(countCartItems(response))
					} else {
					}
				}
			})
			.catch((error) => {
				console.log(error)
			})
		return () => {
			mounted = false
		}
	}, []) // eslint-disable-line

	function disconnect() {
		logout()
	}

	function countCartItems(myCart) {
		let totalItem = 0
		myCart.forEach((item) => {
			totalItem += item.quantity
		})
		return totalItem
	}

	return (
		<>
			<Row className='row_admin_navbar justify-content-center' style={{ marginRight: '0px' }}>
				<Col xs={12} md={11}>
					<Row>
						<Col md={7} lg={8} xl={9} style={{ paddingRight: '0px' }}>
							<Navbar className='admin_navbar ml-md-2' bg='light' variant='light' expand='lg'>
								<Link to='/'>
									<Navbar.Brand className='logo_font'>LOUIS VUITTON</Navbar.Brand>
								</Link>
								<Navbar.Toggle aria-controls='basic-navbar-nav' />
								<Navbar.Collapse id='basic-navbar-nav'>
									<Nav className='mr-auto'>
										<NavLink to='/products' className={language === 'zh-CN' ? 'navbar_menu_items_CN' : 'navbar_menu_items'}>
											{dictionary.collection.toUpperCase()}
										</NavLink>
										<NavLink to='/women' className={language === 'zh-CN' ? 'navbar_menu_items_CN' : 'navbar_menu_items'}>
											{dictionary.women.toUpperCase()}
										</NavLink>
										<NavLink to='/men' className={language === 'zh-CN' ? 'navbar_menu_items_CN' : 'navbar_menu_items'}>
											{dictionary.men.toUpperCase()}
										</NavLink>
										<NavLink to='/admin/orders' className={language === 'zh-CN' ? 'navbar_menu_items_CN' : 'navbar_menu_items'}>
											{dictionary.my_orders.toUpperCase()}
										</NavLink>
									</Nav>
								</Navbar.Collapse>
							</Navbar>
						</Col>
						<Col sm={12} md={4} lg={3} xl={3} className='my-auto ml-0 ml-md-5 ml-xl-0' style={{ paddingRight: '0px' }}>
							<Navbar className='admin_navbar' expand='lg' variant='light' bg='light' style={{ marginRight: '0', boxShadow: 'none' }}>
								<Button onClick={() => history.push('/admin/cart')} className='button_navbar_icon ml-2'>
									{totalItem !== 0 && <span className='mr-2 font_normal_size'>{totalItem}</span>}
									<FontAwesomeIcon size='1x' icon={['fas', 'shopping-bag']} />
								</Button>

								<DropdownButton className='my-auto' id='dropdown_user_button' title={<FontAwesomeIcon size='1x' icon={['fas', 'user']} />}>
									<Dropdown.Item
										className={language === 'zh-CN' ? 'navbar_menu_subitems_CN' : 'navbar_menu_subitems'}
										onClick={() => history.push('/admin/profile')}>
										{dictionary.profile}
									</Dropdown.Item>
									<Dropdown.Item className={language === 'zh-CN' ? 'navbar_menu_subitems_CN' : 'navbar_menu_subitems'} onClick={disconnect}>
										{dictionary.logout}
									</Dropdown.Item>
								</DropdownButton>

								{props.language !== 'en-US' ? (
									<Button className='button_language mb-1' size='sm' onClick={() => props.handleUpdateLanguage('en-US')}>
										<Flags.CN title='China' className='flag_cn mb-1' />
										<span className='ml-2 font_CN_normal'>中文</span>
									</Button>
								) : (
									<Button className='button_language' size='sm' onClick={() => props.handleUpdateLanguage('zh-CN')}>
										<Flags.US title='United States' className='flag_us mb-1' />
										<span className='ml-2 '>EN</span>
									</Button>
								)}
							</Navbar>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	)
}
