export const generateDate = () =>
	new Date(Math.random() * 1000000000000 + 1999999999999)
		.toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
		.replace('г.', 'года')
