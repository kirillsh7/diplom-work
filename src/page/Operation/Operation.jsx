import { useState, useEffect } from 'react'
import styled from './operation.module.css'
import { OperationList } from './OperationList/OperationList'
import { OperationForm } from './OperationForm/OperationForm'
import { apiOperations } from '../../api/apiOperations'
import { useSelector } from 'react-redux'
import { userSelector } from '../../store/selectors'
import { Modal } from '@components'
export const Operation = () => {
	const [loading, setLoading] = useState(false)
	const [showOperationForm, setShowOperationForm] = useState(false)
	const [error, setError] = useState('')
	const [operations, setOperation] = useState([])
	const user = useSelector(userSelector)

	const closeOperationForm = () => setShowOperationForm(false)

	const getOperation = async () => {
		setLoading(true)
		await apiOperations
			.GET(user)
			.then(data => {
				setOperation(data)
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

	const removeOperation = id => {
		setLoading(true)
		apiOperations
			.DELETE(id)
			.then(() => {
				setLoading(false)
				getOperation()
			})
			.catch(e => {
				setError(e.message)
				setLoading(false)
			})
	}

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
				<OperationList
					operations={operations}
					heading={['Сумма', 'Категория', 'Счет', 'Комментарий']}
					removeOperation={removeOperation}
					getOperation={getOperation}
				/>
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
