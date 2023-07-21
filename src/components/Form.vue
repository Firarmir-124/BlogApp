<script lang="ts">
export default {
  data() {
    return {
      blog: this.blogOne ? {
        ...this.blogOne
      } : {
        id: '',
        name: '',
        content: '',
        user: '',
        createAt: new Date(),
      }
    }
  },
  methods: {
    createBlog() {
      if (this.$store.state.blog.isEdit === 'create') {
        this.blog.id = Date.now().toString();
        this.$store.commit('blog/addBlog', this.blog);
        this.$router.push('/');
      } else if (this.$store.state.blog.isEdit === 'edit') {
        this.$store.commit('blog/editBlog', this.blog);
        this.$router.push('/');
      }
    },
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
      <button type="submit" class="btn btn-primary mt-3 w-25">{{$store.state.blog.isEdit === 'edit' ? 'Редактировать' : 'Создать'}}</button>
    </div>
  </form>
</template>

<style>

</style>
