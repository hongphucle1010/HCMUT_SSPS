import { Dispatch } from 'redux'
import { getStatusApi, logInApi, signUpApi } from '../../api/authentication/authentication'
import { logInReducer, logOutReducer } from '../../lib/redux/reducers/userState'
import { AxiosError } from 'axios'
import { HttpErrorResponse } from '../../lib/types/error'

export function setToken(token: string) {
  console.log('Set token: ', token)
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export async function logIn(username: string, password: string, dispatch: Dispatch) {
  const response = await logInApi(username, password)
  setToken(response.data.token)
  dispatch(logInReducer({
    id: response.data.student.id,
    name: response.data.student.name,
    role: "STUDENT"
  }))
}

export function logOut(dispatch: Dispatch) {
  localStorage.removeItem('token')
  dispatch(logOutReducer())
}
export async function signUp(username: string, password: string, name: string) {
  try {
    const response = await signUpApi(username, password, name)
    return response
  } catch (error) {
    const typedError = error as AxiosError<HttpErrorResponse>
    if (typedError.isAxiosError) {
      throw typedError.response
    } else throw error
  }
}

export async function initStatus(dispatch: Dispatch) {
  try {
    const response = await getStatusApi()
    if (!response?.data.user) {
      logOut(dispatch)
    }
    return response
  } catch (error) {
    const typedError = error as AxiosError<HttpErrorResponse>
    if (typedError.isAxiosError) {
      throw typedError.response
    } else throw error
  }
}