import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, FormGroup, Form, InputGroup, Container, Col, Row } from 'react-bootstrap'
import ClipLoader from 'react-spinners/ClipLoader'
import { useHistory } from 'react-router-dom'
import { LanguageContext } from '../../language/LanguageContext'
import requestLogin from '../../utils/requestLogin'
import toast from '../../utils/toast'
import { login } from '../../utils/authHooks'

export default function Login() {
	const [isDisabled, setIsDisabled] = useState(false)
	const history = useHistory()
	const { dictionary, language } = useContext(LanguageContext)

	const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
	const validationSchema = Yup.object({
		email: Yup.string().min(6, dictionary.too_short).max(40, dictionary.too_long).email(dictionary.invalid_email).required(dictionary.required),
		password: Yup.string()
			.min(6, dictionary.too_short)
			.max(12, dictionary.too_long)
			.matches(regexPassword, dictionary.password_regex)
			.required(dictionary.required),
	})

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema,
		onSubmit(values) {
			handleLogin(values)
		},
	})

	function handleLogin(values) {
		setIsDisabled(true)
		const email = values.email.toLowerCase()
		const password = values.password
		requestLogin(email, password)
			.then((response) => {
				login(response)
				setIsDisabled(false)
			})
			.catch((error) => {
				console.log(error)
				toast(dictionary.error_wrong_username_password)
				setIsDisabled(false)
			})
	}

	return (
		<>
			<Container>
				<Row className='justify-content-center mt-5'>
					<Col xs={11} sm={11} md={8} lg={6} xl={6}>
						<p className={language === 'zh-CN' ? 'modal_subtitle_CN' : 'modal_subtitle'}>{dictionary.members_sign_in}</p>
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
									<FormGroup>
										<InputGroup className='input-group-alternative'>
											<InputGroup.Prepend>
												<InputGroup.Text>
													<i className='fas fa-unlock-alt'></i>
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												id='password'
												name='password'
												type='password'
												placeholder={dictionary.password}
												onBlur={handleBlur}
												value={values.password}
												onChange={handleChange}
											/>
										</InputGroup>
										{errors.password && touched.password && <div className='error_field'>{errors.password}</div>}
									</FormGroup>
									<p className='text-light' onClick={() => history.push('/auth/forgot')}>
										<small style={{ color: 'black' }} className={language === 'zh-CN' ? 'font_CN_normal' : ''}>
											{dictionary.forgot_password}
										</small>
									</p>
									<div className='text-center'>
										<Button
											className={
												language === 'zh-CN'
													? 'mt-1 mb-4 button_cart button_modal font_CN_normal'
													: 'mt-1 mb-4 button_cart button_modal'
											}
											color='secondary'
											type='submit'
											disabled={isDisabled}>
											{dictionary.sign_in}{' '}
											{isDisabled && <ClipLoader css='margin-bottom: -0.6%; margin-left: 3%' color={'white'} size={15} />}
										</Button>
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
					<Col xs={11} sm={11} md={8} lg={6} xl={6} className='mt-4'>
						<p className={language === 'zh-CN' ? 'modal_subtitle_CN' : 'modal_subtitle'}>{dictionary.dont_have_account}</p>
						<p className='modal_text'>{dictionary.benefits_personal_account}</p>
						<div className='text-center'>
							<Button
								className={language === 'zh-CN' ? 'mt-1 mb-4 button_cart button_modal font_CN_normal' : 'mt-1 mb-4 button_cart button_modal'}
								color='secondary'
								type='submit'
								disabled={isDisabled}
								onClick={() => history.push('/auth/register')}>
								{dictionary.create_account}
							</Button>
						</div>
						<Row className='mt-3 justify-content-center '>
							<Col className='mx-auto text-align-center'></Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	)
}
