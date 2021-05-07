import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: () => import( '../views/Overview.vue')
  },{
    path: '/editor/:moduleName/:documentTitle',
    name: 'editor',
    component: () => import( '../views/Writer.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import( './../views/Settings.vue')
  },
  {
    path: '/legal',
    name: 'LegalNotice',
    component: () => import( './../views/LegalNotice.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import( './../views/Privacy.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router