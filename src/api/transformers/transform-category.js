export const transformCategory = dbCategory => ({
	id: dbCategory.id,
	name: dbCategory.name,
	type: dbCategory.type,
})
