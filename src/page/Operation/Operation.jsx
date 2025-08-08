import { useState, useEffect } from 'react'
import styled from './operation.module.css'
import { OperationList } from './OperationList/OperationList'
import { OperationForm } from './OperationForm/OperationForm'
import { apiOperations } from '../../api/apiOperations'
import { useSelector } from 'react-redux'
import { userSelector } from '../../store/selectors'
export const Operation = () => {
	const [loading, setLoading] = useState(false)
	const user = useSelector(userSelector)
	const [error, setError] = useState('')
	const [showOperationForm, setShowOperationForm] = useState(false)
	const closeOperationForm = () => setShowOperationForm(false)
	const [operations, setOperation] = useState([])
	useEffect(() => {
		setLoading(true)
		apiOperations
			.GET(user)
			.then(operations => {
				setError('')
				if (operations.error) throw new Error(operations.error)
				setOperation(operations)
				setLoading(false)
			})
			.catch(e => {
				console.log(e.message)
				setError(e.message)
				setLoading(false)
			})
	}, [])
	if (loading) return <h1>Loading...</h1>
	if (error) return <h1>{error}</h1>
	return (
		<div className={styled.operationPage}>
			<div className={styled.operationHeader}>
				<h1 className={styled.operationTitle}>Операции</h1>
				<button
					className={styled.operationCreateButton}
					onClick={() => setShowOperationForm(true)}
				>
					Создать операцию
				</button>
			</div>

			<div className={styled.operationList}>
				<OperationList
					operations={operations}
					heading={['Сумма', 'Категория', 'Счет', 'Комментарий']}
				/>
			</div>

			{showOperationForm && (
				<OperationForm closeOperationForm={closeOperationForm} />
			)}
		</div>
	)
}
