import React, { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { LanguageContext } from './../language/LanguageContext'
import requestReset from './../utils/requestReset'
import toast from './../utils/toast'
import { Modal, Button, Col, Row, Form, FormGroup, InputGroup, NavLink, Container } from 'react-bootstrap'

export default function ForgotModal(props) {
	const { handleLoginChange, handleForgotChange, handleRegisterChange } = props
	const [isDisabled, setIsDisabled] = useState(false)
	const [timer, setTimer] = useState(0)
	const { dictionary, language } = useContext(LanguageContext)

	const validationSchema = Yup.object({
		email: Yup.string().min(6, dictionary.too_short).max(40, dictionary.too_long).email(dictionary.invalid_email).required(dictionary.required),
	})

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema,
		onSubmit(values) {
			setTimer(60)
			handleReset(values)
		},
	})

	useEffect(() => {
		let interval = null
		if (timer !== 0) {
			interval = setInterval(() => {
				setTimer((seconds) => seconds - 1)
			}, 1000)
		} else if (timer === 0) {
			setIsDisabled(false)
		}
		return () => clearInterval(interval)
	}, [timer, setTimer])

	function handleReset() {
		setIsDisabled(true)
		const email = values.email.toLowerCase()
		requestReset(email)
			.then((response) => {
				console.log(response)
				toast(String(response.message))
			})
			.catch((error) => {
				console.log(error)
				toast(dictionary.error_not_reset_password)
				setTimer(0)
				setIsDisabled(false)
			})
	}

	function handleLogin() {
		handleForgotChange(false)
		handleLoginChange(true)
	}

	function handleRegister() {
		handleForgotChange(false)
		handleRegisterChange(true)
	}

	return (
		<Modal show={props.show} onHide={props.onHide} size='lg' className='modal' animation={false} centered>
			<Container style={{ borderBottom: '1px solid #eae8e4' }}>
				<Row className='justify-content-center'>
					<Col xs={9} style={{ borderRight: '1px solid #eae8e4', padding: '1.2rem 0rem 1rem 0rem' }}>
						<Modal.Title className={language === 'zh-CN' ? 'modal_title_CN ml-md-3' : 'modal_title ml-md-3'}>
							{dictionary.identification.toUpperCase()}
						</Modal.Title>
					</Col>
					<Col xs={2} onClick={props.onHide} style={{ paddingTop: '1.2rem' }} className='text-center'>
						<NavLink className='cross_close'>&#10006;</NavLink>
					</Col>
				</Row>
			</Container>

			<Container>
				<Row className='justify-content-center mt-5'>
					<Col sm={9} md={11}>
						<p className={language === 'zh-CN' ? 'modal_subtitle_CN' : 'modal_subtitle'}>{dictionary.change_password.toUpperCase()}</p>
						<p className='modal_text'>{dictionary.reset_your_password_description}</p>
						<Row>
							<Col className='mx-auto'>
								<Form role='form' onSubmit={handleSubmit}>
									<FormGroup className='mb-3'>
										<InputGroup className='input-group-alternative'>
											<InputGroup.Prepend>
												<InputGroup.Text>
													<i className='fas fa-user-circle'></i>
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												id='email'
												name='email'
												type='text'
												placeholder={dictionary.email}
												onBlur={handleBlur}
												value={values.email}
												onChange={handleChange}
											/>
										</InputGroup>
										{errors.email && touched.email && <div className='error_field'>{errors.email}</div>}
									</FormGroup>
									<div className='text-center'>
										<Row>
											<Col md={6}>
												<Button
													className={
														language === 'zh-CN'
															? 'mt-1 mb-4 button_cancel button_modal font_CN_normal'
															: 'mt-1 mb-4 button_cancel button_modal'
													}
													color='primary'
													onClick={handleLogin}
													variant='secondary'
													disabled={isDisabled}>
													{dictionary.cancel}{' '}
													{isDisabled && <ClipLoader css='margin-bottom: -4%; margin-left: 5%' color={'white'} size={15} />}
												</Button>
											</Col>
											<Col md={6}>
												<Button
													className={
														language === 'zh-CN'
															? 'mt-1 mb-4 button_cart button_modal font_CN_normal'
															: 'mt-1 mb-4 button_cart button_modal'
													}
													variant='secondary'
													type='submit'
													disabled={isDisabled}>
													{dictionary.send} {timer !== 0 && `${timer} s`}
													{isDisabled && <ClipLoader css='margin-bottom: -0.5%; margin-left: 4%' color={'white'} size={15} />}
												</Button>
											</Col>
										</Row>
									</div>
								</Form>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			<hr />
			<Container>
				<Row className='justify-content-center'>
					<Col sm={9} md={11} className='mt-4'>
						<p className={language === 'zh-CN' ? 'modal_subtitle_CN' : 'modal_subtitle'}>{dictionary.dont_have_account}</p>
						<p className='modal_text'>{dictionary.benefits_personal_account}</p>
						<div className='text-center'>
							<Button
								className={language === 'zh-CN' ? 'mt-1 mb-4 button_cart button_modal font_CN_normal' : 'mt-1 mb-4 button_cart button_modal'}
								variant='secondary'
								type='submit'
								disabled={isDisabled}
								onClick={handleRegister}>
								{dictionary.create_account} {isDisabled && <ClipLoader css='margin-bottom: -4%; margin-left: 5%' color={'white'} size={15} />}
							</Button>
						</div>
						<Row className='mt-3 justify-content-center '>
							<Col className='mx-auto text-align-center'></Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</Modal>
	)
}
