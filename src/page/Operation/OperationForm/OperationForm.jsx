import { useEffect, useState } from 'react'
import { useChangeInput } from '../../../hooks/useChangeInput'
import styled from '../operation.module.css'
import { IoMdClose } from 'react-icons/io'
import { apiCategory } from '../../../api/apiCategory'
import { apiClientAccount } from '../../../api/apiClientAccount'
export const OperationForm = ({ closeOperationForm }) => {
	const [newOperation, setNewOperation] = useState({
		amount: '',
		categories: '',
		account: '',
		comment: '',
	})
	const [categories, setCategories] = useState([])
	const [accounts, setAccounts] = useState([])
	const handleInput = useChangeInput(setNewOperation)

	const handleOverlayClick = e => {
		if (e.target !== e.currentTarget) return
		closeOperationForm()
	}
	const handleSubmit = e => {
		e.preventDefault()
		console.log(newOperation)
		console.log(newOperation.categories)
	}
	useEffect(() => {
		apiCategory
			.GET()
			.then(categories => {
				setCategories(categories)
			})
			.catch(e => console.log(e))
		apiClientAccount
			.GET()
			.then(accounts => {
				setAccounts(accounts)
			})
			.catch(e => console.log(e))
	}, [])
	console.log(categories)
	return (
		<div className={styled.operationFormOverlay} onClick={handleOverlayClick}>
			<div className={styled.operationForm}>
				<h2>Новая операция</h2>
				<form onSubmit={handleSubmit}>
					<i onClick={closeOperationForm} className={styled.operationFormClose}>
						<IoMdClose size={24} />
					</i>
					<input
						type='number'
						placeholder='Сумма'
						name='amount'
						value={newOperation.amount}
						onChange={handleInput}
						required
					/>

					<select
						name='categories'
						value={newOperation.categories}
						onChange={handleInput}
					>
						{categories.map(category => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>

					<textarea
						name='comment'
						placeholder='Комментарий (необязательно)'
						value={newOperation.comment}
						onChange={handleInput}
					/>

					<button type='submit'>Создать операцию</button>
				</form>
			</div>
		</div>
	)
}
