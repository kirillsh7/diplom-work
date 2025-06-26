import { Link } from 'react-router-dom'
import * as yup from 'yup'
import styled from './login.module.css'
import { useState, useEffect } from 'react'
export const Login = () => {

	const [authData, setAuthData] = useState({ login: '', password: '' })
	const [error, setError] = useState({})
	const isValid = Object.keys(error).length === 0
	const [isSubmitted, setIsSubmitted] = useState(false)


	const authSchema = yup.object().shape({
		login: yup.string()
			.required('Почта обязательна для входа')
			.email('Неправильно введен email')
		,
		password: yup
			.string()
			.required('Пароль обязателен для входа')
			.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number')
			.min(8, 'Password must be at least 8 characters long')
			.max(30, 'Password must be at most 30 characters long')
	})
	const validateForm = async (isSubmitted) => {
		if (isSubmitted) {
			try {
				console.log(isSubmitted, '2')
				await authSchema.validate(authData, { abortEarly: false })
				setError({})
			} catch (err) {
				const { inner } = err

				const errors = Array.isArray(inner)
					? inner.reduce((acc, item) => {
						const { path, errors } = item
						if (!acc.hasOwnProperty(path) && errors.length) {
							acc[path] = errors[0]
						}
						return acc
					}, {}) : {}
				setError(errors)
			}
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitted(true)
		await validateForm(true)
	}
	const handleChange = async (e) => {
		const { name, value } = e.target
		setAuthData({ ...authData, [name]: value })
		await validateForm(isSubmitted)
	}
	return (
		<div>
			<form action="" onSubmit={handleSubmit} className={styled.form}>
				<div>
					<input name='login' value={authData.login} onChange={handleChange} />
					{error?.login && <p className={styled.error}>{error?.login}</p>}</div>
				<div>
					<input name='password' type='password' value={authData.password} onChange={handleChange} />
					{error?.password && <p className={styled.error}>{error?.password}</p>}
				</div>
				<p><Link to={'/register'}>Зарегистрироваться</Link></p>
				<button type='submit' disabled={!isValid}  >Войти</button>
			</form>
		</div>
	)

}