import styled from './pagination.module.css'
export const Pagination = ({ totalPages, changePage, page }) => {
	if (totalPages.length < 2) return
	return (
		<nav className={styled.pagination}>
			<ul className={styled.paginationList}>
				{totalPages.map(item => (
					<li key={item} className={styled.paginationItem}>
						<button
							onClick={() => {
								if (item === page) return
								changePage(item)
							}}
							className={`${styled.paginationLink} ${
								page === item ? styled.active : ''
							}`}
						>
							{item}
						</button>
					</li>
				))}
			</ul>
		</nav>
	)
}
