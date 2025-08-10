export const transformOperation = dbOperations => {
	return {
		name: dbOperations.name,
		amount: dbOperations.amount,
		date: dbOperations.created_date,
		comment: dbOperations.comment,
		category: dbOperations.category,
		id: dbOperations.id,
		account: dbOperations.client_account,
	}
}
