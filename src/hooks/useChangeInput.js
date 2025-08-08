export const useChangeInput =
	setValue =>
	({ target }) =>
		setValue(prev => ({
			...prev,
			[target.name]: target.value,
		}))
