import { transformUser } from '../transformers'
export const getUser = async (loginToFind) =>
  fetch(`http://localhost:3005/users?login=${loginToFind}`)
    .then((loadedUser) => {
      if (!loadedUser.ok) throw new Error(loadedUser.statusText)
      return loadedUser.json()
    })
    .then(([loadedUser]) => loadedUser && transformUser(loadedUser))
    .catch((e) => ({ error: e }))

