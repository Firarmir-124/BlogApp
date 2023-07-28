<script lang="ts">
import dayjs from 'dayjs'
import noImage from "@/assets/image/blogImage.png";
export default {
  data() {
    return {
      dayjs
    }
  },
  computed: {
    blogs() {
      return {
        blogList: this.$store.state.blog.blogList,
        removeLoading: this.$store.state.blog.removeLoading,
      }
    }
  },
  methods: {
    async removeBlog(id: string) {
      console.log(id);
      await this.$store.dispatch('blog/removeBlog', id)
      await this.$store.dispatch('blog/getListBlog')
    },
    getImage(imageUrl: string | undefined) {
      if (imageUrl) {
        return `http://localhost:8000/images/${imageUrl}`
      }

      return noImage
    }
  }
}
</script>

<template>
  <div key="{{blog._id}}" class="col" v-for="blog in blogs.blogList.blogs" v-if="blogs.length !== 0">
    <div class="card">
      <img :src="getImage(blog.image)" class="card-img-top" alt="..." width="550" height="400">
      <div class="card-body">
        <h5 class="card-title">{{blog.name}}</h5>
        <p class="card-text">{{blog.content}}</p>
        <div class="d-flex justify-content-between align-items-center bg-dark-subtle p-1 mb-3">
          <p class="card-text m-0">Дата: {{dayjs(blog.createAt).format('YYYY-MM-DD')}}</p>
          <p class="card-text m-0">Создатель:{{blog.user}} </p>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <RouterLink class="btn btn-primary" :to="`/blog-one/${blog._id}`">Подробнее..</RouterLink>
          <button :disabled="blogs.removeLoading" @click="removeBlog(blog._id)" type="button" class="btn btn-danger">
            <div v-if="!blogs.removeLoading">Удалить</div>
            <div v-else>
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="alert alert-primary" role="alert">
      Список пуст !
    </div>
  </div>
</template>

<style>

</style>
