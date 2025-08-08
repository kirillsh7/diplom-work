export const OperationList = ({ heading, operations }) => {
	return (
		<table>
			<thead>
				<tr>
					{heading.map((item, index) => (
						<th key={index}>{item}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{operations.map(operation => (
					<tr key={operation.id}>
						<td>{operation.amount}</td>
						<td>{operation.category}</td>
						<td>{operation.account}</td>
						<td>{operation.comment}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
