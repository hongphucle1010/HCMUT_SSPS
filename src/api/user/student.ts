import { apiClient } from '..'
import {
  getLogInTimesPath,
  getLogInTimesTodayPath,
  getLogInTimesYesterdayPath,
  studentPagePath,
  studentPath
} from '../../config/apiPath'

export async function getStudentApi(studentId: string) {
  try {
    const response = await apiClient.get<StudentInfo>(`${studentPath}/${studentId}`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateStudentPageBalanceApi(studentId: string, balance: number) {
  try {
    const response = await apiClient.put<{ printBalance: number }>(studentPagePath, {
      id: studentId,
      printBalance: balance
    })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getLogInTimesApi() {
  try {
    const response = await apiClient.get(getLogInTimesPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getLogInTimesTodayApi() {
  try {
    const response = await apiClient.get(getLogInTimesTodayPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getLogInTimesYesterdayApi() {
  try {
    const response = await apiClient.get(getLogInTimesYesterdayPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
