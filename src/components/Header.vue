<template>
  <div style="margin-left: 10px;align-items: center; height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display:
flex">
    <el-avatar>Book</el-avatar>
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">
      图书管理系统
    </div>
    <div style="flex: 1"></div>
    <div style="width: 150px; display: flex; justify-content: center; align-items: center; font-size: 16px;">

      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar>tom</el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>
<script>

export default {
  name: "Header"
}
</script>


<style>

</style>