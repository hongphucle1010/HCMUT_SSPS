import { Dispatch } from 'redux'
import { logInReducer, logOutReducer } from '../../lib/redux/reducers/userState'
import { Role } from '../../lib/redux/reducers/types'

async function fakeLogInApi(username: string, password: string) {
  let success = false
  let role: Role = 'GUEST'
  let name = ''

  if (username == 'admin' && password == 'admin') {
    success = true
    role = 'ADMIN'
    name = 'SPSO'
  }
  if (username == 'student' && password == 'student') {
    success = true
    role = 'STUDENT'
    name = 'TN01-03'
  }
  return { success, role, name }
}

export async function logIn(username: string, password: string, dispatch: Dispatch) {
  const { success, role, name } = await fakeLogInApi(username, password)
  if (success) {
    dispatch(
      logInReducer({
        name: name,
        role: role
      })
    )
    return true
  }
  return false
}

export function logOut(dispatch: Dispatch) {
  dispatch(logOutReducer())
}
