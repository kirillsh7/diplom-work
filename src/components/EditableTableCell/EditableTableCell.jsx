export const EditableTableCell = ({
	isEdit,
	name,
	value,
	onChange,
	formatAmount,
	controls,
	selectData,
}) => {
	const currentValueName = typeof value === 'object' ? value.name : value

	const isNumber = !isNaN(value) && isFinite(value) && value !== ''
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
							value={currentValueName}
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
							value={currentValueName}
							onChange={onChange}
							style={{
								width: '100%',
								padding: '4px',
								boxSizing: 'border-box',
								height: '32px',
							}}
						/>
					)
				) : isNumber ? (
					<div style={{ width: '100%' }}>
						<p>{formatAmount(currentValueName)}</p>
					</div>
				) : (
					<div style={{ width: '100%' }}>{currentValueName}</div>
				)}
				{controls}
			</div>
		</td>
	)
}
