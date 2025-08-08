export const ClientAccountForm = ({
	newAccount,
	handleInputChange,
	handleSubmit,
}) => {
	return (
		<form className='add-account-form' onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Название счета:</label>
				<input
					type='text'
					name='name'
					value={newAccount.name}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='form-group'>
				<label>Тип счета:</label>
				<input
					type='text'
					name='type'
					value={newAccount.type}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='form-group'>
				<label>Сумма:</label>
				<input
					type='number'
					name='amount'
					value={newAccount.amount}
					onChange={handleInputChange}
					required
				/>
			</div>

			<button type='submit' className='submit'>
				Добавить
			</button>
		</form>
	)
}
