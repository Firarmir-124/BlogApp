import axios, { AxiosHeaders } from 'axios'

export const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const headers = config.headers as AxiosHeaders
  headers.set('Authorization', token)

  return config
})

axiosApi.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`http://localhost:8000/auth/refresh`, {
          withCredentials: true
        })
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return axiosApi.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН' + e)
      }
    }
    throw error
  }
)

export default axiosApi
