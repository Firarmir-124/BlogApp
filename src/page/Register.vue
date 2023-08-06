<script lang="ts">
export default {
  data() {
    return {
      auth: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('auth/register', this.auth)
      } catch (e) {
        console.log(e)
      }
    },
    getFieldError(name: string) {
      if (this.authState.error) {
        const isError = this.authState.error.some((item) => item.field === name);
        return isError ? 'is-invalid' : ''
      }
    },
    getFiledErrorOne(name: string) {
      if (!this.authState.error) return null

      const errorOne = this.authState.error.find((item) => item.field === name);
      if (errorOne) {
        return errorOne.error
      }
      return null
    }
  },
  computed: {
    authState() {
      return {
        error: this.$store.state.auth.errorAuth,
        user: this.$store.state.auth.user,
      }
    }
  },
  mounted() {
    if (this.authState.user !== null) {
      return this.$router.push('/');
    }
  }
}
</script>

<template>
  <div class="container py-5 h-50">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://static.vecteezy.com/system/resources/previews/002/641/418/non_2x/create-account-for-healthcare-app-vector.jpg"
                   alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;"/>
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form action="#" @submit.prevent @submit="register">
                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Создать аккаунт</h5>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example17">Почта</label>
                    <input v-model="auth.email" type="email" id="form2Example17" :class="`form-control form-control-lg ${getFieldError('email')}`" name="email"/>
                    <div v-if="getFiledErrorOne('email')" class="invalid-feedback">
                      {{getFiledErrorOne('email')}}
                    </div>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example27">Пароль</label>
                    <input v-model="auth.password" type="password" name="password" id="form2Example27" :class="`form-control form-control-lg ${getFieldError('password')}`"/>
                    <div v-if="getFiledErrorOne('password')" class="invalid-feedback">
                      {{getFiledErrorOne('password')}}
                    </div>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="submit">Создать</button>
                  </div>
                </form>
                <div v-if="authState.error" v-for="error in authState.error">
                  <div v-if="getFiledErrorOne(error.field) !== error.error">
                    <div class="alert alert-danger" role="alert">
                      {{error.error}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
