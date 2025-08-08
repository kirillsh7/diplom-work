import { Link } from 'react-router-dom'
import * as yup from 'yup'
import styled from './login.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authUser } from '@store/Slice/auth/authSlice'
import { useChangeInput } from '../../hooks/useChangeInput'
import { server } from '../../bff'

const authSchema = yup.object().shape({
	login: yup
		.string()
		.required('Почта обязательна для входа')
		.email('Неправильно введен email'),
	password: yup
		.string()
		.required('Пароль обязателен для входа')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'Password must be at least 8 characters long and contain at least one letter and one number'
		)
		.min(8, 'Password must be at least 8 characters long')
		.max(30, 'Password must be at most 30 characters long'),
})

export const Login = () => {
	const [authData, setAuthData] = useState({ login: '', password: '' })
	const [error, setError] = useState({})
	const changeInput = useChangeInput(setAuthData)
	const [errorServer, setErrorServer] = useState('')
	const errorMessage = Object.values(error)[0] || errorServer
	const isValid = Object.keys(error).length === 0
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const resetError = () => {
		setError({})
		setErrorServer('')
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)

		try {
			await authSchema.validate(authData, { abortEarly: false })

			server
				.authorize(authData.login, authData.password)
				.then(({ error, res }) => {
					if (error) {
						setErrorServer(error)
						setIsLoading(false)
						return
					}
					dispatch(authUser(res.login))
					navigate('/')
					setIsLoading(false)
				})
		} catch (err) {
			const { inner } = err
			const errors = Array.isArray(inner)
				? inner.reduce((acc, item) => {
						const { path, errors } = item
						if (!acc.hasOwnProperty(path) && errors.length) {
							acc[path] = errors[0]
						}
						return acc
				  }, {})
				: {}
			setError(errors)
			setIsLoading(false)
		}
	}

	const handleInptu = e => {
		changeInput(e)
		resetError()
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className={styled.form}>
				<h1>Авторизация</h1>
				<div>
					<input
						placeholder='Почта'
						name='login'
						value={authData.login}
						onChange={handleInptu}
					/>
				</div>
				<div>
					<input
						placeholder='Пароль'
						name='password'
						type='password'
						value={authData.password}
						onChange={handleInptu}
					/>
				</div>
				{errorMessage && <p className={styled.error}>{errorMessage}</p>}
				<button type='submit' disabled={!isValid || isLoading}>
					{isLoading ? 'Загрузка...' : 'Войти'}
				</button>
				<p>
					<Link to={'/register'}>Зарегистрироваться</Link>
				</p>
			</form>
		</div>
	)
}
