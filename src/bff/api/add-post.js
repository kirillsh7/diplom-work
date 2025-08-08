import { generateDate } from '../utils'

export const addPost = ({ imageUrlValue, titleValue, content }) => {
	return fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			image_url: imageUrlValue,
			published_at: generateDate(),
			title: titleValue,
			content,
		})

	}).then((createdPost) => createdPost.json())
}