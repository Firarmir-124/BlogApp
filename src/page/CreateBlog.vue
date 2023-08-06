<template>
  <h2 class="my-3">Создать блог</h2>
  <Form />
</template>

<script lang="ts">
import Form from "@/components/Form.vue";
export default {
  components: {Form},
  computed: {
    authState() {
      return {
        user: this.$store.state.auth.user
      }
    }
  },
  mounted() {
    this.$store.commit('blog/setIdEdit', 'create');
  }
}
</script>

<style>

</style>
