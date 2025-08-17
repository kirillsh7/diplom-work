export const sortedDataFunc = (data, sortBy) => [...data].sort((a, b) => {
	const valueA = a[sortBy.key]
	const valueB = b[sortBy.key]
	if (typeof valueA === 'string' && typeof valueB === 'string') {
		return sortBy.order === 'asc'
			? valueA.localeCompare(valueB)
			: valueB.localeCompare(valueA)
	} else if (typeof valueA === 'object' && typeof valueB === 'object') {
		return sortBy.order === 'asc'
			? valueA.name.localeCompare(valueB.name)
			: valueB.name.localeCompare(valueA.name)
	}

	return sortBy.order === 'asc' ? valueA - valueB : valueB - valueA
})