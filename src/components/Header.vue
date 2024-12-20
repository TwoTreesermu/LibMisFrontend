<template>
  <!--头部菜单栏-->
  <div style="align-items: center;
              height: 60px;
              line-height: 50px;
              border-bottom: 1px solid #ccc;
              background-color: #638ce8;
              display:flex"
  >
    <!--左侧Logo,标题区域开始-->
    <div style="width: 200px; display:flex; margin-left: 5px;">
      <img src="@/assets/books.png" alt="" style="width: 40px;height: 40px"/>
      <span style="font-size: 22px; color:#efe6e6">图书管理系统</span>
    </div>
    <!--左侧Logo,标题区域结束-->

    <div style="flex: 1"></div>

    <!--右侧 用户头像、用户名 区域开始-->
    <div style="width: fit-content; display: flex; align-items: center; padding-right: 25px">
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" style="width: 40px;height: 40px"/>
      <el-dropdown style="padding-left: 20px">
        <span class="el-dropdown-link" style="font-size: 20px; color: gold" >{{data.user.username}}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><router-link to="">个人信息</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to="">修改密码</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to="/login">退出登录</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!--右侧 用户头像、用户名 区域结束-->
  </div>
</template>
<script setup>

import router from "@/router";
import {reactive} from "vue";

const componentName ="Header";
const data = reactive({
  user: JSON.parse(localStorage.getItem("userdata")),
})

</script>


<style>

</style>