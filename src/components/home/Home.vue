<template>
  <div>
    <app-navbar :sessionUser="sessionUser"></app-navbar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
<script>
import axios from 'axios'
import AppNavbar from '../common/Navbar.vue'
import AppFooter from '../common/Footer.vue'
export default {
  data() {
    return {
      sessionUser: {}
    }
  },
  created() {
    // console.log(this.sessionUser)
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { data: sessionUser } = await axios.get('/api/session')
      // this.checkLogin()
      next(vm => {
        // 由于beforeroute，父子组件都被卡住，但是子组件已经created，还没mount
        // 这里比子组件后执行，子组件created时获取不到该值
        vm.sessionUser = sessionUser
        // console.log(sessionUser)
        // Object.assign(vm.sessionUser, sessionUser)
      })
    } catch (err) {
      next()
    }
  },
  methods: {},
  components: {
    AppNavbar,
    AppFooter
  }
}

</script>
<style>
</style>
