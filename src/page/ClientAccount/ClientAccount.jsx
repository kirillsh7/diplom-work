import { useState, useEffect } from 'react'
import { ClientAccountForm, ClientAccountTable } from './components'
import { Modal } from '@components'
import { formatAmount } from '@utils/formatAmount'
import './client-account.css'
import { useSelector } from 'react-redux'
import { userSelector } from '@store/selectors'
import { apiClientAccount } from '../../api/apiClientAccount'
import { useChangeInput } from '../../hooks/useChangeInput'
export const ClientAccount = () => {
	const user = useSelector(userSelector)
	const [accounts, setAccounts] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [newAccount, setNewAccount] = useState({
		name: '',
		type: '',
		amount: '',
		date: '',
	})

	const [showAddForm, setShowAddForm] = useState(false)
	const handleInput = useChangeInput(setNewAccount)

	const handleDeleteAccount = id => {
		setLoading(true)
		apiClientAccount.DELETE(id).then(() => {
			setAccounts(prev => prev.filter(account => account.id !== id))
			setLoading(false)
		})
	}

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
	useEffect(() => {
		setLoading(true)
		apiClientAccount
			.GET(user)
			.then(res => {
				if (res.error) throw new Error(res.error)
				setAccounts(res)
			})
			.catch(e => {
				setError(e.message)
				setLoading(false)
			})
			.finally(() => setLoading(false))
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
					<ClientAccountTable
						accounts={accounts}
						formatAmount={formatAmount}
						handleDeleteAccount={handleDeleteAccount}
					/>
				)}
			</div>
		</div>
	)
}
