import { transformClientAcount } from './transformers'
import { BASE_URL } from '../constants'
export const apiClientAccount = {
	GET: async (user = '') => {
		try {
			const response = await fetch(`${BASE_URL}/client-account?user=${user}`)
			if (!response.ok) throw new Error(response.statusText)
			const data = await response.json()
			return data.map(el => transformClientAcount(el))
		} catch (e) {
			return { error: e }
		}
	},
	POST: async data => {
		try {
			const response = await fetch(`${BASE_URL}/client-account`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error(response.statusText)
			const newData = await response.json()
			return transformClientAcount(newData)
		} catch (e) {
			console.log(e)
			return { error: e }
		}
	},
	PATCH: async (id, data) => {
		try {
			const response = await fetch(`${BASE_URL}/client-account/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error(response.statusText)
			const newData = await response.json()
			return newData
		} catch (e) {
			console.log(e)
			return { error: e }
		}
	},
	DELETE: async id => {
		try {
			const response = await fetch(`${BASE_URL}/client-account/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error(response.statusText)
			return { id, error: null }
		} catch (e) {
			return { id, error: e }
		}
	},
}
