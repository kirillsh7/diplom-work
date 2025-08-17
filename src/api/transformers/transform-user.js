export const transformUser = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	registeredAt: dbUser.registered_at,
})