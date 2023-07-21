export const blogModule = {
  state: () => ({
    blogList: [],
    isEdit: '',
    idBlogOne: ''
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
    setIdEdit(state, id) {
      state.isEdit = id
    },
    setIdBlogOne: (state, id) => {
      state.idBlogOne = id
    },
    editBlog: (state, blog) => {
      const index = state.blogList.findIndex((item) => item.id === state.idBlogOne)
      state.blogList[index] = blog
    },
    removeBlog(state, id) {
      const index = state.blogList.findIndex((item) => item.id === id)
      state.blogList.splice(index, 1)
    }
  },
  actions: {},
  namespaced: true
}
