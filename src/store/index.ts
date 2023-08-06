import { createStore } from 'vuex'
import { blogModule } from '@/store/blog/blogModule'
import { authModule } from '@/store/auth/authModule'

export default createStore({
  modules: {
    blog: blogModule,
    auth: authModule
  }
})
