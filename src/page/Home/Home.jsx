// export const Home = () => {
// 	return (<main>
// 		Главная
// 	</main>

// 	)
// }

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export const Home = () => {
	// Состояния для данных
	const [incomes, setIncomes] = useState([])
	const [expenses, setExpenses] = useState([])
	const [accounts, setAccounts] = useState([])
	const [chartData, setChartData] = useState({})

	// Загрузка данных (в реальном приложении здесь был бы запрос к API)
	useEffect(() => {
		// Моковые данные для демонстрации
		const mockIncomes = [
			{
				id: 1,
				amount: 50000,
				category: 'Зарплата',
				date: '2023-05-01',
				description: 'Зарплата за апрель',
			},
			{
				id: 2,
				amount: 15000,
				category: 'Фриланс',
				date: '2023-05-05',
				description: 'Разработка сайта',
			},
		]

		const mockExpenses = [
			{
				id: 1,
				amount: 15000,
				category: 'Продукты',
				date: '2023-05-02',
				description: 'Покупки в Пятерочке',
			},
			{
				id: 2,
				amount: 5000,
				category: 'Транспорт',
				date: '2023-05-03',
				description: 'Такси в аэропорт',
			},
			{
				id: 3,
				amount: 12000,
				category: 'Развлечения',
				date: '2023-05-07',
				description: 'Ресторан',
			},
		]

		const mockAccounts = [
			{ id: 1, name: 'Сбербанк', balance: 125000, currency: 'RUB' },
			{ id: 2, name: 'Тинькофф', balance: 45000, currency: 'RUB' },
			{ id: 3, name: 'Наличные', balance: 15000, currency: 'RUB' },
		]

		setIncomes(mockIncomes)
		setExpenses(mockExpenses)
		setAccounts(mockAccounts)

		// Подготовка данных для графика
		prepareChartData(mockIncomes, mockExpenses)
	}, [])

	// Подготовка данных для графика
	const prepareChartData = (incomesData, expensesData) => {
		// Группируем доходы и расходы по дням
		const incomeByDay = {}
		const expenseByDay = {}

		incomesData.forEach(income => {
			const day = income.date
			incomeByDay[day] = (incomeByDay[day] || 0) + income.amount
		})

		expensesData.forEach(expense => {
			const day = expense.date
			expenseByDay[day] = (expenseByDay[day] || 0) + expense.amount
		})

		// Получаем все уникальные даты
		const allDays = Array.from(
			new Set([...Object.keys(incomeByDay), ...Object.keys(expenseByDay)])
		).sort()

		// Формируем данные для графика
		const data = {
			labels: allDays,
			datasets: [
				{
					label: 'Доходы',
					data: allDays.map(day => incomeByDay[day] || 0),
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgba(75, 192, 192, 0.5)',
					tension: 0.1,
				},
				{
					label: 'Расходы',
					data: allDays.map(day => expenseByDay[day] || 0),
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					tension: 0.1,
				},
			],
		}

		setChartData(data)
	}

	// Рассчитываем общий баланс
	const totalBalance = accounts.reduce(
		(sum, account) => sum + account.balance,
		0
	)

	return (
		<div className='container mx-auto px-4 py-8'>
			<header className='flex justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold'>Главная</h1>
				<div className='flex items-center space-x-4'>
					<span className='text-lg'>Username</span>
					<div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center'>
						<span className='text-gray-600'>U</span>
					</div>
				</div>
			</header>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
				{/* Карточка общего баланса */}
				<div className='bg-white rounded-lg shadow p-6'>
					<h3 className='text-lg font-semibold text-gray-700 mb-2'>
						Общий баланс
					</h3>
					<p className='text-2xl font-bold'>
						{totalBalance.toLocaleString()} ₽
					</p>
				</div>

				{/* Карточка доходов */}
				<div className='bg-white rounded-lg shadow p-6'>
					<h3 className='text-lg font-semibold text-gray-700 mb-2'>Доходы</h3>
					<p className='text-2xl font-bold text-green-500'>
						{incomes
							.reduce((sum, income) => sum + income.amount, 0)
							.toLocaleString()}{' '}
						₽
					</p>
				</div>

				{/* Карточка расходов */}
				<div className='bg-white rounded-lg shadow p-6'>
					<h3 className='text-lg font-semibold text-gray-700 mb-2'>Расходы</h3>
					<p className='text-2xl font-bold text-red-500'>
						{expenses
							.reduce((sum, expense) => sum + expense.amount, 0)
							.toLocaleString()}{' '}
						₽
					</p>
				</div>
			</div>

			{/* График доходов и расходов */}
			<div className='bg-white rounded-lg shadow p-6 mb-8'>
				<h2 className='text-xl font-semibold mb-4'>
					Динамика доходов и расходов
				</h2>
				<div className='h-80'>
					{chartData.labels && (
						<Line
							data={chartData}
							options={{ responsive: true, maintainAspectRatio: false }}
						/>
					)}
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* Список последних доходов */}
				<div className='bg-white rounded-lg shadow p-6'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-semibold'>Последние доходы</h2>
						<button className='text-blue-500 hover:text-blue-700'>Все</button>
					</div>
					<ul className='space-y-3'>
						{incomes.slice(0, 5).map(income => (
							<li key={income.id} className='border-b pb-2'>
								<div className='flex justify-between'>
									<span className='font-medium'>{income.category}</span>
									<span className='text-green-500'>
										+{income.amount.toLocaleString()} ₽
									</span>
								</div>
								<p className='text-sm text-gray-500'>
									{income.date} • {income.description}
								</p>
							</li>
						))}
					</ul>
				</div>

				{/* Список последних расходов */}
				<div className='bg-white rounded-lg shadow p-6'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-semibold'>Последние расходы</h2>
						<button className='text-blue-500 hover:text-blue-700'>Все</button>
					</div>
					<ul className='space-y-3'>
						{expenses.slice(0, 5).map(expense => (
							<li key={expense.id} className='border-b pb-2'>
								<div className='flex justify-between'>
									<span className='font-medium'>{expense.category}</span>
									<span className='text-red-500'>
										-{expense.amount.toLocaleString()} ₽
									</span>
								</div>
								<p className='text-sm text-gray-500'>
									{expense.date} • {expense.description}
								</p>
							</li>
						))}
					</ul>
				</div>

				{/* Список счетов */}
				<div className='bg-white rounded-lg shadow p-6'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-semibold'>Мои счета</h2>
						<button className='text-blue-500 hover:text-blue-700'>Все</button>
					</div>
					<ul className='space-y-3'>
						{accounts.map(account => (
							<li key={account.id} className='border-b pb-2'>
								<div className='flex justify-between'>
									<span className='font-medium'>{account.name}</span>
									<span>
										{account.balance.toLocaleString()} {account.currency}
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
