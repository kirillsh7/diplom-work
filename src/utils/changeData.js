export const changeData = (data, id, newData) =>
	data.map(el => {
		if (el.id === id) {
			return newData
		}
		return el
	})
