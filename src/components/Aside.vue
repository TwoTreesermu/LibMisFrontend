<template>
  <div>
    <!-- @open="handleOpen"-->
    <!-- @close="handleClose"-->
    <el-menu
        style="width: 200px"
        default-active="2"
        class="el-menu-vertical-demo">

      <el-sub-menu index="1">
        <template #title>信息管理</template>
        <el-menu-item index="1-1">图书管理</el-menu-item>
        <el-menu-item index="1-2">通知管理</el-menu-item>
        <el-menu-item index="1-3">借阅管理</el-menu-item>
        <el-menu-item index="1-3">预约管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>用户管理</template>
        <el-menu-item index="2-1">管理员信息</el-menu-item>
        <el-menu-item index="2-2">用户信息</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside"
}
</script>


<style>

</style>