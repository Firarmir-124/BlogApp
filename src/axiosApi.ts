import axios from 'axios'

export const axiosApi = axios.create({
  url: 'http://localhost:8000'
})
