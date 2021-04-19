import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Users from '@/components/view/users'
import Staff from "@/components/view/staff"
import Home from '@/components/home/home'
import Index from '@/components/home/index'
import Recharge from "@/components/view/recharge";
import Consumption from "@/components/view/consumption";
import Serviceitem from "@/components/view/serviceitem";
import Storefront from "@/components/view/storefront";
import Error_404 from '@/components/404.vue'
import Staffauthority from "@/components/view/staffauthority";
import Notice from "@/components/view/notice";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },{
      path: '/',
      name: 'home',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home,
      children: [
        {path: '/index',name: 'index',component: Index},
        {path: '/users',name: 'users',component: Users},
        {path: '/staff',name: 'staff',component: Staff},
        {path: '/recharge',name: 'recharge',component: Recharge},
        {path: '/consumption',name: 'consumption',component: Consumption},
        {path: '/serviceitem',name: 'serviceitem',component: Serviceitem},
        {path: '/storefront',name: 'storefront',component: Storefront},
        {path: '/staffauthority',name: 'staffauthority',component: Staffauthority},
        {path: '/notice',name: 'notice',component: Notice}
      ]
    },{
      path: '/error_404',
      name: 'error_404',
      component: Error_404,
    }
  ]
})

const originalPush = Router.prototype.push
      Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
      }

