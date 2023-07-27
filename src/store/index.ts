import { createStore } from 'vuex'
import { blogModule } from '@/store/blog/blogModule'

export default createStore({
  modules: {
    blog: blogModule
  }
})
