export const blogModule = {
  state: () => ({
    blogList: []
  }),
  getters: {},
  mutations: {
    addBlog(state, blog) {
      state.blogList.push(blog)
    },
    removeBlog(state, id) {
      const index = state.blogList.findIndex((item) => item.id === id)
      state.blogList.splice(index, 1)
    }
  },
  actions: {},
  namespaced: true
}
