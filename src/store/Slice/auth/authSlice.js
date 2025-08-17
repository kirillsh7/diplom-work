import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'user',
	initialState: {
		isAuthenticated: localStorage.getItem('user') ? true : false,
		user: localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user'))
			: null,
		userLogin: localStorage.getItem('userLogin')
			? JSON.parse(localStorage.getItem('userLogin'))
			: null,
	},
	reducers: {
		authUser(state, action) {
			state.isAuthenticated = true
			state.user = action.payload.id
			state.userLogin = action.payload.login
			localStorage.setItem('user', JSON.stringify(action.payload.id))
			localStorage.setItem('userLogin', JSON.stringify(action.payload.login))
		},
		logoutUser(state) {
			state.isAuthenticated = false
			state.user = null
			localStorage.removeItem('user')
			localStorage.removeItem('userLogin')
		},
		updateUserLogin(state, action) {
			state.userLogin = action.payload
		},

	},

})

export const { updateUserLogin, authUser, logoutUser } = authSlice.actions
export default authSlice.reducer
