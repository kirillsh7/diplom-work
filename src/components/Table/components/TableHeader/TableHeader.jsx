import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
export const TableHeader = ({ heading, handleSort, sortBy }) => {
	return (
		<thead>
			<tr>
				{heading.map(({ name, key }, index) => (
					<th
						key={index}
						style={{
							padding: '12px 8px',
							textAlign: 'left',
							borderBottom: '1px solid #ddd',
						}}
						onClick={() => handleSort(key)}
					>
						{name}
						{
							sortBy.key === key
								? sortBy.order === 'asc'
									? <AiFillCaretUp />
									: <AiFillCaretDown />
								: null
						}
					</th>
				))}
			</tr>
		</thead>
	)
}
