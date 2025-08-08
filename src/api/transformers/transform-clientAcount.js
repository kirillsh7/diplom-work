export const transformClientAcount = dbClientAcount => {
	return {
		id: dbClientAcount.id,
		name: dbClientAcount.name,
		type: dbClientAcount.type,
		amount: dbClientAcount.amount,
		date: dbClientAcount.created_date,
	}
}
