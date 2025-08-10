import { transformCategory } from './transformers'
import { BASE_URL } from '../constants'
const URL = `${BASE_URL}/category`
export const apiCategory = {
	GET: async (user = '') => {
		const response = await fetch(`${URL}?user=${user}`)
		if (!response.ok) throw new Error(response.statusText)
		const data = await response.json()
		return data.map(el => transformCategory(el))
	},
	DELETE: async id => {
		const response = await fetch(`${URL}/${id}`, {
			method: 'DELETE',
		})
		if (!response.ok) throw new Error(response.statusText)
		return id
	},
	POST: async data => {
		try {
			const response = await fetch(`${URL}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error(response.statusText)
			const newData = await response.json()
			return transformCategory(newData)
		} catch (e) {
			console.log(e)
		}
	},
}
