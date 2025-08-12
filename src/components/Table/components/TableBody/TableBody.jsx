import { useState, useEffect } from 'react'
import { useChangeInput } from '@hooks'
import { apiCategory, apiClientAccount, apiOperations } from '@api'
import { EditControl } from '../../../EditControl/EditControl'
import { EditableTableCell } from '../../../EditableTableCell/EditableTableCell'
import { formatAmount, findOperation, changeData, findById } from '@utils'

export const TableBody = ({ data, changeOperation, ...props }) => {
	const [isEdit, setIsEdit] = useState(null)
	const [selectData, setSelectData] = useState({})
	const [editForm, setEditForm] = useState({})
	const changeInput = useChangeInput(setEditForm)
	const [error, setError] = useState(null)

	const { heading, removeOperation, operations } = props

	const editControlClose = () => {
		setIsEdit({})
	}
	const handleEdit = id => {
		const operation = findOperation(operations, id)

		setIsEdit(id)
		setEditForm({
			amount: operation.amount,
			comment: operation.comment,
			category: operation.category.id,
			client_account: operation.client_account.id,
		})
	}

	const saveEdited = id => {
		const operation = findOperation(operations, id)
		const newData = {
			...operation,
			amount: editForm.amount,
			comment: editForm.comment,
			category: findById(selectData.category, editForm.category),
			client_account: findById(
				selectData.client_account,
				editForm.client_account
			),
		}
		apiOperations.PATH(id, newData).then(res => {
			changeOperation(changeData(data, id, res))
			setIsEdit({})
		})
	}
	useEffect(() => {
		const fetchData = async () => {
			const [category, client_account] = await Promise.all([
				apiCategory.GET(),
				apiClientAccount.GET(),
			])
			setSelectData({
				category,
				client_account,
			})
		}
		fetchData()
	}, [])
	return (
		<tbody>
			{error && (
				<p>{typeof error === 'object' ? error.message : String(error)}</p>
			)}
			{data.map(el => {
				return (
					<tr key={el.id} style={{ borderBottom: '1px solid #eee' }}>
						{heading.map(({ key, controls }) => {
							return (
								<EditableTableCell
									isEdit={isEdit === el.id}
									name={key}
									key={key}
									value={isEdit === el.id ? editForm[key] : el[key]}
									onChange={changeInput}
									formatAmount={formatAmount}
									selectData={selectData[key]}
									controls={
										controls ? (
											<EditControl
												isEdit={isEdit}
												id={el.id}
												handleEdit={handleEdit.bind(null, el.id)}
												editControlClose={editControlClose}
												removeOperation={removeOperation.bind(null, el.id)}
												saveEdited={saveEdited.bind(null, el.id)}
											/>
										) : null
									}
								/>
							)
						})}
					</tr>
				)
			})}
		</tbody>
	)
}
