import { getSession, deleteSession, addSession } from './api'
export const sessions = {
  create(user) {
    const hash = Math.random().toFixed(50)
    addSession(hash, user)
    return hash
  },

  async remove(hash) {
    const session = await getSession(hash)
    if (!session) return
    deleteSession(session.id)
  },
  async access(hash, accessRoles) {
    const session = await getSession(hash)

    return !!session?.user && accessRoles.includes(session.user.roleId)

  }
}
