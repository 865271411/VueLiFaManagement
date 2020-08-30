import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue'
import Sercom from '../components/TiCheng/Sercom.vue'
import Cardcom from '../components/TiCheng/Cardcom.vue'
import Cash from '../components/ShouYin/Cash.vue'
import ServiceType from '../components/ServiceType.vue'
import Cards from '../components/Card/Card.vue'
import Achievement from '../components/User/Achievement.vue'
import Commision from '../components/User/Commision.vue'
import Consumes from '../components/Page/Consumes'
//import Vip from '../components/vip/vip.vue'
import Emp from '../components/Emp.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/sercom.html',
          component: Sercom
        },
        {
          path: '/cardcom.html',
          component: Cardcom
        },
        {
          path: '/Cash',
          component: Cash
        },
        {
          path: '/viewServiceType.html',
          component: ServiceType
        },
        {
          path: '/viewCard.html',
          component: Cards
        },
        {
          path: '/achievement.html',
          component: Achievement
        },
        {
          path: '/commision.html',
          component: Commision
        },
        {
          path: '/consume.html',
          component: Consumes
        },
        {
          path: '/emp.html',
          component: Emp
        }
        /*
        ,
        {
          path: '/vip',
          component: Vip
        }*/
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
// to 将要访问的路径
// from 代表从哪个路径跳转而来
// next 是一个函数，表示放行
// next() 放行 next('/login') 强制跳转

//  如果用户访问的登录页，直接放行
// if (to.path === '/login') return next()
// 从sessionStorage 中获取到 保存的token值
// const tokenStr = window.sessionStorage.getItem('token')
// 没有token,强制跳转到登录页
// if (!tokenStr) return next('/login')
// next()
// })

export default router
