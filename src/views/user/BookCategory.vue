<template>
  <div>
    <h2>图书分类</h2>
    <p>分类ID：{{ categoryId }}</p>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';

// 获取路由参数
const route = useRoute();
const categoryId = route.params.categoryId;  // 从路由参数中提取 categoryId
</script>