<template>
  <div class="mt-2" v-if="blog.blogList.pages !== 0">
    <Pagination :count-pages="blog.blogList.pages" :size-pages="5" />
  </div>
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
import Pagination from "@/components/Pagination.vue";
export default {
  components: {CardBlog, Pagination},
  async mounted() {
    await this.$store.dispatch('blog/getListBlog')
  },
  computed: {
     blog() {
      return  {
        loading: this.$store.state.blog.loading,
        blogList: this.$store.state.blog.blogList,
      }
    },
  },
}
</script>

<style scoped>

</style>
