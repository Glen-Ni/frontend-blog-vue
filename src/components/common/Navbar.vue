<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" @click="toggleCollapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">
            Glen-Ni的多人博客简单模拟
        </a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="navbar-collapse" id="bs-example-navbar-collapse-1" :class="{collapse: isCollapse}">
        <!-- <ul class="nav navbar-nav">
          <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
          <li><a href="#">Link</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul> -->
        <!-- <form class="navbar-form navbar-left">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
        </form> -->
        <ul class="nav navbar-nav navbar-right">
          <a class="btn btn-default navbar-btn" href="#/topic/new" v-if="sessionUser.id">发起</a>
          <li class="dropdown" @mouseover="mouseover" @mouseout="showDropdown = false" v-if="sessionUser.id">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img width="20" height="20" src="../../assets/img/avatar-default.png" alt=""> <span class="caret"></span></a>
            <ul class="dropdown-menu" :style="{display:showDropdown?'block':'none'}">
              <li class="dropdown-current-user">
                当前登录用户:{{nickname}}
              </li>
              <li role="separator" class="divider"></li>
              <!-- <li><a href="#">个人主页</a></li>
              <li><a href="/settings/profile">设置</a></li> -->
              <li><a @click.prevent="logOuter">退出</a></li>
            </ul>
          </li>
          <a class="btn btn-primary navbar-btn" href="#/login" v-if="!sessionUser.id">登录</a>
          <a class="btn btn-success navbar-btn" href="#/register" v-if="!sessionUser.id">注册</a>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    sessionUser: {
      type: Object
    }
  },
  data() {
    return {
      isCollapse: true,
      showDropdown: false,
      isLogin: false,
      nickname: ''
    }
  },
  methods: {
    toggleCollapse() {
      // console.log(this.isCollapse)
      this.isCollapse = !this.isCollapse
    },
    async logOuter() {
      try {
        await axios.delete('/api/session')
        this.isLogin = false
        window.alert('已退出登录')
        window.location.reload()
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    mouseover() {
      this.nickname = this.sessionUser.nickname
      this.showDropdown = true
    }
  }
}

</script>
<style>

</style>
