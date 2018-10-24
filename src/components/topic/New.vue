<template>
  <section class="container">
    <div class="row">
      <div class="col-md-5">
        <form @submit.prevent="postTopic">
<!--           <div class="form-group">
            <label for="exampleInputEmail1">选择板块</label>
            <select class="form-control">
              <option>分享</option>
              <option>问答</option>
              <option>招聘</option>
              <option>客户端测试</option>
            </select>
          </div> -->
          <div class="form-group">
            <label for="title">标题</label>
            <input required v-model="formData.title" class="form-control" id="title">
          </div>
          <div class="form-group">
            <label for="content">内容</label>
            <textarea required v-model="formData.content" class="form-control" id="content" rows="15" cols="100"></textarea>
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
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
  methods: {
    // 待解决 重复提交问题
    async postTopic() {
      try {
        const { data } = await axios.post('/api/topics', this.formData)
        // 两种写法都行 this.$router.push(`topic/detail/${data.id}`)
        this.$router.push({ name: 'topic-detail', params: { id: data.id } })
      } catch (err) {
        const { status } = err.response
        switch (status) {
          case 404:
            this.loginMessage = '账号或密码错误'
            break
        }
      }
    }
  }
}

</script>
<style>
</style>
