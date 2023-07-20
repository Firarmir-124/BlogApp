<script setup lang="ts">
import Header from "@/components/Header.vue";
import CardBlog from "@/components/CardBlog.vue";
</script>

<template>
  <Header/>
  <main>
    <div class="container text-center">
      <div class="row row-cols-3">
        <div class="col">
          <CardBlog/>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
