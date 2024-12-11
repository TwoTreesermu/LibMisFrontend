<template>
  <!--左侧导航菜单-->
  <div style="width: 150px;border-right: #ddd solid 1px;
              height: calc(100vh - 60px);">
    <!-- @open="handleOpen"-->
    <!-- @close="handleClose"-->
    <el-menu>
        <!--style="border:0;"-->
        <!--default-active="2"-->
        <!--class="el-menu-vertical-demo">-->

      <el-menu-item index="1"  to="/">
        <el-icon><Menu /></el-icon>
          <span @click="router.push({path: '/manager/homePage'})">系统首页</span>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><Menu /></el-icon>
          信息管理
        </template>
          <el-menu-item index="2-1" @click="router.push({path: '/manager/book'})">图书管理</el-menu-item>
          <el-menu-item index="2-2" @click="router.push({path: '/manager/notification'})" >通知管理</el-menu-item>
          <el-menu-item index="2-3" @click="router.push({path: '/manager/borrow'})">借阅管理</el-menu-item>
          <el-menu-item index="2-4" @click="router.push({path: '/manager/reservation'})">预约管理</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          用户管理
        </template>
          <el-menu-item index="3-1" @click="router.push({path: '/manager/administration'})">管理员信息</el-menu-item>
          <el-menu-item index="3-2" @click="router.push({path: '/manager/user'})">用户信息</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import {
  Menu,
  UserFilled
} from '@element-plus/icons-vue'
import router from "@/router";

const componentName ="Aside";

</script>


<style>

</style>