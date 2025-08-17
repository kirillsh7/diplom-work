import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { authUser, updateUserLogin } from '@store/Slice/auth/authSlice'
import { useChangeInput } from '@hooks'
import { server } from '../../bff'
import styled from './login.module.css'
import { createErrorMessage } from '@utils'

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
						setErrorServer(error?.message || error)
						setIsLoading(false)
						return
					}
					dispatch(authUser({ id: res.id, login: res.login }))
					navigate('/')
					setIsLoading(false)
				})

				.finally(() => setIsLoading(false))
		} catch (err) {

			setError(createErrorMessage(err))
			setIsLoading(false)
		}
	}

	const handleInput = e => {
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
						onChange={handleInput}
					/>
				</div>
				<div>
					<input
						placeholder='Пароль'
						name='password'
						type='password'
						value={authData.password}
						onChange={handleInput}
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
