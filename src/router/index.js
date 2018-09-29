import Vue from 'vue'
import Router from 'vue-router'
import ShopingMall from '@/components/pages/ShopingMall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShopingMall',
      component: ShopingMall
    }
  ],
  // mode:'history',
})
