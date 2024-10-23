import axios from 'axios'
import { apiHost } from '../config/apiPath'
import { getToken } from '../utils/authentication/authentication'

export const apiClient = axios.create({
  baseURL: apiHost
})

apiClient.interceptors.request.use(
  (config) => {
    // Use the getToken function to retrieve the token
    const token = getToken()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
