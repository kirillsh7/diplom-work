import { getUser, addUser } from '../api'
import { sessions } from '../sessions'

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin)

	if (existedUser) {
		return {
			error: 'Пользователь с таким логином уже существует',
			res: null,
		}
	}

	await addUser(regLogin, regPassword)
	const user = await getUser(regLogin)
	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			session: sessions.create(user),
		},
	}
}