<template>
  <div>
    <!-- @open="handleOpen"-->
    <!-- @close="handleClose"-->
    <el-menu
        style="width: 150px"
        default-active="2"
        class="el-menu-vertical-demo">

      <el-menu-item index="1"  to="/">
        <el-icon><Menu /></el-icon>
        <router-link to="/">
          <span>系统首页</span>
        </router-link>
      </el-menu-item>


      <el-sub-menu index="2">
        <template #title>
          <el-icon><Menu /></el-icon>
          信息管理
        </template>
        <router-link to="/book">
          <el-menu-item index="2-1">图书管理</el-menu-item>
        </router-link>
        <router-link to="/notification">
          <el-menu-item index="2-2">通知管理</el-menu-item>
        </router-link>
        <router-link to="/borrow">
          <el-menu-item index="2-3">借阅管理</el-menu-item>
        </router-link>
        <router-link to="/reservation">
          <el-menu-item index="2-4">预约管理</el-menu-item>
        </router-link>
      </el-sub-menu>


      <el-sub-menu index="3">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          用户管理
        </template>

        <router-link to="/administration">
          <el-menu-item index="3-1">管理员信息</el-menu-item>
        </router-link>

        <router-link to="/user">
          <el-menu-item index="3-2">用户信息</el-menu-item>
        </router-link>

      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {
  Menu,
  UserFilled
} from '@element-plus/icons-vue'
export default {
  name: "Aside",
  components: {UserFilled, Menu}
}
</script>


<style>

</style>