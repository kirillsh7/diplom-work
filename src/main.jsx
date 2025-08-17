import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
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
import store from '@store'
import { MainLayout } from '@layout'
import { GuestRoute, ProtectedRoute } from '@routes'
import './index.css'

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

					<Route path='*' element={<p style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px' }}>Старница не найдена</p>} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>
)
