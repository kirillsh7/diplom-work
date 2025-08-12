export const EditableTableCell = ({
	isEdit,
	name,
	value,
	onChange,
	formatAmount,
	controls,
	selectData,
}) => {
	const currentValue = typeof value === 'object' ? value.name : value
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
							value={currentValue}
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
							value={currentValue}
							onChange={onChange}
							style={{
								width: '100%',
								padding: '4px',
								boxSizing: 'border-box',
								height: '32px',
							}}
						/>
					)
				) : typeof value === 'number' ? (
					<div style={{ width: '100%' }}>{formatAmount(currentValue)}</div>
				) : (
					<div style={{ width: '100%' }}>{currentValue}</div>
				)}
				{controls}
			</div>
		</td>
	)
}
