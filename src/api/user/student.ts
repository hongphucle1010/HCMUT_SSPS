import { apiClient } from '..'
import { studentPath } from '../../config/apiPath'

export async function getStudentApi(studentId: string) {
  try {
    const response = await apiClient.get<StudentInfo>(`${studentPath}/${studentId}`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
