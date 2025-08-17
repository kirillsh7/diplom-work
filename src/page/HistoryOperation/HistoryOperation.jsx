import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiOperations } from '@api'
import { userSelector } from '@store/selectors'
import { Table } from '@components'
import { Link } from 'react-router-dom'

export const HistoryOperation = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [errorServer, setErrorServer] = useState('')
	const [operations, setOperation] = useState([])
	const user = useSelector(userSelector)


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
		{ name: 'Дата', key: 'created_date' },
		{ name: 'Имя ', key: 'name' },
		{ name: 'Комментарий', key: 'comment' },
		{ name: 'Счет', key: 'client_account' },
		{ name: 'Категория', key: 'category' },
		{ name: 'Сумма', key: 'amount' },
	]

	if (loading) return <h1>Loading...</h1>

	if (error) return <h1>{error}</h1>

	return (


		<div >
			{errorServer && <h1>{errorServer}</h1>}
			{!errorServer && <Table
				operations={operations}
				heading={heading}
				fetchData={apiOperations}
			/>}
		</div>



	)
}
