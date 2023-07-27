import Module from 'vuex'
import axios from 'axios'

export interface BlogListType {
  _id: string
  name: string
  content: string
  user: string
  image: string | null
  createAt: string
}

export interface BlogOneType {
  _id: string
  name: string
  content: string
  user: string
  image: string | null
  createAt: string
}

export interface BlogMutation {
  name: string
  content: string
  user: string
  image: string | null
}

export interface BlogModuleType {
  blogList: BlogListType[]
  blogOne: BlogOneType | null
  isEdit: string
  idBlogOne: string
  loading: boolean
  loadingOne: boolean
  removeLoading: boolean
  createLoading: boolean
}

export const blogModule: Module<BlogModuleType, any> = {
  state: () => ({
    blogList: [],
    blogOne: null,
    isEdit: '',
    idBlogOne: '',
    loading: false,
    loadingOne: false,
    removeLoading: false,
    createAndEditLoading: false
  }),
  getters: {},
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
  actions: {
    async getBlogOne({ state }, id) {
      try {
        state.loadingOne = true
        const response = await axios.get<BlogOneType>(`http://localhost:8000/blogs/${id}`)
        const jsn = (await response.data) as BlogOneType | null
        if (jsn !== null) {
          state.blogOne = jsn
        }
      } finally {
        state.loadingOne = false
      }
      return state.blogList.find((item) => item._id === id)
    },
    async getListBlog({ state }) {
      try {
        const response = await axios.get<BlogListType[]>('http://localhost:8000/blogs')
        state.blogList = await response.data
        state.loading = true
      } finally {
        state.loading = false
      }
    },
    async createBlog({ state }, blogMutation) {
      const formDate = new FormData()
      const keys = Object.keys(blogMutation) as (keyof BlogMutation)[]

      keys.forEach((id) => {
        const value = blogMutation[id] as string

        if (value !== '') {
          formDate.append(id, value)
        }
      })

      try {
        state.createAndEditLoading = true
        await axios.post('http://localhost:8000/blogs', formDate)
      } finally {
        state.createAndEditLoading = false
      }
    },
    async removeBlog({ state }, id) {
      try {
        await axios.delete(`http://localhost:8000/blogs/${id}`)
        state.removeLoading = true
      } finally {
        state.removeLoading = false
      }
    }
  },
  namespaced: true
}
