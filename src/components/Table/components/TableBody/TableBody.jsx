import { useState, useEffect } from 'react'
import { useChangeInput } from '@hooks'
import { apiCategory, apiClientAccount, apiOperations } from '@api'
import { EditControl } from '../../../EditControl/EditControl'
import { EditableTableCell } from '../../../EditableTableCell/EditableTableCell'
import { userSelector } from '@store/selectors'
import { useSelector } from 'react-redux'
import { calculateNewAccountBalance } from '@utils'
import {
	formatAmount,
	findOperation,
	findById,
} from '@utils'
import { useLocation } from 'react-router-dom'

export const TableBody = ({ data, changeOperation, ...props }) => {

	const user = useSelector(userSelector)
	const [isEdit, setIsEdit] = useState(null)
	const [selectData, setSelectData] = useState({})
	const [editForm, setEditForm] = useState({})
	const changeInput = useChangeInput(setEditForm)
	const [error, setError] = useState(null)
	const { heading, operations, fetchData } = props
	const clientAccountPage = useLocation().pathname === '/client-account'
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
	const changeAmountAccount = async (id) => {
		try {
			if (clientAccountPage) {
				const dataOperations = await apiOperations.GET(user)
				const filteredDataOperations = dataOperations.filter(operation => operation.client_account.id === id
				)
				const idOperations = filteredDataOperations.map(operation => operation.id)
				const deleteOperation = idOperations.map(id => apiOperations.DELETE(id))
				await Promise.all(deleteOperation)
			} else {
				if (heading.find(item => item.controls === 'delete')) return
				const { amount, category, client_account } = findOperation(operations, id)
				const newAmount = calculateNewAccountBalance(!category.type, client_account.amount, amount)
				await apiClientAccount.PATCH(client_account.id, { ...client_account, amount: newAmount })
			}
		} catch (e) {
			setError(e.message)
		}
	}
	const handleOperationChanges = async (oldOperation, newOperation) => {

		try {
			const isAccountChanged = oldOperation.client_account.id !== newOperation.client_account.id
			const isCategoryChanged = oldOperation.category.type !== newOperation.category.type
			const isAmountChanged = oldOperation.amount !== newOperation.amount
			const operationsData = await apiOperations.GET(user)

			const filteredDataOld = operationsData.filter(operation => operation.client_account.id === oldOperation.client_account.id)
			const filteredDataNew = operationsData.filter(operation => operation.client_account.id === newOperation.client_account.id)
			const filteredDataOldId = filteredDataOld.map(operation => operation.id)
			const filteredDataNewId = filteredDataNew.map(operation => operation.id)

			const changeOperation = (ids, updater) =>
				ids.map(async (id) => {
					const operation = operationsData.find(op => op.id === id)
					if (!operation) return null

					const updatedData = updater(operation)
					return apiOperations.PATCH(id, updatedData)
				})
			if (!isAccountChanged && !isCategoryChanged && !isAmountChanged) return newOperation
			const changeData = {
				oldAmount: oldOperation.amount,
				newAmount: newOperation.amount,
				OldAccountAmount: oldOperation.client_account.amount,
				NewAccountAmount: newOperation.client_account.amount,
				oldCategoryType: oldOperation.category.type,
				newCategoryType: newOperation.category.type,
				oldAccountId: oldOperation.client_account.id,
				newAccountId: newOperation.client_account.id,
			}
			if (isAccountChanged) {
				const oldAmountAccount = calculateNewAccountBalance(!changeData.oldCategoryType, changeData.OldAccountAmount, changeData.oldAmount)
				const newAmountAccount = calculateNewAccountBalance(changeData.newCategoryType, changeData.NewAccountAmount, changeData.newAmount)
				await apiClientAccount.PATCH(oldOperation.client_account.id, { amount: oldAmountAccount })
				console.log(oldAmountAccount, newAmountAccount, changeData)
				await Promise.all(
					changeOperation(filteredDataOldId, (op) => ({
						client_account: { ...op.client_account, amount: oldAmountAccount }
					}))
				)
				await Promise.all(
					changeOperation(filteredDataNewId, (op) => ({
						client_account: { ...op.client_account, amount: newAmountAccount }
					}))
				)

				await apiClientAccount.PATCH(newOperation.client_account.id, { amount: newAmountAccount })


				if (!isAmountChanged) newOperation.client_account.amount = newAmountAccount
			}
			if (isAmountChanged || isCategoryChanged) {

				let baseAmount

				if (isAccountChanged) {
					baseAmount = changeData.NewAccountAmount
				} else if (isCategoryChanged) {
					baseAmount = changeData.OldAccountAmount
				} else {
					baseAmount = calculateNewAccountBalance(!changeData.oldCategoryType, changeData.OldAccountAmount, changeData.oldAmount)
				}
				const newAmount = calculateNewAccountBalance(changeData.newCategoryType, baseAmount, changeData.newAmount)
				await apiClientAccount.PATCH(oldOperation.client_account.id, { amount: newAmount })
				newOperation.client_account.amount = newAmount

			}

			return newOperation
		} catch (e) {
			console.error("Failed to update account balances:", e)
			throw e

		}
	}
	const saveEdited = async id => {
		try {
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
			const newDataOperation = await handleOperationChanges(operation, newData)
			fetchData
				.PATCH(id, newDataOperation)
				.then(res => {
					if (res.error) throw new Error(data.error)
					changeOperation()
					setIsEdit({})
				})
				.catch(e => setError(e.message))
		} catch (e) {
			setError(e.message)
		}
	}

	const removeOperation = id => {

		fetchData
			.DELETE(id)
			.then(res => {
				if (res.error) throw new Error(res.error)
				changeAmountAccount(id)
				changeOperation()
			})
			.catch(e => {
				setError(e.message)
			})
	}
	useEffect(() => {
		const fetchData = async () => {
			const [category, client_account] = await Promise.all([
				apiCategory.GET(user),
				apiClientAccount.GET(user),
			])
			setSelectData({
				category,
				client_account,
			})
		}
		fetchData()
	}, [user])

	if (error) return <td>{error}</td>

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
												controls={controls}
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
