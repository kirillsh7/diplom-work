import { CATEGORY_NAME } from '../../constants/category'

export const transformCategory = dbCategory => ({
	id: dbCategory.id,
	name: dbCategory.name,
	type: CATEGORY_NAME[dbCategory.type],
})
