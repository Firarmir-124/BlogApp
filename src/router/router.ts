import Home from '@/page/Home.vue'
import CreateBlog from '@/page/CreateBlog.vue'
import BlogOne from '@/page/BlogOne.vue'
import EditBlog from '@/page/EditBlog.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/create-blog',
      name: 'CreateBlog',
      component: CreateBlog
    },
    {
      path: '/blog-one/:id',
      name: 'BlogOne',
      component: BlogOne
    },
    {
      path: '/edit-blog/:id',
      name: 'EditBlog',
      component: EditBlog
    }
  ]
})

export default router
