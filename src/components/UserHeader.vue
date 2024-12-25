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
    <router-link to="/user" style="text-decoration: none;">
      <div style="width: 200px; display: flex; margin-left: 5px;">
        <img src="@/assets/books.png" alt="" style="width: 40px;height: 40px"/>
        <span style="font-size: 22px; color:#efe6e6">图书管理系统</span>
      </div>
    </router-link>
    <!--左侧Logo,标题区域结束-->

    <!-- 搜索框区域开始 -->
    <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
      <el-input
          v-model="searchQuery"
          placeholder="请输入书名进行搜索"
          style="width: 300px; border-radius: 25px; font-size: 18px;"
          suffix-icon="el-icon-search"
          @keyup.enter="handleSearch"
      ></el-input>
      <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 10px; font-size: 18px; padding: 0 30px; display: flex; align-items: center; justify-content: center;"
          @click="handleSearch"
      >
        搜索
      </el-button>
    </div>
    <!-- 搜索框区域结束 -->

    <div style="flex: 1"></div>

    <!--右侧 用户头像、用户名 区域开始-->
    <div style="width: fit-content; display: flex; align-items: center; padding-right: 25px">
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" style="width: 40px;height: 40px"/>
      <el-dropdown style="padding-left: 20px">
        <span class="el-dropdown-link" style="font-size: 20px; color: gold" >{{data.user.username}}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goToBorrow">我的借阅</el-dropdown-item>
            <el-dropdown-item @click="goToReservation">我的预约</el-dropdown-item>
            <el-dropdown-item @click="goToPersonalInfo">个人信息</el-dropdown-item>
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// 响应式数据
const data = reactive({
  user: JSON.parse(localStorage.getItem("userdata")),
});

// 搜索框的绑定值
const searchQuery = ref("");

// 路由实例
const router = useRouter();

// 处理搜索逻辑
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 假设你有一个图书搜索页面，可以将搜索内容传递给该页面
    router.push({ path: "/search", query: { query: searchQuery.value } });
  } else {
    alert("请输入有效的书名");
  }
};


// 跳转到用户图书借阅页面
const goToBorrow = () => {
  router.push("/user/bookBorrow");
};

// 跳转到用户图书预约页面
const goToReservation = () => {
  router.push("/user/bookReservation");
};

// 跳转到用户个人信息页面
const goToPersonalInfo = () => {
  router.push("/user/personalInfo");
};

</script>

<style scoped>
/* 可根据需要调整样式 */
</style>
