import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, FormGroup, Form, InputGroup, Container, Col, Row } from 'react-bootstrap'
import ClipLoader from 'react-spinners/ClipLoader'
import { LanguageContext } from '../../language/LanguageContext'
import { useHistory, useParams } from 'react-router-dom'
import setPassword from '../../utils/setPassword'
import toast from '../../utils/toast'

export default function Reset() {
	const [isDisabled, setIsDisabled] = useState(false)
	const { dictionary, language } = useContext(LanguageContext)
	let { token } = useParams()
	const history = useHistory()

	const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/
	const validationSchema = Yup.object({
		password: Yup.string()
			.min(6, dictionary.too_short)
			.max(12, dictionary.too_long)
			.matches(regexPassword, dictionary.password_regex)
			.required(dictionary.required),
		confirm_password: Yup.string()
			.min(6, dictionary.too_short)
			.max(24, dictionary.too_long)
			.oneOf([Yup.ref('password'), null], dictionary.password_match)
			.required(dictionary.required),
	})

	const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
		initialValues: {
			password: '',
			confirm_password: '',
		},
		validationSchema,
		onSubmit(values) {
			updatePassword(values)
		},
	})

	function updatePassword() {
		setIsDisabled(true)
		const password = values.password
		setPassword(password, token)
			.then((response) => {
				console.log(response)
				history.push('/auth/login')
				toast(dictionary.reset_password)
				setIsDisabled(false)
			})
			.catch((error) => {
				console.log(error)
				toast(dictionary.error_not_reset_password)
				setIsDisabled(false)
			})
	}

	return (
		<>
			<Container>
				<Row>
					<Col md={5} className='mx-auto mt-5'>
						<Form role='form' onSubmit={handleSubmit}>
							<FormGroup className='mb-3'>
								<InputGroup className='input-group-alternative'>
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className='fas fa-user-circle'></i>
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

							<FormGroup className='mb-3'>
								<InputGroup className='input-group-alternative'>
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className='fas fa-user-circle'></i>
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										id='confirm_password'
										name='confirm_password'
										type='password'
										placeholder={dictionary.confirm_password}
										onBlur={handleBlur}
										value={values.confirm_password}
										onChange={handleChange}
									/>
								</InputGroup>
								{errors.confirm_password && touched.confirm_password && <div className='error_field'>{errors.confirm_password}</div>}
							</FormGroup>
							<div className='text-center'>
								<Button
									className={language === 'zh-CN' ? 'mt-1 mb-4 button_cart font_CN_normal' : 'mt-1 mb-4 button_cart '}
									color='secondary'
									type='submit'
									disabled={isDisabled}>
									{dictionary.set_password}{' '}
									{isDisabled && <ClipLoader css='margin-bottom: -0.5%; margin-left: 3%' color={'white'} size={15} />}
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	)
}
