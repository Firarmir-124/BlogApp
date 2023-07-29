<script lang="ts">
export default {
  data() {
    return {
      value: '',
      lists: [],
    }
  },
  watch: {
    value(value) {
      setTimeout(async () => {
        this.lists = await this.$store.getters['blog/getSearchList'](value)
      }, 200)
    }
  },
  methods: {
    async setSearch(id: string) {
      this.lists = [];
      this.value = '';
      this.$router.push(`/blog-one/${id}`)
      this.$store.dispatch('blog/getBlogOne', id)
    }
  }
}
</script>

<template>
  <div>
    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
      <input v-model="value" type="search" class="form-control form-control-dark" placeholder="Найти блог..." aria-label="Search">
    </form>
    <ul :style="`display: ${value.length !== 0 ? 'block' : 'none'} `" class="list-group mt-2 autocomplete">
      <div v-for="list in lists">
        <li @click="setSearch(list._id)" class="list-group-item">{{list.name}}</li>
      </div>
    </ul>
  </div>
</template>

<style>
.autocomplete {
  position: absolute;
  z-index: 10;
  overflow-y: scroll;
  width: 300px;
  height: 200px;
}
</style>
