import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Archive from '@/views/Archive'
import Article from '@/views/Article'
import About from '@/views/About'
import Manage from '@/views/Manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },{
      path: '/archive',
      component: Archive
    },{
      path: '/article/:createTime',
      component: Article
    },{
      path: '/about',
      component: About
    },{
      path: '/manage',
      component: Manage
    }
  ]
})
