<template>
  <div class="main">
    <div class="header">
      <a href="#/">
        <h1>Glen-Ni的多人博客</h1>
      </a>
      <h1>用户登录</h1>
    </div>
    <form @submit.prevent="loginHandler">
      <div class="form-group">
        <label for="email">邮箱</label>
        <input required v-model="formData.email" type="email" class="form-control" id="email" name="email" placeholder="Email" autofocus>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <!-- <a class="pull-right" href="">忘记密码？</a> -->
        <input required v-model="formData.password" @focus="loginMessage=''" type="password" class="form-control" id="password" name="password" placeholder="Password">
      </div>
      <p class="error-message" v-show="loginMessage?loginMessage:''">{{loginMessage}}</p>
      <button type="submit" class="btn btn-success btn-block">登录</button>
    </form>
    <div class="message">
      <p>没有账号? <a href="#/register">点击创建</a>.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      loginMessage: '',
      fromUrl: ''
    }
  },
  async beforeRouteEnter(to, from, next) {
    // 使用beforeroute判断跳转来的页面
    try {
      await axios.get('/api/session') // 如果没找到session，获得401错误，进入catch
      window.alert('您已登陆，请勿重复登录！')
    } catch (err) {
      next(vm => {
        vm.fromUrl = from.path
        console.log(vm.fromUrl)
      })
    }
  },
  methods: {
    loginHandler: _.debounce(async function () {
      try {
        await axios.post('/api/session', this.formData)
        // console.log(res)
        this.loginMessage = ''
        // 如果从注册页面跳转来，则导航回主页，否则从哪儿来到哪儿去
        if (this.fromUrl === '/register') {
          return this.$router.push('/')
        }
        this.$router.back()
      } catch (err) {
        console.log(err)
        const { status } = err.response
        switch (status) {
          case 404:
            this.loginMessage = '账号或密码错误'
            break
        }
      }
    }, 1000)
  }
}

</script>
<style>
body {
  background-color: #f9f9f9;
}

.main {
  width: 340px;
  margin: 0 auto;
  margin-top: 50px;
  color: #333;
}

.main .header {
  text-align: center;
}

.main .header h1 {
  font-size: 26px;
}

.main form {
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background-color: #fff;
}

.main .message {
  padding: 10px;
  padding-bottom: 0;
  border: 1px solid #d8dee2;
  border-radius: 5px;
}

</style>
