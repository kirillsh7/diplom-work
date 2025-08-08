import { MdDelete } from 'react-icons/md'

export const ClientAccountTable = ({
	accounts,
	formatAmount,
	handleDeleteAccount,
}) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Название</th>
					<th>Тип</th>
					<th>Сумма</th>
					<th>Дата создания</th>
				</tr>
			</thead>
			<tbody>
				{accounts.map(account => (
					<tr key={account.id}>
						<td>{account.name}</td>
						<td>{account.type}</td>
						<td className={account.amount < 0 ? 'negative' : 'positive'}>
							{formatAmount(account.amount)}
						</td>
						<td
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							{account.date}
							<MdDelete onClick={() => handleDeleteAccount(account.id)} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
