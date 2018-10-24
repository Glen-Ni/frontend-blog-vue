<template>
  <section class="container">
    <ul class="media-list">
      <li class="media" v-for="topic in topics">
        <div class="media-left">
          <a href="#">
            <img width="40" height="40" class="media-object" src="../../assets/img/avatar-default.png" alt="...">
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">
            <!-- <a :href="'#/topic/detail/'+topic.id">{{topic.title}}</a> -->
            <!-- 这里也可用动态路由name为路由别名，防止名字过长，在路由中定义 -->
            <router-link :to="{name:'topic-detail', params:{id: topic.id}}">{{topic.title}}</router-link>
          </h4>
          <p>作者: <span class="topicAuthor">{{topic.user_nickname}}</span> &nbsp;&bull;&nbsp; 上次修改时间:&nbsp; {{topic.modify_time}}</p>
        </div>
      </li>
    </ul>
    <pagination @current-change="handleCurrentChange" :total="totalCount" :page-size="pageSize" :parentPage="parentPage"></pagination>
  </section>
</template>
<script>
import axios from 'axios'
import pagination from '../common/pagination.vue'
export default {
  data() {
    return {
      topics: [],
      totalCount: 0,
      pageSize: 10,
      parentPage: 1
    }
  },
  created() {
    this.handleCurrentChange(this.parentPage)
  },
  methods: {
    // 待处理：倒序排序
    async loadTopics() {
      const { data } = await axios.get('/api/topics')
      this.topics = data.topics
      this.totalCount = data.topics.length
    },
    async handleCurrentChange(page) {
      const { data } = await axios.get('/api/topics')
      this.totalCount = data.count
      try {
        this.parentPage = page
        const { data: topics } = await axios.get(`/api/topics?_page=${page}&_limit=${this.pageSize}`)
        this.topics = topics.topics
      } catch (err) {
      }
    }
  },
  components: {
    pagination
  }
}

</script>
<style>
.topicAuthor {
  color: rgb(0, 100, 200)
}
</style>
