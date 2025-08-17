import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiOperations } from '@api'
import { userSelector } from '@store/selectors'
import { Modal, Table } from '@components'
import { OperationForm } from './components'
import styled from './operation.module.css'

export const Operation = () => {
	const [loading, setLoading] = useState(true)
	const [showOperationForm, setShowOperationForm] = useState(false)
	const [error, setError] = useState('')
	const [errorServer, setErrorServer] = useState('')
	const [operations, setOperation] = useState([])
	const user = useSelector(userSelector)

	const closeOperationForm = () => setShowOperationForm(false)

	const getOperation = async () => {
		await apiOperations
			.GET(user)
			.then(data => {
				if (data.error) throw new Error(data.error)
				if (data.length === 0) setErrorServer('Нет операций')
				setOperation(data.reverse())
				setLoading(false)
			})
			.catch(e => {
				setError(e.message)
				setLoading(false)
			})
	}

	useEffect(() => {
		getOperation()
	}, [])
	const heading = [
		{ name: 'Сумма', key: 'amount' },
		{ name: 'Счет', key: 'client_account' },
		{ name: 'Категория', key: 'category' },
		{ name: 'Комментарий', key: 'comment', controls: 'edit' },
	]

	if (loading) return <h1>Loading...</h1>

	if (error) return <h1>{error}</h1>

	return (
		<div className={styled.operationPage}>
			<div className={styled.operationHeader}>
				<h1 className={styled.operationTitle}>Операции</h1>
				<button
					className={styled.operationCreateButton}
					onClick={() => {
						setShowOperationForm(true)
					}}
				>
					Создать операцию
				</button>
			</div>

			<div className={styled.operationList}>
				{errorServer ? <h1>{errorServer}</h1> : <Table
					operations={operations}
					heading={heading}
					fetchData={apiOperations}
					getOperation={getOperation}
				/>}

			</div>

			{showOperationForm && (
				<Modal isOpen={showOperationForm} onClose={closeOperationForm}>
					<OperationForm
						getOperation={getOperation}
						user={user}
						closeOperationForm={closeOperationForm}
					/>
				</Modal>
			)}
		</div>
	)
}
