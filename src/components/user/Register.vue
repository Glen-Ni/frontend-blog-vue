<template>
  <div class="main">
    <div class="header">
      <a href="#/">
        <h1>Glen-Ni的多人博客</h1>
      </a>
      <h1>用户注册</h1>
    </div>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" v-model="formData.email" required @input="checkEmail" @blur="checkEmail" class="form-control" placeholder="Email">
        <p class="error-message" v-show="emailExist">邮箱已存在</p>
      </div>
      <div class="form-group">
        <label for="nickname">昵称</label>
        <input type="text" v-model="formData.nickname" required minlength="2" maxlength="21" @input="checkNickname" @blur="checkNickname" class="form-control" id="nickname" name="nickname" placeholder="Nickname">
        <p class="error-message" v-show="nicknameExist">昵称已存在</p>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" v-model="formData.password" required minlength="6" maxlength="18" class="form-control" id="password" name="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-success btn-block">注册</button>
    </form>
    <div class="message">
      <p>已有账号? <a href="#/login">点击登录</a>.</p>
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
        password: '',
        nickname: ''
      },
      emailExist: false,
      nicknameExist: false
    }
  },
  methods: {
    async register() {
      // checkEmail()是acync函数，返回promise，所以调用的时候还要用await调用！！
      // if (await this.checkEmail(){}) 他妈的直接判断emailExist不就行了吗？
      if (this.emailExist) {
        return window.alert('邮箱已存在')
      }
      if (this.nicknameExist) {
        return window.alert('昵称已存在')
      }
      const ret = await axios.post('/api/users', this.formData)
      console.log(ret)
      // 编程式路由，注册完跳转
      window.alert('注册成功，请登录')
      this.$router.push({ name: 'login' })
    },
    // 第三方包提供的debounce方法，函数防抖，0.5s验证一次
    checkEmail: _.debounce(async function () {
      const { data } = await axios.get(`/api/users?email=${this.formData.email}`)
      // 有重名就显示'用户名存在'
      this.emailExist = data[0]
      // return this.emailExist 返回本来为了register中判断，改了思路用不到了
    }, 500),
    checkNickname: _.debounce(async function () {
      const { data } = await axios.get(`/api/users?nickname=${this.formData.nickname}`)
      this.nicknameExist = data[0]
      // return this.nicknameExist
    }, 500)
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

.error-message {
  color: red;
}

</style>
