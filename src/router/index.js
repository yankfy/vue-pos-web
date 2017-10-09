import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/page/Hello'
import Pos from '@/components/page/Pos'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'pos',
      component: Pos
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    }
    // {
    //   path: '*',
    //   name: 'hello',
    //   component: Hello
    // }
  ]
})
