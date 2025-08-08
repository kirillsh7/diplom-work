export const transformPost = (dbPost) => {
	if (dbPost.data) {
		return {
			data: dbPost.data.map(
				({ id, title, content, image_url, published_at }) =>
				(
					{
						id: id,
						title: title,
						content: content,
						imageUrl: image_url,
						publishedAt: published_at,
					}
				)
			),

			pagination: {
				first: dbPost.first,
				prev: dbPost.prev,
				next: dbPost.next,
				last: dbPost.last,
			}
		}
	} else {
		return {
			id: dbPost.id,
			title: dbPost.title,
			content: dbPost.content,
			imageUrl: dbPost.image_url,
			publishedAt: dbPost.published_at,
		}
	}
}
