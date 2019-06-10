<template>
  <el-container>
    <el-aside width="auto">
        <!-- 菜单栏组件，isShow是否展开菜单 -->
      <Menu :isShow="isShow"/>
    </el-aside>

    <el-container>
      <el-header>
        <!-- 渲染头部组件 -->
        <Header @click="handleChangeShow"/>
      </el-header>
      <el-main>
        <Miaobao/>
         <!-- 子路由匹配到的组件 -->
         <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
// 导入头部组件
import Header from "../components/Header.vue";
// // 导入面包屑组件
import Miaobao from "../components/Miaobao.vue";
// // 导入菜单栏组件
import Menu from '../components/Menu.vue'
export default {
  data() {
    return {
         // 控制菜单的展开收起的状态
         isShow:false,
    };
  },
  // 注册组件
  components: {
    Header,
    Miaobao,
    Menu
  },

  // 页面事件
  methods:{
       // 修改isShow的事件
       handleChangeShow(){
           this.isShow= !this.isShow;
       }
  }
};
</script>

<style>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

/* 重新修改高度 */
body > div > .el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
