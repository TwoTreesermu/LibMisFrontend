<template>
  <!--左侧导航菜单-->
  <div style="width: 150px;border-right: #ddd solid 1px;
              height: calc(100vh - 60px);">
    <!-- @open="handleOpen"-->
    <!-- @close="handleClose"-->
    <el-menu router :default-active="router.currentRoute.value.path" style="border: 0">
      <el-menu-item index="/manager/homePage">
        <el-icon><House /></el-icon>
          系统首页
      </el-menu-item>

      <el-menu-item index="/manager/dataAnalysis">
        <el-icon><DataAnalysis/></el-icon>
        数据统计
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><Memo /></el-icon>
          信息管理
        </template>
          <el-menu-item index="">图书分类</el-menu-item>             <!-- 还没写视图-->
          <el-menu-item index="/manager/book">图书信息</el-menu-item>
          <el-menu-item index="/manager/notification">通知管理</el-menu-item>
          <el-menu-item index="/manager/borrow">借阅管理</el-menu-item>
          <el-menu-item index="/manager/reservation">预约管理</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><User /></el-icon>
          用户管理
        </template>
          <el-menu-item index="/manager/administration">管理员信息</el-menu-item>
          <el-menu-item index="/manager/user">普通用户信息</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/login">
        <el-icon><SwitchButton /></el-icon>
        退出登录
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import {
  DataAnalysis,
  House, Memo, SwitchButton,

} from '@element-plus/icons-vue'
import router from "@/router";

const componentName ="Aside";

</script>


<style>
.el-menu .is-active {
  background-color: #e6ecf7 !important;
}
</style>