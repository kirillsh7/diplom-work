import styled from './header.module.css'
import { MenuLink } from './components/MenuLink/MenuLink'
import { MenuLogout } from './components/MenuLogout/MenuLogout'
export const Header = () => {
	return (
		<header className={styled.header}>
			<nav>
				<ul className={styled.list}>
					<MenuLink to={'/'}>Главная</MenuLink>
					<MenuLink to={'/client-account'}>Счета</MenuLink>
					<MenuLink to={'/category'}>Категории</MenuLink>
					<MenuLink to={'/operation'}>Операции</MenuLink>
					<MenuLink to={'/history-operation'}>История операции</MenuLink>
				</ul>
			</nav>
			<MenuLogout />
		</header>
	)
}
