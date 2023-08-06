export const saveToken = (state: any, jsn) => {
  state.user = jsn.user
  state.token = jsn.accessToken

  localStorage.setItem('token', state.token)
  localStorage.setItem('user', JSON.stringify(state.user))
}
