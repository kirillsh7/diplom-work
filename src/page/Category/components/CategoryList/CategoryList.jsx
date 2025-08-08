import styles from './category-list.module.css'
import { MdDelete } from 'react-icons/md'
export const CategoryList = ({ categories, handleDelete }) => {
	return categories.map(category => (
		<div key={category.id} className={styles.card}>
			<div>
				<h2 className={styles.cardTitle}>{category.name}</h2>
				<p className={styles.cardType}>{category.type}</p>
			</div>
			<MdDelete size={24} onClick={() => handleDelete(category.id)} />
			<div
				className={`${styles.typeIndicator} ${
					category.type === 'Доходы' ? styles.income : styles.expense
				}`}
			></div>
		</div>
	))
}
