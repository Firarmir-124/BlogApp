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
      this.$store.commit('blog/removeBlog', this.$route.params.id);
      this.$router.push('/');
    }
  },
  computed: {
    blog() {
      return this.$store.getters['blog/getBlogOne'](this.$route.params.id);
    },
  },
}
</script>

<template>
  <RouterLink class="btn btn-secondary my-3" to="/">Назад</RouterLink>

  <div v-if="blog">
    <div class="card" style="width: 100%">
      <img src="../assets/image/blogImage.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">{{blog.name}}</h3>
        <p class="card-text">{{blog.content}}</p>
        <div class="card" style="width: 18rem;">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Создатель: {{blog.user}}</li>
            <li class="list-group-item">Дата: {{ dayjs(blog.createAt).format('YYYY-MM-DD')}}</li>
          </ul>
        </div>
        <div class="btn-group mt-3" role="group" aria-label="Basic outlined example">
          <button @click="remove" type="button" class="btn btn-outline-primary">Удалить</button>
          <RouterLink class="btn btn-outline-primary" :to="`/edit-blog/${blog.id}`">Редактировать</RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    {{null}}
  </div>
</template>

<style>

</style>
