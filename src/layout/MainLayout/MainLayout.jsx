import styled from './mainLayout.module.css'
import { Outlet } from 'react-router-dom'
import { Header } from '@components'

export const MainLayout = () => {
	return (
		<div className={styled.container}>
			<Header />
			<Outlet />
		</div>
	)
}
