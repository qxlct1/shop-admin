import Vue from 'vue';
import App from './App.vue';
import axios from 'axios'
import VueRouter from 'vue-router'

// element: 1.导入组件
import ElementUI from "element-ui"

// element的样式
import 'element-ui/lib/theme-chalk/index.css';

//导入组件
import Admin from './pages/Admin.vue'
import Login from './pages/Login.vue'
import GoodsList from './pages/GoodsList.vue'
import CategoryList from './pages/CategoryList.vue'
import GoodsAdd from './pages/GoodsAdd.vue'
import GoodsEdit from './pages/GoodsEdit.vue'

// element: 2.注册element插件
Vue.use(ElementUI)

// 注册路由
Vue.use(VueRouter)

// 配置路由
const routes = [
  {
    path: '/',
    redirect: '/admin/goods-list',
    meta: '首页'
  },
  {
    path: '/login',
    component: Login,
    meta: '登录'
  },
  {
    path: '/admin',
    component: Admin,
    meta: '后台管理',
    children: [
      {
        path: 'goods-list',
        component: GoodsList,
        meta: '商品列表'
      },
      {
        path: 'goods-add',
        component: GoodsAdd,
        meta: '添加商品'
      },
      {
        path: 'goods-edit/:id',
        component: GoodsEdit,
        meta: '编辑商品'
      },
      {
        path: 'category-list',
        component: CategoryList,
        meta: '栏目列表'
      }
    ]
  }
]

// 路由实例
const router = new VueRouter({ routes })

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断是否是登录
  axios({
    url: 'http://localhost:8899/admin/account/islogin',
    method: 'GET',
    // 处理session跨域
    withCredentials: true
  }).then(res => {
    const { code } = res.data;
    // 访问的页面是登录页
    if (to.path == '/login') {
      // 如果已经登录了
      if (code == 'logined') {
        next('/admin/goods-list');
      } else {
        next()
      }
    }else{
      //访问非登录页
      if(code=='logined'){
        next()
      }else{
        next('/login')
      }
    }
  })
})
Vue.config.productionTip = false

// 绑定到原型
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
