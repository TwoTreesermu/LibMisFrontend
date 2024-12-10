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
        <template #title>信息管理</template>
        <router-link to="/books">
          <el-menu-item index="2-1">图书管理</el-menu-item>
        </router-link>
        <router-link to="/notification">
          <el-menu-item index="2-2">通知管理</el-menu-item>
        </router-link>
        <router-link to="/reservation">
          <el-menu-item index="2-3">借阅管理</el-menu-item>
        </router-link>
        <router-link to="/borrow">
          <el-menu-item index="2-4">预约管理</el-menu-item>
        </router-link>
      </el-sub-menu>
      <el-sub-menu index="3" to="/users">
        <template #title>
          <router-link to="/users">用户管理</router-link>
        </template>
        <el-menu-item index="3-1">管理员信息</el-menu-item>
        <el-menu-item index="3-2">用户信息</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {
  Menu
} from '@element-plus/icons-vue'
export default {
  name: "Aside",
  components: {Menu}
}
</script>


<style>

</style>