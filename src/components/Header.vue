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
      <img src="@/assets/books.png" alt="" style="width: 50px;height: 50px"/>
      <span style="font-size: 22px; color:#efe6e6">图书管理系统</span>
    </div>
    <!--左侧Logo,标题区域结束-->

    <div style="flex: 1"></div>

    <!--右侧 用户头像、用户名 区开始-->
    <div style="width: fit-content; display: flex; align-items: center; font-size: 16px;padding-right: 10px">
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" style="width: 40px;height: 40px"/>
      <el-dropdown>
        <span class="el-dropdown-link" style="padding-left: 5px">tom</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!--右侧 用户头像、用户名 区结束-->
  </div>
</template>
<script>

// import {UserFilled} from "@element-plus/icons-vue";

export default {
  name: "Header",
  computed: {
  }
}
</script>


<style>

</style>