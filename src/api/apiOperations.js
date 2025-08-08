import { BASE_URL } from '../constants'
import { transformOperation } from './transformers'
const URL = `${BASE_URL}/operation-client`
export const apiOperations = {
	GET: async user => {
		try {
			const response = await fetch(`${URL}?user=${user}`)
			if (!response.ok) throw new Error(response.statusText)
			const data = await response.json()
			return data.map(el => transformOperation(el))
		} catch (e) {
			return { error: e }
		}
	},
	POST: async user => {
		try {
			const response = await fetch(`${URL}?user=${user}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error(response.statusText)
			const newData = await response.json()
			return newData
		} catch (e) {
			return { error: e }
		}
	},
	DELETE: async id => {
		try {
			const response = await fetch(`${URL}/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error(response.statusText)
			return response.json()
		} catch (e) {
			return { error: e }
		}
	},
	PATH: async id => {
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
		} catch (e) {
			return { error: e }
		}
	},
}
