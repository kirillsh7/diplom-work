import { CATEGORY } from '@constants'
export const calculateNewAccountBalance = (categoryType, currentBalance, operationAmount) => {
	return categoryType === CATEGORY.INCOME
		? Number(currentBalance) + Number(operationAmount)
		: Number(currentBalance) - Number(operationAmount)
}
