import React, { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, FormGroup, Form, InputGroup, Container, Col, Row } from 'react-bootstrap'
import ClipLoader from 'react-spinners/ClipLoader'
import { LanguageContext } from '../../language/LanguageContext'
import requestReset from '../../utils/requestReset'
import toast from '../../utils/toast'
import { useHistory } from 'react-router-dom'

export default function Forgot() {
	const [isDisabled, setIsDisabled] = useState(false)
	const [timer, setTimer] = useState(0)
	const { dictionary, language } = useContext(LanguageContext)
	const history = useHistory()

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
				toast(dictionary.reset_password)
			})
			.catch((error) => {
				console.log(error)
				toast(dictionary.error_not_reset_password)
				setIsDisabled(false)
				setTimer(0)
			})
	}
	return (
		<>
			<Container>
				<Row className='justify-content-center mt-5'>
					<Col xs={11} sm={11} md={8} lg={6} xl={6}>
						<p className={language === 'zh-CN' ? 'modal_subtitle_CN' : 'modal_subtitle'}>{dictionary.change_password.toUpperCase()}</p>
						<p className='modal_text'>{dictionary.reset_your_password_description}</p>
						<Row>
							<Col className='mx-auto'>
								<Form role='form' onSubmit={handleSubmit}>
									<FormGroup className='mb-3'>
										<InputGroup className='input-group-alternative'>
											<InputGroup.Prepend>
												<InputGroup.Text>
													{/* INFO: FONTAWESOME ICON */}
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
													onClick={() => history.push('/auth/login')}
													disabled={isDisabled}>
													{dictionary.cancel}
												</Button>
											</Col>
											<Col md={6}>
												<Button
													className={
														language === 'zh-CN'
															? 'mt-1 mb-4 button_cart button_modal font_CN_normal'
															: 'mt-1 mb-4 button_cart button_modal'
													}
													color='secondary'
													type='submit'
													disabled={isDisabled}>
													{dictionary.send} {timer !== 0 && `${timer} s`}
													{isDisabled && <ClipLoader css='margin-bottom: -0.8%; margin-left: 4%' color={'white'} size={15} />}
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
