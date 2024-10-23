import { apiClient } from '..'
import { studentPagePath, studentPath } from '../../config/apiPath'

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
