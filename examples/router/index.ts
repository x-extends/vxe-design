import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import StartInstall from '../views/start/StartInstall.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: {
      name: 'StartInstall'
    }
  },
  {
    path: '/start/install',
    name: 'StartInstall',
    component: StartInstall
  },
  {
    path: '/component/listDesign',
    name: 'ListDesignTest',
    component: () => import('../views/list-design/ListDesignTest.vue')
  },
  {
    path: '/component/formDesign',
    name: 'FormDesignTest',
    component: () => import('../views/form-design/FormDesignTest.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
