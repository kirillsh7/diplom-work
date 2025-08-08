import { userSelector } from '../../../../store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import styled from '../../header.module.css'
import { logoutUser } from '../../../../store/Slice/auth/authSlice'
export const MenuLogout = () => {
	const user = useSelector(userSelector)
	const dispatch = useDispatch()

	return (
		<div>
			{user && (
				<div className={styled.logout}>
					<p>{user}</p>
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
