import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const GuestRoute = () => {
	const { isAuthenticated } = useSelector(state => state.auth)
	if (isAuthenticated) {
		return <Navigate to='/' replace />
	}

	return <Outlet />
}
