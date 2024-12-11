<template>
<div>
  <h1>登录页面</h1>

    <el-button type="primary" @click="router.push({path:'/manager',})">跳转到管理员页面</el-button>
    <el-button type="primary" @click="router.push({path:'/user',})">跳转到用户页面</el-button>

</div>
</template>

<script setup>
import router from "@/router";

const componentName ="Login"
</script>



<style>

</style>