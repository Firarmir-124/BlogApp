import { createStore } from 'vuex'
import { blogModule } from '@/store/blogModule'

export default createStore({
  modules: {
    blog: blogModule
  }
})
