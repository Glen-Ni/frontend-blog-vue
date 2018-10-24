<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li>
        <a @click.prevent="pageChange(currentPage-1)" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
      </li>
      <li :class="{active: n === currentPage }" v-for="n in totalPage"><a @click="pageChange(n)" href="#">{{n}}</a></li>
      <li>
        <a @click.prevent="pageChange(currentPage+1)" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    parentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: this.parentPage
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    pageChange(page) {
      if (page <= 0) {
        page = 1
      }
      if (page >= this.totalPage) {
        page = this.totalPage
      }
      this.currentPage = page
      this.$emit('current-change', page)
    }
  }
}
</script>
<style>
</style>
