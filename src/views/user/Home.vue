<template>
  <div>
    <Header/>
  </div>


  <div class="main-content">
    <div style="display: flex; grid-gap: 10px">

      <!-- 分类开始 -->
      <div style="width: 150px; padding: 10px; background-color: #eeeeee">
        <div style="text-align: center; margin-bottom: 20px">
          <img src="@/assets/book.png" alt="" style="width: 50%">
          <div style="font-size: 12px; color: saddlebrown">莫负年华，阅读正当时</div>
        </div>
        <el-row :gutter="10">
          <el-col :span="12" style="text-align: center; margin-bottom: 10px" v-for="item in data.categoryList" :key="item.id">
            <a style="color: #333">{{ item.name }}</a>
          </el-col>
        </el-row>

      </div>
      <!-- 分类结束 -->

    </div>
  </div>

</template>




<script setup>

import Header from "@/components/Header.vue";

const componentName = "User"

import {reactive} from "vue";
import request from "@/utils/request";

const data = reactive( {
  categoryList: []
})

request.get('/api/bookCategory/categoryList').then(res => {
  data.categoryList = res.data
})


</script>





<style scoped>

</style>