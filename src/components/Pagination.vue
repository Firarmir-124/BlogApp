<script lang="ts">
export default {
  data() {
    return {
      page: 1,
      pages: [...new Array(this.countPages)].map((_, index) => index + 1),
      sliceCountNext: this.sizePages,
      sliceCountPrev: 0,
    }
  },
  methods: {
    nextPage() {
      if (this.pages.length !== this.page) {
        this.page++;
        if (this.page > this.sliceCountNext) {
          this.sliceCountNext++;
          this.sliceCountPrev++;
        }
      }
    },
    prevPage() {
      if (this.page !== 1) {
        this.page--;
        if (this.page === this.sliceCountPrev) {
          this.sliceCountNext--;
          this.sliceCountPrev--;
        }
      }
    },
    setPage(num: number) {
      this.page = num
    }
  },
  computed: {
    pagesSlice() {
      return this.pages.slice(this.sliceCountPrev, this.sliceCountNext)
    }
  },
  watch: {
    async page(count) {
      localStorage.setItem('page', count.toString())
      this.$store.commit('blog/setPagination', count);
      await this.$store.dispatch('blog/getListBlog');
    }
  },
  props: {
    countPages: {
      type: Number,
      required: true,
    },
    sizePages: {
      type: Number,
      required: true,
    },
  }
}
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <div class="d-flex" v-for="count in countPages">
        <li :class="`page-item ${count === page ? 'active' : ''}`" @click="setPage(count)"><a class="page-link" href="#">{{count}}</a></li>
        <div v-if="countPages > sizePages && pagesSlice.at(-1) === count - 1">
          <li :style="`display: ${page === countPages  && 'none'};`" class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
        </div>
      </div>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>

</style>
