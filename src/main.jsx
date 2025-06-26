import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {
  Category,
  Home,
  Operation,
  User,
  ClientAccount,
  HistoryOperation
} from '@page'
import './index.css'
import { MainLayout } from '@layout'
import { Error, Login, Register } from '@components'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/client-account' element={<ClientAccount />} />
          <Route path='/operation' element={<Operation />} />
          <Route path='/history-operation' element={<HistoryOperation />} />
          <Route path='/user' element={<User />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
)
