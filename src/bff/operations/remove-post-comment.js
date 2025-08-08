import { ROLE } from '../../constants'
import { deleteComment, getPost, getComments, getUsers } from '../api'
import { sessions } from '../sessions'
import { getPostCommentsWithAuthor } from '../utils'
export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]
	const access = await sessions.access(hash, accessRoles)
	if (!access) {
		return {
			error: 'Доступ Запрещен',
			res: null,
		}
	}
	await deleteComment(id)

	const post = await getPost(postId)

	const commentsWithAuthor = getPostCommentsWithAuthor(postId)

	return {
		error: null,
		res: { ...post, comments: commentsWithAuthor },
	}
}