import React, { useEffect, useState, useContext } from 'react'
import { LanguageContext } from '../../language/LanguageContext'
import { useHistory } from 'react-router-dom'
import { logout } from '../../utils/authHooks'
import Profile from './Profile'
import fetchUser from '../../utils/fetchUser'
import fetchUserDetails from '../../utils/fetchUserDetails'
import deleteUser from '../../utils/deleteUser'
import updateUser from '../../utils/updateUser'
import toast from '../../utils/toast'
import updateUserDetail from '../../utils/updateUserDetail'
import { Row, Col, Button, Container, Dropdown } from 'react-bootstrap'
import BarLoader from 'react-spinners/BarLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export default function LoadProfile() {
	const [userIsLoaded, setUserIsLoaded] = useState(false)
	const [userDetailsIsLoaded, setUserDetailsIsLoaded] = useState(false)
	const [userDetailsID, setUserDetailsID] = useState('')
	const [hasError, setHasError] = useState(false)
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [postcode, setPostcode] = useState('')
	const [country, setCountry] = useState('')
	const [phone, setPhone] = useState('')
	const [isDisabled, setIsDisabled] = useState(false)
	const [changePassword, setChangePassword] = useState(false)
	const [changeInfo, setChangeInfo] = useState(false)

	const history = useHistory()
	const { dictionary, language } = useContext(LanguageContext)

	useEffect(() => {
		let mounted = true
		fetchUser()
			.then((response) => {
				if (mounted) {
					setEmail(response.email)
					setFirstName(response.first_name)
					setLastName(response.last_name)
					setUserIsLoaded(true)
				}
				fetchUserDetails()
					.then((response) => {
						if (mounted) {
							response[0].address !== null ? setAddress(response[0].address) : setAddress('')
							response[0].city !== null ? setCity(response[0].city) : setCity('')
							response[0].state !== null ? setState(response[0].state) : setState('')
							response[0].postcode !== null ? setPostcode(response[0].postcode) : setPostcode('')
							response[0].country !== null ? setCountry(response[0].country) : setCountry('')
							response[0].phone !== null ? setPhone(response[0].phone) : setPhone('')
							setUserDetailsID(response[0].user_details_id)
							setUserDetailsIsLoaded(true)
						}
					})
					.catch((error) => {
						console.log(error)
						setHasError(true)
						toast(dictionary.error_impossible_fetch_profile_details)
					})
			})
			.catch((error) => {
				console.log(error)
				setHasError(true)
				toast(dictionary.error_impossible_fetch_profile)
			})

		return () => {
			mounted = false
		}
	}, []) // eslint-disable-line

	const handleTryAgain = () => {
		setHasError(false)
		setUserIsLoaded(false)
		setUserDetailsIsLoaded(false)

		fetchUser()
			.then((response) => {
				setEmail(response.email)
				setFirstName(response.first_name)
				setLastName(response.last_name)
				setUserIsLoaded(true)
				fetchUserDetails()
					.then((response) => {
						if (response.length >= 1) {
							setAddress(response[0].address)
							setCity(response[0].city)
							setState(response[0].state)
							setPostcode(response[0].postcode)
							setCountry(response[0].country)
							setPhone(response[0].phone)
						} else {
							setAddress('')
							setCity('')
							setState('')
							setPostcode('')
							setCountry('')
							setPhone('')
						}
						setUserDetailsIsLoaded(true)
					})
					.catch((error) => {
						console.log(error)
						setHasError(true)
						toast(dictionary.error_impossible_fetch_profile_details)
					})
			})
			.catch((error) => {
				console.log(error)
				setHasError(true)
				toast(dictionary.error_impossible_fetch_profile)
			})
	}

	const handleDelete = () => {
		deleteUser()
			.then((response) => {
				console.log(response)
				toast(dictionary.account_deleted)

				logout()
				setTimeout(() => {
					history.push('/auth/login')
				}, 2000)
			})
			.catch((error) => {
				console.log(error)
				toast(dictionary.error_impossible_delete_account)
			})
	}

	const handleUpdate = (values, country) => {
		setIsDisabled(true)
		setFirstName(values.firstName)
		setLastName(values.lastName)
		setAddress(values.address)
		setPostcode(values.postcode)
		setCity(values.city)
		setState(values.state)
		setCountry(country)
		setPhone(values.phone)

		updateUser(values.firstName, values.lastName, values.password, values.profilePicture)
			.then((response) => {
				console.log(response)
				setChangeInfo(false)
				setChangePassword(false)
				updateUserDetail(userDetailsID, values.address, values.city, values.state, values.postcode, country, values.phone)
					.then((response) => {
						console.log(response)
						toast(dictionary.profile_updated)
					})
					.catch((error) => {
						console.log(error)
						toast(dictionary.error_impossible_update_profile)
					})
			})
			.catch((error) => {
				console.log(error)
				toast(dictionary.error_impossible_update_profile)
			})

		setIsDisabled(false)
	}

	if (hasError) {
		return (
			<>
				<Container fluid>
					<Row>
						<Col
							xs={{ span: 12, order: 2 }}
							sm={{ span: 12, order: 2 }}
							md={{ span: 6, order: 1 }}
							lg={{ span: 7, order: 1 }}
							xl={{ span: 8, order: 1 }}
							style={{ backgroundColor: '#f6f5f3' }}>
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
													{dictionary.my_profile_card.toUpperCase()}
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<p className='font_normal_size text-center text-md-left'>{dictionary.error_impossible_fetch_profile}</p>
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
						<Col
							xs={{ span: 12, order: 1 }}
							sm={{ span: 12, order: 1 }}
							md={{ span: 6, order: 2 }}
							lg={{ span: 5, order: 2 }}
							xl={{ span: 4, order: 2 }}>
							<Container>
								<Row>
									<Col md={11}>
										<Row className='header_cart_right ml-md-2 justify-content-center'>
											<Col md={6} style={{ paddingTop: '2.4rem' }}>
												<Dropdown>
													<Dropdown.Toggle
														className={language === 'zh-CN' ? 'button_cart font_normal_size_CN' : 'button_cart font_normal_size'}
														variant='secondary'
														disabled
														style={{ height: '3.3rem', width: '100%', color: 'white' }}>
														{dictionary.settings}
														{'  '}
														<FontAwesomeIcon size='1x' className='mt-2 ml-1' icon={['fas', 'cog']} />
													</Dropdown.Toggle>
												</Dropdown>
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
	if (!userIsLoaded || !userDetailsIsLoaded) {
		return (
			<>
				<Container fluid>
					<Row>
						<Col
							xs={{ span: 12, order: 2 }}
							sm={{ span: 12, order: 2 }}
							md={{ span: 6, order: 1 }}
							lg={{ span: 7, order: 1 }}
							xl={{ span: 8, order: 1 }}
							style={{ backgroundColor: '#f6f5f3' }}>
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
													{dictionary.my_profile_card.toUpperCase()}
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<BarLoader css={{ margin: 'auto' }} height={3} />
											</Col>
										</Row>
									</Col>
								</Row>
							</Container>
						</Col>
						<Col
							xs={{ span: 12, order: 1 }}
							sm={{ span: 12, order: 1 }}
							md={{ span: 6, order: 2 }}
							lg={{ span: 5, order: 2 }}
							xl={{ span: 4, order: 2 }}>
							<Container>
								<Row>
									<Col md={11}>
										<Row className='header_cart_right ml-md-2 justify-content-center'>
											<Col md={6} style={{ paddingTop: '2.4rem' }}>
												<Dropdown>
													<Dropdown.Toggle
														className={language === 'zh-CN' ? 'button_cart font_normal_size_CN' : 'button_cart font_normal_size'}
														variant='secondary'
														disabled
														style={{ height: '3.3rem', width: '100%', color: 'white' }}>
														{dictionary.settings}
														{'  '}
														<FontAwesomeIcon size='1x' className='mt-2 ml-1' icon={['fas', 'cog']} />
													</Dropdown.Toggle>
												</Dropdown>
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
	if (userIsLoaded && userDetailsIsLoaded) {
		return (
			<>
				<Profile
					email={email}
					firstName={firstName}
					lastName={lastName}
					address={address}
					city={city}
					state={state}
					postcode={postcode}
					country={country}
					phone={phone}
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					isDisabled={isDisabled}
					changePassword={changePassword}
					setChangePassword={setChangePassword}
					changeInfo={changeInfo}
					setChangeInfo={setChangeInfo}
				/>
			</>
		)
	}
}
