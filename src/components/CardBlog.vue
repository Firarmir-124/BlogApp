<script lang="ts">

</script>

<template>
  <div key="{{blog.id}}" class="col" v-for="blog in $store.state.blog.blogList">
    <div class="card">
      <img src="../assets/image/blogImage.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{blog.name}}</h5>
        <p class="card-text">{{blog.content}}</p>
        <div class="d-flex justify-content-between align-items-center bg-dark-subtle p-1 mb-3">
          <p class="card-text m-0">Дата: {{blog.createAt}}</p>
          <p class="card-text m-0">Создатель:{{blog.user}} </p>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <RouterLink class="btn btn-primary" to="blog-one/1">Подробнее..</RouterLink>
          <button @click="$store.commit('blog/removeBlog', blog.id)" type="button" class="btn btn-danger">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
