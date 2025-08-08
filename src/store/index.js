import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slice/auth/authSlice'
import categoryReducer from './Slice/category/categorySlise'
export default configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
	},
})
