<script lang="ts">
import dayjs from 'dayjs'
export default {
  data() {
    return {
      dayjs
    }
  },
  methods: {
    remove() {
      this.$store.dispatch('blog/removeBlog', this.$route.params.id);
      this.$router.push('/');
    }
  },
  computed: {
    blog() {
      return {
        loadingOne: this.$store.state.blog.loadingOne,
        blogOne: this.$store.state.blog.blogOne,
        loadingRemove: this.$store.state.blog.removeLoading,
      }
    }
  },
  async mounted() {
    this.$store.dispatch('blog/getBlogOne', this.$route.params.id)
  },
}
</script>

<template>
  <RouterLink class="btn btn-secondary my-3" to="/">Назад</RouterLink>
  <div v-if="!blog.loadingOne">
    <div v-if="blog.blogOne !== null">
      <div class="card" style="width: 100%">
        <img src="../assets/image/blogImage.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">{{blog.blogOne.name}}</h3>
          <p class="card-text">{{blog.blogOne.content}}</p>
          <div class="card" style="width: 18rem;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Создатель: {{blog.blogOne.user}}</li>
              <li class="list-group-item">Дата: {{ dayjs(blog.blogOne.createAt).format('YYYY-MM-DD')}}</li>
            </ul>
          </div>
          <div class="btn-group mt-3" role="group" aria-label="Basic outlined example">
            <button :disabled="blog.loadingRemove" @click="remove" type="button" class="btn btn-outline-primary">
              <div v-if="!blog.loadingRemove">
                Удалить
              </div>
              <div v-else>
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </button>
            <RouterLink class="btn btn-outline-primary" :to="`/edit-blog/${blog.blogOne.id}`">Редактировать</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-primary" role="alert">
        Блог не загрзился !
      </div>
    </div>
  </div>
  <div v-else>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style>

</style>
