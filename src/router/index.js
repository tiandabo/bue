import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import address from '@/page/address'

Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path: '/',
	  	redirect:'home'
	  },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
  ]
})
