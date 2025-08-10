import { userSelector } from '../../../../store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import styled from '../../header.module.css'
import { logoutUser } from '../../../../store/Slice/auth/authSlice'
import { Link } from 'react-router-dom'
export const MenuLogout = () => {
	const user = useSelector(userSelector)
	const dispatch = useDispatch()

	return (
		<div>
			{user && (
				<div className={styled.logout}>
					<Link to={'/user'}>
						<p className='hover:text-blue-900 hover:underline'>{user}</p>
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
