import { Route, Routes } from 'react-router-dom'

import { routerConfig } from './configRouter/configRouter'

const AppRouterProvider = () => {
	const CallBackRouter = ({ element, isAuth, roles, patch }) => {
		return (
			<Route
				path={patch}
				element={
					isAuth
						? <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
						: element
				}
			/>
		)
	}
	return <Routes>{routerConfig.map(CallBackRouter)}</Routes>


}

export default AppRouterProvider