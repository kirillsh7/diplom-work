import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '@store/selectors'
import styled from './user.module.css'
import { useEffect, useState } from 'react'
import { apiUser } from '@api'
import { ToggleInput } from '@components'
import { createErrorMessage } from '@utils'
import { useChangeInput } from '@hooks'
import { updateUserLogin } from '@store/Slice/auth/authSlice'
import * as yup from 'yup'
export const User = () => {
	const dispatch = useDispatch()
	const [isEdit, setIsEdit] = useState(false)
	const user = useSelector(userSelector)
	const [userInfo, setUserInfo] = useState({})
	const changeInput = useChangeInput(setUserInfo)
	const [errorServer, setErrorServer] = useState('')
	const [loading, setLoading] = useState(true)
	const [errorValidate, setErrorValidate] = useState({})

	const handleChangeInput = (e) => {
		setErrorValidate({})
		changeInput(e)
		if (e.target.value === '') {
			const newUserInfo = userInfo
			delete newUserInfo[e.target.name]
			setUserInfo(newUserInfo)
		}
	}

	const changeSchema = yup.object().shape({
		login: yup
			.string()
			.email('Неправильно введен email'),
		password: yup
			.string()
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				'Password must be at least 8 characters long and contain at least one letter and one number'
			)
			.min(8, 'Password must be at least 8 characters long')
			.max(30, 'Password must be at most 30 characters long'),
		newPassword: yup
			.string()
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				'Password must be at least 8 characters long and contain at least one letter and one number'
			)
			.min(8, 'Password must be at least 8 characters long')
			.max(30, 'Password must be at most 30 characters long'),
	})

	const submitEditUser = async () => {
		try {
			setErrorValidate({})
			const validation = await changeSchema.validate(userInfo, { abortEarly: false })
			if (validation.newPassword) {
				validation.password = validation.newPassword
				delete validation.newPassword
			}
			const newUserData = await apiUser.PATCH(user, validation)
			newUserData.error ? setErrorServer(newUserData.error) : setErrorServer('')
			setUserInfo(validation)
			dispatch(updateUserLogin(validation.login))
			setIsEdit(false)
		} catch (e) {
			setErrorValidate(createErrorMessage(e))
		}
	}
	const fetchUser = async () => {
		try {
			const data = await apiUser.GET(user)
			setUserInfo(data)
			setLoading(false)

		} catch (e) {
			setErrorServer(e.message)
			setLoading(false)
		}
	}
	const handleClose = () => {
		setIsEdit(false)
		fetchUser()
		setErrorValidate({})
	}
	useEffect(() => {
		fetchUser()
	}, [])
	if (loading) return <div>Loading...</div>

	if (errorServer) return <div>{errorServer}</div>

	return (

		<div className={styled.container}>
			<div className={styled.buttons}>
				<h1>Профиль пользователя</h1>
				{!isEdit
					? <button id="edit-btn" className={styled.button} onClick={() => setIsEdit(!isEdit)}>
						Изменить данные
					</button>
					: (<>
						<button id="button" className={styled.button} onClick={submitEditUser}>Сохранить</button>
						<button id="button" onClick={handleClose}>&times;</button>
					</>)
				}


			</div>
			<div className={styled.userInfo}>


				<div className={styled.infoRow}>
					<div className={styled.infoLabel}>Логин (email):</div>
					<ToggleInput isEdit={isEdit} name="login" value={userInfo.login} onChange={handleChangeInput} />
				</div>

				<div className={styled.infoRow}>
					<div className={styled.infoLabel}>
						{isEdit ? 'Старый пароль' : 'Пароль'}
					</div>
					<ToggleInput isEdit={isEdit} name="password" type="password" value={userInfo?.password} onChange={handleChangeInput} required />
				</div>
			</div>

			{isEdit && <div className={styled.infoRow}>
				<div className={styled.infoLabel}>
					Новый пароль
				</div>
				<ToggleInput isEdit={isEdit} name="newPassword" type="password" value={userInfo?.newPassword} onChange={handleChangeInput} required />
			</div>}

			{errorValidate && <div className={styled.error}>{Object.values(errorValidate)[0]}</div>}
			<div className={styled.registeredAt}>
				Зарегистрирован: {userInfo.registeredAt}
			</div>
		</div>
	)

}