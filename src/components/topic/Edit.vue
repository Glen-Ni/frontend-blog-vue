<template>
  <section class="container">
    <div class="row">
      <div class="col-md-5">
        <form @submit.prevent="updateTopic">
          <div class="form-group">
            <label for="exampleInputEmail1">选择板块</label>
            <select class="form-control">
              <option>分享</option>
              <option>问答</option>
              <option>招聘</option>
              <option>客户端测试</option>
            </select>
          </div>
          <div class="form-group">
            <label for="title">标题</label>
            <input required v-model="formData.title" class="form-control" id="title">
          </div>
          <div class="form-group">
            <label for="content">内容</label>
            <textarea required v-model="formData.content" class="form-control" id="content" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-success">点击保存</button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      formData: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.getTopicById(this.$route.params.id)
  },
  methods: {
    async getTopicById(id) {
      try {
        const { data } = await axios.get(`/api/topics/${id}`)
        this.formData.title = data.title
        this.formData.content = data.content
        console.log(data)
      } catch (err) {
      }
    },
    // 待解决 重复提交问题
    async updateTopic() {
      try {
        const { data } = await axios.patch(`/api/topics/${this.$route.params.id}`, this.formData)
        console.log(data)
        this.$router.back()
      } catch (err) {
        const ret = err.response
        console.log(ret)
      }
    }
  }
}

</script>
<style>
</style>
