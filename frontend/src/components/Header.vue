<script lang="ts">
import Search from '@/components/Search.vue'
import HeaderAnonim from '@/components/HeaderAnonim.vue'
import HeaderUser from '@/components/HeaderUser.vue';
export default {
  components: {
    Search,
    HeaderAnonim,
    HeaderUser
  },
  computed: {
    auth() {
      return {
        user: this.$store.state.auth.user,
      }
    }
  },
}
</script>

<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><RouterLink class="nav-link px-2 text-white" to="/">Блог</RouterLink></li>
        </ul>
        <Search/>
        <div v-if="auth.user">
          <HeaderUser/>
        </div>
        <div v-else>
          <HeaderAnonim/>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
