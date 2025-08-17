import { BASE_URL } from '@constants'
import { transformUser } from './transformers'
const URL = `${BASE_URL}/users`
export const apiUser = {
	GET: async (user) => {
		const response = await fetch(`${URL}/${user}`)
		if (!response.ok) throw new Error(response.statusText)
		const data = await response.json()
		return transformUser(data)
	},
	PATCH: async (id, data) => {
		try {
			const response = await fetch(`${URL}/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error(response.statusText)
			const newData = await response.json()
			return newData
		}
		catch (e) {
			return { error: e.message }
		}
	},
}
