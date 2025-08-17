import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiClientAccount } from '@api'
import { Modal, Table } from '@components'
import { userSelector } from '@store/selectors'
import { useChangeInput } from '@hooks'
import { ClientAccountForm } from './components'
import './client-account.css'
export const ClientAccount = () => {
	const user = useSelector(userSelector)
	const [accounts, setAccounts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [newAccount, setNewAccount] = useState({
		name: '',
		type: '',
		amount: '',
		date: '',
	})

	const [showAddForm, setShowAddForm] = useState(false)
	const handleInput = useChangeInput(setNewAccount)

	const handleSubmit = e => {
		e.preventDefault()
		setLoading(true)
		const account = {
			name: newAccount.name,
			type: newAccount.type,
			amount: parseFloat(newAccount.amount),
			created_date: new Date().toISOString().split('T')[0],
			user: user,
		}
		apiClientAccount.POST(account).then(data => {
			setAccounts(prev => [...prev, data])
			setLoading(false)
			setNewAccount({ name: '', type: '', amount: '', date: '' })
			setShowAddForm(false)
		})
	}
	const heading = [
		{ name: 'Название', type: 'text', key: 'name' },
		{ name: 'Тип', type: 'text', key: 'type' },
		{ name: 'Сумма', type: 'number', key: 'amount' },
		{ name: 'Дата', type: 'date', key: 'date', controls: 'delete' },
	]
	const fetchAccount = async () => {
		try {
			const res = await apiClientAccount.GET(user)
			if (res.error) throw new Error(res.error)
			setAccounts(res)
			setLoading(false)
		}
		catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}
	useEffect(() => {
		fetchAccount()

	}, [])

	if (error) return <p>{error}</p>
	if (loading) return <p>Loading...</p>
	return (
		<div className='accounts-page'>
			<div className='accounts-header'>
				<h1 className='accounts-title'>Мои счета</h1>

				<button
					className='add-account-btn'
					onClick={() => setShowAddForm(!showAddForm)}
				>
					Добавить счет
				</button>
			</div>

			{showAddForm && (
				<Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
					<ClientAccountForm
						newAccount={newAccount}
						handleInputChange={handleInput}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			)}
			<div className='accounts-list'>
				{accounts.length === 0 ? (
					<p>У вас пока нет счетов</p>
				) : (
					<Table
						heading={heading}
						operations={accounts}
						fetchData={apiClientAccount}
						changeOperation={fetchAccount}
					/>
				)}
			</div>
		</div>
	)
}
