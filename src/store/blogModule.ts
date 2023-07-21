export const blogModule = {
  state: () => ({
    blogList: [],
    blogId: null
  }),
  getters: {
    getBlogOne: (state) => (id) => {
      return state.blogList.find((item) => item.id === id)
    }
  },
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
