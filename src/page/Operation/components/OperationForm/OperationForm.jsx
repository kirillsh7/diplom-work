import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiOperations, apiCategory, apiClientAccount } from '@api'
import { CATEGORY } from '@constants'
import { generateDate, calculateNewAccountBalance } from '@utils'
import { useChangeInput } from '@hooks'
import styled from '../../operation.module.css'

export const OperationForm = ({ getOperation, closeOperationForm, user }) => {
	const [newOperation, setNewOperation] = useState({
		category: {},
		client_account: {},
		name: '',
		amount: '',
		comment: '',
	})
	const [categories, setCategories] = useState([])
	const [accounts, setAccounts] = useState([])
	const handleInput = useChangeInput(setNewOperation)
	const [error, setError] = useState(null)
	const changeAmountAccount = async (data) => {
		try {

			const { category, amount, client_account } = data
			if (category.type === CATEGORY.EXPENSES && client_account.amount < amount) throw new Error('Недостаточно средств')

			const newAmount = calculateNewAccountBalance(category.type, client_account.amount, amount)
			const newData = await apiClientAccount.PATCH(client_account.id, { ...client_account, amount: newAmount })
			return newData
		} catch (e) {
			setError(e.message)
		}
	}
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const data = {
				...newOperation,
				comment: newOperation.comment || '',
				created_date: generateDate(),
				category: categories.find(
					category => category.id === newOperation.category
				),
				client_account: accounts.find(
					account => account.id === newOperation.client_account
				),
				user,
			}

			const newCientAccount = await changeAmountAccount(data)

			data.client_account = newCientAccount

			await apiOperations.POST(data)

			closeOperationForm()
			setNewOperation({})
			getOperation()
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categories, accounts] = await Promise.all([
					apiCategory.GET(user),
					apiClientAccount.GET(user),
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
				<form onSubmit={e => handleSubmit(e)}>
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
					<div
						style={{
							display: 'flex',
							gap: '10px',
							marginBottom: '15px',
							flexDirection: 'column',
						}}
					>
						{categories.length > 0 ? (
							<select
								name='category'
								value={newOperation.category}
								onChange={handleInput}
								required
							>
								{categories.map(category => {
									return (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									)
								})}
							</select>
						) : (
							<Link className={styled.link} to={'/category'}>
								Создать категорию
							</Link>
						)}
						{accounts.length > 0 ? (
							<select
								name='client_account'
								value={newOperation.client_account}
								onChange={handleInput}
								required
							>
								{accounts.map(account => (
									<option key={account.id} value={account.id}>
										{account.name}
									</option>
								))}
							</select>
						) : (
							<Link className={styled.link} to={'/client-account'}>
								Создать счет
							</Link>
						)}
					</div>
					<textarea
						name='comment'
						placeholder='Комментарий (необязательно)'
						value={newOperation.comment}
						onChange={handleInput}

					/>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<button type='submit'>Создать операцию</button>
				</form>
			</div>
		</div>
	)
}
