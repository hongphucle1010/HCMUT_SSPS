import { apiClient } from '..'
import { configurationPath, getTypesPath } from '../../config/apiPath'

export async function getConfigurationsApi() {
  try {
    const response = await apiClient.get<Configurations>(configurationPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateConfigurationsApi(configurations: ConfigUpdateParams) {
  try {
    console.log(configurations)
    const response = await apiClient.put<Configurations>(configurationPath, configurations)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateFileTypesApi(fileTypes: FileTypeUpdateParams[]) {
  try {
    const response = await apiClient.put<Configurations>(configurationPath, fileTypes)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getFileTypesApi() {
  try {
    const response = await apiClient.get<string[]>(getTypesPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
