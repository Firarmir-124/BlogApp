import axiosApi from '@/axiosApi'
import { isAxiosError } from 'axios'
import router from '@/router/router'
import { saveToken } from '@/dtos'

export interface User {
  _id: string
  email: string
  role: string
}

export interface authResponse {
  accessToken: string
  refreshToken: string
  user: User | null
}

export interface ValidationError {
  anotherError: string
  error: string
  field: string
}

export interface AuthModuleType {
  token: string
  user: User | null
  registerLoading: boolean
  errorAuth: null | ValidationError[]
  logoutLoading: boolean
  loginLoading: boolean
}

export const authModule = {
  state: (): AuthModuleType => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    registerLoading: false,
    errorAuth: null,
    logoutLoading: false,
    loginLoading: false
  }),
  getters: {},
  mutations: {},
  actions: {
    async register({ state }, registerMutation) {
      try {
        state.registerLoading = true
        const response = await axiosApi.post<authResponse>('/auth', registerMutation)
        const jsn = await response.data
        await router.push('/')
        saveToken(state, jsn)
        state.errorAuth = null
      } catch (e) {
        state.registerLoading = false
        if (isAxiosError(e) && e.response && e.response.status === 400) {
          state.errorAuth = (e.response.data as ValidationError[] | any) || null
        }
      } finally {
        state.registerLoading = false
      }
    },
    async login({ state }, loginMutation) {
      try {
        state.loginLoading = true
        const response = await axiosApi.post<authResponse>('/auth/login', loginMutation)
        const jsn = await response.data
        await router.push('/')

        saveToken(state, jsn)

        state.errorAuth = null
      } catch (e) {
        state.loginLoading = false
        if (isAxiosError(e) && e.response && e.response.status === 400) {
          state.errorAuth = (e.response.data as ValidationError[] | any) || null
        }
      } finally {
        state.loginLoading = false
      }
    },
    async logout({ state }) {
      try {
        state.logoutLoading = true
        await axiosApi.post('/auth/logout')
        await router.push('/')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        state.user = null
        state.token = ''
      } catch (e) {
        state.logoutLoading = false
        if ((isAxiosError(e) && e.response && e.response.status === 400) || 500) {
          state.errorAuth = e.response.data
        }
      } finally {
        state.logoutLoading = false
      }
    }
  },
  namespaced: true
}
