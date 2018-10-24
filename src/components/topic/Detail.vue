<template>
  <section class="container">
    <div class="row">
      <div class="col-md-9">
        <h1>标题：{{topic.title}}</h1>
        <p>上次修改: &nbsp;{{topic.modify_time}} &nbsp;&bull;&nbsp; 作者: &nbsp;{{topic.user_nickname}}</p>
        <p v-if="isTopicOwner">
          <a :href="'#/topic/edit/'+topic.id">编辑</a>
          <a @click.prevent="deleteTopic(topic.id)" style="cursor:pointer">删除</a>
        </p>
        <hr>
        <article class="markdown-body">
          <h3>{{topic.content}}</h3>
        </article>
        <div class="panel panel-default" v-for="(comment, index) in comments" :key="index">
          <div class="panel-heading">
            <span class="commentDetail">第{{index + 1}}楼</span> &bull;
            <span class="commentDetail"> {{commentOwners[index]}}</span> 的回复&bull;
            上次修改: {{comment.modify_time}}
            <span class="action">
<!--             <a href=""><i class="glyphicon glyphicon-thumbs-up pull-right"></i></a>
              <a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a> -->
              <a  v-if="comment.user_id === currentUserId" @click.prevent="deleteComment(comment.id)"><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
            </span>
          </div>
          <div class="panel-body">
            {{comment.content}}
          </div>
        </div>
        <hr>
        <form @submit.prevent="postComment" class="form-section">
          <div class="form-group">
            <label for="exampleInputPassword1">添加回复</label>
            <textarea requried v-model="newComment.content" placeholder="评论不能少于5个字符" class="form-control" name="" id="" cols="10" rows="5"></textarea>
          </div>
          <button type="submit" class="btn btn-success">回复</button>
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
      topic: {
        title: '',
        content: ''
      },
      isTopicOwner: false,
      currentUserId: 0,
      comments: [],
      commentOwners: [],
      newComment: {
        content: ''
      }
    }
  },
  created() {
    this.loadComments()
  },
  async beforeRouteEnter(to, from, next) {
    const { id } = to.params
    const { data: topic } = await axios.get(`/api/topics/${id}`)
    // console.log(comments)
    let user = ''
    try {
      // 结构赋值key一定要是data，赋予别名防止冲突
      // 但是这里其实不适合结构赋值为user，因为未登录时res中data为空字符串
      user = (await axios.get('/api/session')).data
    } catch (err) {
      // 这里用try catch防止没有登录造成错误执行中断
      // console.dir(err)
    }
    next(vm => {
      vm.topic = topic
      vm.currentUserId = user.id
      vm.isTopicOwner = user.id === topic.user_id
    })
  },
  methods: {
    async deleteTopic(id) {
      if (!window.confirm('删吗？要删了哦？')) {
        return
      }
      try {
        await axios.delete(`/api/topics/${id}`)
        this.$router.push('/')
      } catch (err) {
        console.log(err.status)
      }
    },
    async deleteComment(id) {
      if (!window.confirm('删吗？要删了哦？')) {
        return
      }
      try {
        await axios.delete(`/api/comments/${id}`)
        const { data } = await axios.get(`/api/comments?topic_id=${this.topic.id}`)
        this.comments = data
      } catch (err) {
        console.log(err.status)
      }
    },
    async loadComments() {
      this.$nextTick(async () => {
        const { data: comments } = await axios.get(`/api/comments?topic_id=${this.topic.id}`)
        // console.log(this.topic.id)
        this.comments = comments
        for (let i = 0; i < comments.length; i++) {
          // console.log(comments[i].user_id)
          this.$nextTick(async () => {
            const { data: commentOwner } = await axios.get(`/api/users?id=${comments[i].user_id}`)
            // console.log(commentOwner[0])
            this.comments[i].user_nickname = commentOwner[0].user_nickname
            this.commentOwners.push(commentOwner[0].nickname)
          })
        }
        // console.log(this.comments)
        // console.log(this.commentOwners)
      })
    },
    async postComment() {
      try {
        // 先判断评论
        /* eslint-disable no-throw-literal */
        if (this.newComment.content.length < 5) {
          throw '少了'
        }
        // 在判断有没有登录
        await axios.get('/api/session')
        this.newComment.article_id = this.topic.id
        const { data } = await axios.post('/api/comments', this.newComment)
        // 妈的这边直接导航不会刷新当前页面 只好提交完comment再发一遍请求
        // 也可以不发请求，直接把服务器返回的新comment对象加到this.comments
        // this.$router.push({ name: 'topic-detail', params: { id: this.topic.id } })
        // const { data } = await axios.get(`/api/comments?topic_id=${this.topic.id}`)
        const { data: lastCommentOwner } = await axios.get(`/api/users?id=${data.user_id}`)
        this.newComment.content = ''
        data.nickname = lastCommentOwner[0].nickname
        this.commentOwners.push(lastCommentOwner[0].nickname)
        this.comments.push(data)
      } catch (err) {
        if (err === '少了') {
          return window.alert('评论不能少于5个字符')
        }
        const { status } = err.response
        switch (status) {
          case 401:
            if (!window.confirm('请登录后再评论')) {
              return
            }
            this.$router.push({ name: 'login' })
            break
          case 500:
            window.alert('服务器错误，请稍后重试')
        }
      }
    }
  }
}

</script>
<style>
.panel .panel-heading .action i {
  margin-right: 10px;
}

.markdown-body {
  margin-bottom: 100px;
}

.commentDetail {
  color: rgb(50, 50, 204)
}

</style>
