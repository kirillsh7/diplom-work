import { Link } from 'react-router-dom'
import styled from './header.module.css'
export const Header = () => {
	return (
		<header className={styled.header}>
			<nav>
				<ul className={styled.list}>
					<li><Link to={'/'}>Главная</Link></li>
					<li><Link to={'/client-account'}>Счета</Link></li>
					<li><Link to={'/category'}>Категории</Link></li>
					<li><Link to={'/operation'}>Oперации</Link></li>
					<li><Link to={'/history-operation'}>История операции</Link></li>
				</ul>
			</nav>
			<div>
				<button className={styled.button}>
					<Link to={'/login'}>Войти</Link>
				</button>
			</div>
		</header>
	)
}