import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiCategory } from '@api'
export const getCategories = createAsyncThunk(
	'category/getCategories',
	async (user, { rejectWithValue }) => {
		try {
			return await apiCategory.GET(user)
		} catch (e) {
			return rejectWithValue('Проблемы с сервером')
		}
	}
)

export const deleteCategories = createAsyncThunk(
	'category/deleteCategories',
	async (id, { rejectWithValue }) => {
		try {
			await apiCategory.DELETE(id)
			return id
		} catch (e) {
			return rejectWithValue('Ошибка сервера при удалении категории')
		}
	}
)

export const postCategories = createAsyncThunk(
	'category/postCategories',
	async (data, { rejectWithValue }) => {
		try {
			return await apiCategory.POST(data)
		} catch (e) {
			return rejectWithValue('Проблемы с сервером')
		}
	}
)
