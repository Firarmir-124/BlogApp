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
      this.$store.commit('blog/setIdBlogOne', this.$route.params.id);
      return this.$store.getters['blog/getBlogOne'](this.$route.params.id);
    },
  },
  mounted() {
    this.$store.commit('blog/setIdEdit', 'edit');
  }
}
</script>

<style>

</style>
