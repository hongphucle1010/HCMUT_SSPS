import { apiClient } from '..'
import { allLocationPath, locationPath } from '../../config/apiPath'

export async function addLocationApi(location: LocationCreateParams) {
  try {
    const response = await apiClient.post<Location>(locationPath, location)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getLocationApi(locationId: string) {
  try {
    const response = await apiClient.get<Location>(`${locationPath}?id=${locationId}`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getAllLocationsApi() {
  try {
    const response = await apiClient.get<Location[]>(allLocationPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
