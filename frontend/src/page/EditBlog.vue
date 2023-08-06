<template>
  <h3 class="my-2">Редактирование</h3>
  <Form :blog-one="blog"/>
</template>

<script lang="ts">
import Form from '@/components/Form.vue'
export default {
  components: {Form},
  computed: {
    blog() {
      return this.$store.state.blog.blogOne
    },
  },
  mounted() {
    this.$store.dispatch('blog/getBlogOne', this.$route.params.id);
    this.$store.commit('blog/setIdEdit', 'edit');
  }
}
</script>

<style>

</style>
