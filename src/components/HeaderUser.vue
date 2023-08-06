<script lang="ts">
export default {
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
    }
  },
  computed: {
    authState() {
      return {
        logoutLoading: this.$store.state.auth.logoutLoading,
        errorAuth: this.$store.state.auth.errorAuth,
      }
    }
  }
}
</script>

<template>
  <div class="dropdown text-end">
    <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
       data-bs-toggle="dropdown" aria-expanded="false">
      <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
    </a>
    <ul class="dropdown-menu text-small text-center" aria-labelledby="dropdownUser1" style="">
      <li>
        <RouterLink class="dropdown-item" to="/create-blog">Создать пост</RouterLink>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li>
        <button :disabled=authState.logoutLoading type="button" class="btn btn-danger" @click="logout">
          <div class="spinner-border" v-if="authState.logoutLoading"></div>
          <div class="is-invalid" v-else>
            Выйти
          </div>
        </button>
        <span v-if="authState.errorAuth" class="badge text-bg-warning">{{ authState.errorAuth[0].error }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
