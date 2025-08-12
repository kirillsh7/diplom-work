export const generateDate = () =>
	new Date(Math.random() * 1000000000000 + 1999999999999)
		.toISOString()
		.split('T')[0]
		.replaceAll('-', '.')
