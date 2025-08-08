import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'user',
	initialState: {
		isAuthenticated: localStorage.getItem('user') ? true : false,
		user: localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user'))
			: null,
	},
	reducers: {
		authUser(state, action) {
			state.isAuthenticated = true
			state.user = action.payload
			localStorage.setItem('user', JSON.stringify(action.payload))
		},
		logoutUser(state) {
			state.isAuthenticated = false
			state.user = null
			localStorage.removeItem('user')
		},
	},
})

export const { getUser, authUser, logoutUser } = authSlice.actions
export default authSlice.reducer
