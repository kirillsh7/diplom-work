import { userLoginSelector } from '@store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import styled from '../../header.module.css'
import { logoutUser } from '@store/Slice/auth/authSlice'
import { Link } from 'react-router-dom'
export const MenuLogout = () => {
	const dispatch = useDispatch()
	const userLogin = useSelector(userLoginSelector)

	return (
		<div>
			{userLogin && (
				<div className={styled.logout}>
					<Link to={'/user'}>
						<p className='hover:text-blue-900 hover:underline'>{userLogin}</p>
					</Link>

					<button
						className={styled.button}
						onClick={() => dispatch(logoutUser())}
					>
						Выход
					</button>
				</div>
			)}
		</div>
	)
}
