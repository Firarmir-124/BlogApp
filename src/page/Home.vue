<template>
  <main>
    <h1 class="my-2">Блог</h1>
    <div v-if="blog.blogList.length === 0">
      <div class="alert alert-primary" role="alert">
        Блоги не загрузились !
      </div>
    </div>
    <div class="row row-cols-3" v-else-if="!blog.loading">
      <CardBlog />
    </div>
    <div v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import CardBlog from "@/components/CardBlog.vue";
export default {
  components: {CardBlog},
  computed: {
    blog() {
      return  {
        loading: this.$store.state.blog.loading,
        blogList: this.$store.state.blog.blogList,
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('blog/getListBlog')
  }
}
</script>

<style scoped>

</style>
