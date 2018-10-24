import VueRouter from 'vue-router'
import Home from './components/home/home.vue'
import HomeList from './components/home/List.vue'
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'
import TopicNew from './components/topic/New.vue'
import TopicDetail from './components/topic/Detail.vue'
import TopicEdit from './components/topic/Edit.vue'
import Setting from './components/settings/Setting.vue'
import SettingProfile from './components/settings/Profile.vue'
import SettingAdmin from './components/settings/Admin.vue'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: HomeList
        },
        {
          path: '/topic/new',
          component: TopicNew
        },
        {
          name: 'topic-detail',
          path: '/topic/detail/:id',
          component: TopicDetail
        },
        {
          path: '/topic/edit/:id',
          component: TopicEdit
        },
        {
          path: '/settings',
          component: Setting,
          children: [
            {
              path: '/settings/profile',
              component: SettingProfile
            },
            {
              path: '/settings/admin',
              component: SettingAdmin
            }
          ]
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
