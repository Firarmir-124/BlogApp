<script lang="ts">

</script>

<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><RouterLink class="nav-link px-2 text-white" to="/">Блог</RouterLink></li>
        </ul>

        <div class="text-end">
          <RouterLink to="/create-blog" class="btn btn-warning">Создать пост</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
