import { axiosApi } from '@/axiosApi'

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

interface UpdateBlogType {
  id: string
  update: BlogMutation
}

export const blogModule = {
  state: () => ({
    blogList: {
      blogs: [],
      count: 11,
      page: 1,
      perPage: 10,
      pages: 0
    },
    blogOne: null,
    isEdit: '',
    idBlogOne: '',
    loading: false,
    loadingOne: false,
    removeLoading: false,
    createAndEditLoading: false,
    listSearch: [],
    listSearchLoading: false
  }),
  getters: {
    getSearchList: (state) => async (value: string) => {
      try {
        state.listSearchLoading = true
        const response = await axiosApi.get(`/blogs/search?value=${value}`)
        return await response.data
      } finally {
        state.listSearchLoading = false
      }
    }
  },
  mutations: {
    setIdEdit(state, id) {
      state.isEdit = id
    },
    setPagination: (state, count) => {
      state.blogList.page = count
    }
  },
  actions: {
    async getListBlog({ state }) {
      try {
        const response = await axiosApi.get<BlogListType[]>(
          `/blogs?page=${state.blogList.page}&perPage=${state.blogList.perPage}`
        )
        state.blogList = await response.data
        state.loading = true
      } finally {
        state.loading = false
      }
    },
    async getBlogOne({ state }, id) {
      try {
        state.loadingOne = true
        const response = await axiosApi.get<BlogOneType>(`/blogs/${id}`)
        const jsn = (await response.data) as BlogOneType | null
        if (jsn !== null) {
          state.blogOne = jsn
        }
      } finally {
        state.loadingOne = false
      }
      return state.blogList.blogs.find((item) => item._id === id)
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
        await axiosApi.post('/blogs', formDate)
      } finally {
        state.createAndEditLoading = false
      }
    },
    async updateBlog({ state }, id: UpdateBlogType) {
      const formDate = new FormData()
      const keys = Object.keys(id.update) as (keyof BlogMutation)[]

      keys.forEach((item) => {
        const value = id.update[item] as string

        if (value !== '') {
          formDate.append(item, value)
        }
      })

      try {
        await axiosApi.put(`/blogs/${id.id}`, formDate)
        state.createAndEditLoading = true
      } finally {
        state.createAndEditLoading = false
      }
    },
    async removeBlog({ state }, id) {
      try {
        await axiosApi.delete(`/blogs/${id}`)
        state.removeLoading = true
      } finally {
        state.removeLoading = false
      }
    }
  },
  namespaced: true
}
