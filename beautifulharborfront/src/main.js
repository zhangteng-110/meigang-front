// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios';
import moment from "moment";
import echarts from 'echarts';
import '@/assets/css/reset.css'
import './utils/flexible.js'
import { HappyScroll } from 'vue-happy-scroll'
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

//自定义组件名
Vue.component('happy-scroll', HappyScroll)
Vue.use(Vuex)
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
Vue.filter('fmtdatetime',(v)=>{
  if (v===null) {
    return '';
  }
  return moment(v).format('yyyy-MM-DD HH:mm:ss')
})
Vue.filter('fmttime',(v)=>{
  if (v===null) {
    return '';
  }
  return moment(v).format('yyyy-MM-DD HH:mm:ss')
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
const store=new Vuex.Store({
  state:{//[4]所有组件共用数据存放处
    isCollapse:false
  },
  mutations: {
    increment (state) {//[6.1.0]自加函数,用于其它组件操作数据通过 this.$store.commit('increment')
      state.isCollapse=true
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  VueAxios,
  store,
  components: {App},
  template: '<App/>'
})
