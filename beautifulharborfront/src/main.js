// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios';
import moment from "moment";
import echarts from 'echarts';

import '@/assets/css/reset.css'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;


Vue.filter('fmtdate',(v)=>{
  if (v===null) {
    return '';
  }
  return moment(v).format('yyyy-MM-DD')
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (localStorage.getItem('token')) {  // 通过vuex state获取当前的token是否存在
          next();
      }else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }else {
      next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  VueAxios,
  components: {App},
  template: '<App/>'
})
