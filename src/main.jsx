import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {
	Category,
	Home,
	Operation,
	User,
	ClientAccount,
	HistoryOperation,
	Login,
	Register,
} from '@page'
import './index.css'
import { MainLayout } from '@layout'
import { Error } from '@components'
import { Provider } from 'react-redux'
import store from '@store'
import { GuestRoute } from './routes/GuestRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route element={<MainLayout />}>
							<Route path='/' element={<Home />} />
							<Route path='/category' element={<Category />} />
							<Route path='/client-account' element={<ClientAccount />} />
							<Route path='/operation' element={<Operation />} />
							<Route path='/history-operation' element={<HistoryOperation />} />
							<Route path='/user' element={<User />} />
						</Route>
					</Route>

					<Route element={<GuestRoute />}>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Route>

					<Route path='*' element={<Error />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
