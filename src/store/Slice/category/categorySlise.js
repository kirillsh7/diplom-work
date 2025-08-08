import { createSlice } from '@reduxjs/toolkit'
import {
	getCategories,
	deleteCategories,
	postCategories,
} from '../../middleware/category/categoryMiddleware'
import { CATEGORY_NAME } from '../../../constants/category'

const categorySlice = createSlice({
	name: 'category',
	initialState: {
		items: [],
		error: null,
		loading: false,
	},
	reducers: {
		clearCategoryError(state) {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getCategories.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload || []
				state.error = null
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(deleteCategories.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteCategories.fulfilled, (state, action) => {
				state.loading = false
				state.items = state.items.filter(
					category => category.id !== action.meta.arg
				)
				state.error = null
			})
			.addCase(deleteCategories.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(postCategories.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(postCategories.fulfilled, (state, action) => {
				state.loading = false
				state.items.push({
					...action.payload,
					type: CATEGORY_NAME[action.payload.type],
				})
				state.error = null
			})
			.addCase(postCategories.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { clearCategoryError } = categorySlice.actions
export default categorySlice.reducer
