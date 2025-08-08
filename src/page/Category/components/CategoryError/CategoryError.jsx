import { useDispatch, useSelector } from 'react-redux'
import { clearCategoryError } from '@store/Slice/category/categorySlise'
import { categoriesErrorSelector } from '@store/selectors'
import styles from './category-error.module.css'
export const CategoryError = ({}) => {
	const dispatch = useDispatch()
	const categoriesError = useSelector(categoriesErrorSelector)

	return (
		categoriesError && (
			<div className={styles.errorNotification}>
				<div className={styles.errorContent}>
					<span>{categoriesError}</span>
					<button
						className={styles.closeButton}
						onClick={() => dispatch(clearCategoryError())}
					>
						&times;
					</button>
				</div>
			</div>
		)
	)
}
