import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCategory } from '../../../api/apiCategory'

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

const categorySlice = createSlice({
	name: 'modal',
	initialState: {
		isOpen: false,
		
		
		
	},
	reducers: {
		clearCategoryError(state) {
			state.error = null
		},
	},
	=
})

export const { clearCategoryError } = categorySlice.actions
export default categorySlice.reducer
