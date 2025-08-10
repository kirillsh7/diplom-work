// export const EditableTableCell = ({
// 	isEdit,
// 	name,
// 	value,
// 	onChange,
// 	formatAmount,
// 	controls,
// 	selectData,
// }) => {
// 	return (
// 		<td>
// 			<div
// 				style={{
// 					display: 'flex',
// 					justifyContent: `${controls ? 'space-between' : ''}`,
// 				}}
// 			>
// 				{isEdit ? (
// 					selectData ? (
// 						<select name={name} value={value} onChange={onChange}>
// 							{selectData.map(item => (
// 								<option key={item.id} value={item.id}>
// 									{item.name}
// 								</option>
// 							))}
// 						</select>
// 					) : (
// 						<input name={name} value={value} onChange={onChange} />
// 					)
// 				) : formatAmount ? (
// 					formatAmount(value)
// 				) : (
// 					value
// 				)}
// 				{controls}
// 			</div>
// 		</td>
// 	)
// }
export const EditableTableCell = ({
	isEdit,
	name,
	value,
	onChange,
	formatAmount,
	controls,
	selectData,
}) => {
	return (
		<td style={{ padding: '8px', minWidth: '100px' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: `${controls ? 'space-between' : 'flex-start'}`,
					alignItems: 'center',
					minHeight: '32px',
				}}
			>
				{isEdit ? (
					selectData ? (
						<select
							name={name}
							value={value}
							onChange={onChange}
							style={{
								width: '100%',
								padding: '4px',
								boxSizing: 'border-box',
								height: '32px',
							}}
						>
							{selectData.map(item => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</select>
					) : (
						<input
							name={name}
							value={value}
							onChange={onChange}
							style={{
								width: '100%',
								padding: '4px',
								boxSizing: 'border-box',
								height: '32px',
							}}
						/>
					)
				) : formatAmount ? (
					<div style={{ width: '100%' }}>{formatAmount(value)}</div>
				) : (
					<div style={{ width: '100%' }}>{value}</div>
				)}
				{controls}
			</div>
		</td>
	)
}
