import { getStatusPath, logInPath, signUpPath, spsoLogInPath, spsoSignUpPath } from '../../config/apiPath'
import { apiClient } from '..'
import { LogInResponse, SignUpResponse, SpsoLogInResponse, SpsoSignUpResponse, StatusResponse } from './types'

export async function logInApi(username: string, password: string) {
  try {
    const response = await apiClient.post<LogInResponse>(logInPath, {
      username,
      password
    })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function signUpApi(username: string, password: string, name: string) {
  try {
    const response = await apiClient.post<SignUpResponse>(signUpPath, {
      name,
      username,
      password
    })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function spsoLogInApi(email: string, password: string) {
  try {
    const response = await apiClient.post<SpsoLogInResponse>(spsoLogInPath, {
      email,
      password
    })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function spsoSignUpApi(email: string, password: string, name: string) {
  try {
    const response = await apiClient.post<SpsoSignUpResponse>(spsoSignUpPath, {
      name,
      email,
      password
    })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getStatusApi() {
  try {
    const response = await apiClient.get<StatusResponse>(getStatusPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
