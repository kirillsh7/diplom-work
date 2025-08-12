import { useState, useEffect } from 'react'
import { Pagination } from '@components'
import { TableHeader, TableBody } from './components'
import { paginateData } from '@utils'
export const Table = ({ ...props }) => {
	const { heading, operations } = props
	const [data, setData] = useState([])
	const [paginationPage, setPaginationPage] = useState(1)
	const [totalPages, setTotalPages] = useState([])
	const limitPage = 5

	const changePaginationPage = page => setPaginationPage(page)
	const changeOperation = newData => {
		setData(newData)
	}
	useEffect(() => {
		const [paginatedData, pageNumbers] = paginateData(operations, limitPage)
		setData(paginatedData[paginationPage])
		setTotalPages(pageNumbers)
	}, [paginationPage, operations])

	return (
		<>
			<table>
				<TableHeader heading={heading} />
				<TableBody data={data} changeOperation={changeOperation} {...props} />
			</table>
			<Pagination
				totalPages={totalPages}
				changePage={changePaginationPage}
				page={paginationPage}
			/>
		</>
	)
}
