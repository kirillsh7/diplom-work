import { useEffect, useState } from 'react'
import { formatAmount } from '@utils'
import { EditableTableCell, EditControl } from '@components'
import { useChangeInput } from '@hooks'
import { apiCategory, apiOperations, apiClientAccount } from '@api'

export const OperationList = ({
	heading,
	operations,
	removeOperation,
	getOperation,
}) => {
	const [categories, setCategories] = useState([])
	const [accounts, setAccounts] = useState([])
	const [isEdit, setIsEdit] = useState(null)
	const [editForm, setEditForm] = useState({
		amount: '',
		comment: '',
		category: '',
		client_account: '',
	})

	const changeInput = useChangeInput(setEditForm)

	const handleEdit = id => {
		const operation = operations.find(operation => operation.id === id)
		setIsEdit(id)
		setEditForm({
			amount: operation.amount,
			comment: operation.comment,
			category: operation.category.id,
			client_account: operation.client_account.id,
		})
	}

	const editControlClose = () => {
		setIsEdit({})
	}

	const saveEdited = id => {
		const newOperation = operations.find(operation => operation.id === id)
		const data = {
			...newOperation,
			amount: editForm.amount,
			comment: editForm.comment,
			category: categories.find(category => category.id === editForm.category),
			client_account: accounts.find(
				account => account.id === editForm.client_account
			),
		}
		apiOperations.PATH(id, data).then(() => {
			getOperation()
			setIsEdit({})
		})
	}
	useEffect(() => {
		const fetchData = async () => {
			const [categories, accounts] = await Promise.all([
				apiCategory.GET(),
				apiClientAccount.GET(),
			])
			setCategories(categories)
			setAccounts(accounts)
		}
		fetchData()
	}, [])
	if (!operations.length) return <div>Создайте свою первую операцию.</div>
	return (
		<table
			style={{
				width: '100%',
				borderCollapse: 'collapse',
				tableLayout: 'fixed',
			}}
		>
			<thead>
				<tr>
					{heading.map((item, index) => (
						<th
							key={index}
							style={{
								padding: '12px 8px',
								textAlign: 'left',
								borderBottom: '1px solid #ddd',
							}}
						>
							{item}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{operations.map(operation => (
					<tr key={operation.id} style={{ borderBottom: '1px solid #eee' }}>
						<EditableTableCell
							isEdit={isEdit === operation.id}
							name='amount'
							value={
								isEdit === operation.id ? editForm.amount : operation.amount
							}
							onChange={changeInput}
							formatAmount={formatAmount}
						/>
						<EditableTableCell
							isEdit={isEdit === operation.id}
							name='category'
							selectData={categories}
							value={
								isEdit === operation.id
									? editForm.category
									: operation.category.name
							}
							onChange={changeInput}
						/>
						<EditableTableCell
							isEdit={isEdit === operation.id}
							name='client_account'
							selectData={accounts}
							value={
								isEdit === operation.id
									? editForm.client_account
									: operation.client_account.name
							}
							onChange={changeInput}
						/>
						<EditableTableCell
							isEdit={isEdit === operation.id}
							name='comment'
							value={
								isEdit === operation.id ? editForm.comment : operation.comment
							}
							onChange={changeInput}
							controls={
								<EditControl
									isEdit={isEdit}
									id={operation.id}
									handleEdit={handleEdit.bind(null, operation.id)}
									editControlClose={editControlClose}
									removeOperation={removeOperation.bind(null, operation.id)}
									saveEdited={saveEdited.bind(null, operation.id)}
								/>
							}
						/>
					</tr>
				))}
			</tbody>
		</table>
	)
}
