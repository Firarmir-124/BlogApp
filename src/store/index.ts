import { createStore } from 'vuex'
import { blogModule } from '@/store/blogModule'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    blog: blogModule
  },
  plugins: [
    createPersistedState({
      key: 'blog',
      patch: 'blog.blogList',
      storage: window.localStorage
    })
  ]
})
