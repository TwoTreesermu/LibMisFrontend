<template>
  <div>
    <h2>图书评论</h2>
    <p>评论ID：{{ commentId }}</p>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';

// 获取路由参数
const route = useRoute();
const commentId = route.params.commentId;  // 从路由参数中提取 commentId
</script>