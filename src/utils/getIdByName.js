export const getIdByName = (array, name) =>
	array.find(item => item.name === name)?.id
