export const paginateData = (data, itemsPerPage) => {
	const paginatedData = {}
	const totalPages = Math.ceil(data.length / itemsPerPage)
	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1
	)

	pageNumbers.forEach((pageNumber, index) => {
		const startIndex = index * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		paginatedData[pageNumber] = data.slice(startIndex, endIndex)
	})

	return [paginatedData, pageNumbers]
}
