import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Pos from '@/components/Pos'

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
