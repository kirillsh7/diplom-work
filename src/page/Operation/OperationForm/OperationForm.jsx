import styled from '../operation.module.css'
import { apiOperations } from '../../../api/apiOperations'
import { getNameById } from '../../../utils/getNameById'
import { useEffect, useState } from 'react'
import { apiCategory } from '../../../api/apiCategory'
import { apiClientAccount } from '../../../api/apiClientAccount'
import { useChangeInput } from '../../../hooks/useChangeInput'
export const OperationForm = ({ getOperation, closeOperationForm, user }) => {
	const [newOperation, setNewOperation] = useState({
		category: '',
		client_account: '',
		name: '',
		amount: '',
		comment: '',
	})
	const [categories, setCategories] = useState([])
	const [accounts, setAccounts] = useState([])
	const handleInput = useChangeInput(setNewOperation)

	const handleSubmit = e => {
		e.preventDefault()
		const data = {
			...newOperation,
			category: getNameById(categories, newOperation.category),
			client_account: getNameById(accounts, newOperation.client_account),
			comment: newOperation.comment || '',
			created_date: new Date().toISOString(),
			user: user,
		}
		apiOperations
			.POST(data)
			.then(() => {
				closeOperationForm()
				setNewOperation({})
				getOperation()
			})
			.catch(e => console.log(e))
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categories, accounts] = await Promise.all([
					apiCategory.GET(),
					apiClientAccount.GET(),
				])
				setCategories(categories)
				setAccounts(accounts)
				setNewOperation(prev => ({
					...prev,
					category: categories[0]?.id || '',
					client_account: accounts[0]?.id || '',
				}))
			} catch (e) {
				console.error('Ошибка загрузки данных:', e)
			}
		}

		fetchData()
	}, [])
	return (
		<div className={styled.operationFormOverlay}>
			<div className={styled.operationForm}>
				<h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
					Новая операция
				</h2>
				<form onSubmit={handleSubmit}>
					<input
						placeholder='Назкание операции'
						name='name'
						value={newOperation.name}
						onChange={handleInput}
						required
					/>
					<input
						type='number'
						placeholder='Сумма'
						name='amount'
						value={newOperation.amount}
						onChange={handleInput}
						required
					/>

					<select
						name='category'
						value={newOperation.category}
						onChange={handleInput}
					>
						{categories.map(category => {
							return (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							)
						})}
					</select>
					<select
						name='client_account'
						value={newOperation.client_account}
						onChange={handleInput}
					>
						{accounts.map(account => (
							<option key={account.id} value={account.id}>
								{account.name}
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
