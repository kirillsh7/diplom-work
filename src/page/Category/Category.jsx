import styles from './category.module.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getCategories,
	deleteCategories,
	postCategories,
} from '../../store/middleware/category/categoryMiddleware'
import {
	categoriesItemsSelector,
	categoriesLoadingSelector,
	userSelector,
} from '../../store/selectors'
import { CategoryError, CategoryForm, CategoryList } from './components'
import { Modal } from '@components'
export const Category = () => {
	const dispatch = useDispatch()
	const user = useSelector(userSelector)
	const categories = useSelector(categoriesItemsSelector)
	const categoriesLoading = useSelector(categoriesLoadingSelector)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		dispatch(getCategories(user))
	}, [])

	const handleDelete = id => {
		dispatch(deleteCategories(id))
	}
	const handleCreate = data => {
		dispatch(postCategories(data))
		setIsModalOpen(false)
	}
	if (categoriesLoading) {
		return <div> Загрузка...</div>
	}
	return (
		<>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<CategoryForm handleCreate={handleCreate} />
			</Modal>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.title}>Мои категории</h1>
					<button
						type='button'
						className={styles.createCategory}
						onClick={() => setIsModalOpen(true)}
					>
						Создать категорию
					</button>
				</div>
				<CategoryError />
				{categories.length === 0 ? (
					<div className={styles.empty}>Категории не найдены</div>
				) : (
					<div className={styles.grid}>
						<CategoryList categories={categories} handleDelete={handleDelete} />
					</div>
				)}
			</div>
		</>
	)
}
