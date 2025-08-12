import styles from './category-list.module.css'
import { MdDelete } from 'react-icons/md'
import { CATEGORY_NAME, CATEGORY } from '../../../../constants/category'

export const CategoryList = ({ categories, handleDelete }) => {
	return categories.map(category => (
		<div key={category.id} className={styles.card}>
			<div>
				<h2 className={styles.cardTitle}>{category.name}</h2>
				<p className={styles.cardType}>{CATEGORY_NAME[category.type]}</p>
			</div>
			<MdDelete size={24} onClick={() => handleDelete(category.id)} />
			<div
				className={`${styles.typeIndicator} ${
					category.type === CATEGORY.INCOME ? styles.income : styles.expense
				}`}
			></div>
		</div>
	))
}
