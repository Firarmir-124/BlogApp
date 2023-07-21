export const blogModule = {
  state: () => ({
    blogList: []
  }),
  getters: {},
  mutations: {
    addBlog(state, blog) {
      state.blogList.push(blog)
    }
  },
  actions: {},
  namespaced: true
}
