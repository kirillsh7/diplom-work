import styled from '../../header.module.css'
import { NavLink } from 'react-router-dom'
export const MenuLink = ({ to, children }) => {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) => (isActive ? `${styled.active}` : '')}
			>
				{children}
			</NavLink>
		</li>
	)
}
