export const TableHeader = ({ heading }) => {
	return (
		<thead>
			<tr>
				{heading.map(({ name }, index) => (
					<th
						key={index}
						style={{
							padding: '12px 8px',
							textAlign: 'left',
							borderBottom: '1px solid #ddd',
						}}
					>
						{name}
					</th>
				))}
			</tr>
		</thead>
	)
}
