import { ROLE } from '../../constants'
import { deleteComment, deletePost, getComments } from '../api'
import { sessions } from '../sessions'
export const removePost = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN]
	const access = await sessions.access(hash, accessRoles)
	if (!access) {
		return {
			error: 'Доступ Запрещен',
			res: null,
		}
	}
	await deletePost(id)
	const comments = await getComments(id)

	await Promise.all(comments.map(({ id }) => deleteComment(id)))


	return {
		error: null,
		res: true,
	}
}