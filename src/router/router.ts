import Home from '@/page/Home.vue'
import CreateBlog from '@/page/CreateBlog.vue'
import BlogOne from '@/page/BlogOne.vue'
import EditBlog from '@/page/EditBlog.vue'
import Login from '@/page/Login.vue'
import Register from '@/page/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'

const protectorRouterAdmin = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.role !== 'admin') {
    return next('/')
  }
  next()
}

const protectorRouterUser = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  if (!user) {
    return next('/')
  }
  next()
}

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
      component: CreateBlog,
      beforeEnter: protectorRouterUser
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

export default router
