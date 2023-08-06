<script lang="ts">
export default {
  data() {
    return {
      blog: this.blogOne ? {
        ...this.blogOne
      } : {
        name: '',
        content: '',
        user: '',
        image:  null
      }
    }
  },
  methods: {
    async createBlog() {
      if (this.$store.state.blog.isEdit === 'create') {
        await this.$store.dispatch('blog/createBlog', this.blog)
        this.$router.push('/');
      } else if (this.$store.state.blog.isEdit === 'edit') {
        await this.$store.dispatch('blog/updateBlog', {id: this.$route.params.id, update: this.blog})
        this.$router.push('/');
      }
    },
    changeFile(e) {
      const { files } = e.target;
      this.blog.image = files && files[0] ? files[0] : null

    }
  },
  computed: {
    blogs() {
      return {
        loadingCreateEdit: this.$store.state.blog.createAndEditLoading
      }
    }
  },
  props: {
    blogOne: {
      type: Object,
      required: false,
    }
  }
}
</script>

<template>
  {{blog.image}}
  <form @submit.prevent @submit="createBlog">
    <div class="card p-2">
      <div class="form-group">
        <label class="mb-3" for="name">Название блога</label>
        <input v-model="blog.name" type="text" class="form-control" id="name" name="name" placeholder="Введите название..." required>
      </div>
      <div class="form-group my-3">
        <label class="mb-3" for="text">Информация</label>
        <textarea v-model="blog.content" class="form-control" id="content" name="content" rows="3" placeholder="Введите информацию о блоге..." required></textarea>
      </div>
      <div class="form-group">
        <label class="mb-3" for="nameAuthor">Автор блога</label>
        <input v-model="blog.user" type="text" class="form-control" id="user" name="user" placeholder="Введите имя..." required>
      </div>
      <div class="my-3">
        <label for="formFile" class="form-label">Выбрать картинку</label>
        <input class="form-control" type="file" id="formFile" @change="changeFile">
      </div>
      <button :disabled="blogs.loadingCreateEdit" type="submit" class="btn btn-primary mt-3 w-25">
        <div v-if="!blogs.loadingCreateEdit">
          {{$store.state.blog.isEdit === 'edit' ? 'Редактировать' : 'Создать'}}
        </div>
        <div v-else>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </button>
    </div>
  </form>
</template>

<style>

</style>
