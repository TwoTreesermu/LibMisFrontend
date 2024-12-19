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
          <el-col :span="12" style="text-align: center; margin-bottom: 10px" v-for="item in data.categoryList" :key="item.categoryId">
            <a style="color: #333333" href="'/front/search?categoryName=' + item.categoryName">{{ item.categoryName }}</a>
          </el-col>
        </el-row>
      </div>
      <!-- 分类结束 -->
      <!-- 轮播图开始 -->
      <div style="width: 880px; padding: 10px">
        <el-carousel height="320px">
          <el-carousel-item v-for="item in data.imgs" :key="item">
            <img :src="item" alt="" style="width: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 轮播图结束 -->
      <!-- 排行榜结束 -->
      <div style="width: 220px; padding: 10px">
        <div style="color: goldenrod; font-size: 20px; margin-bottom: 15px">图书借阅排行榜</div> //这里的 item.bookid 应该先用图书信息表按借阅量排序后的新id
        <div @click="goPage('/front/bookDetail?id=' + item.bookId)" v-for="(item, index) in data.rankBookList" :key="item.bookId"
             style="padding: 10px 0; cursor: pointer; border-bottom: 1px solid #ddd">
          <div style="display: flex; grid-gap: 10px" v-if="index === data.currentIndex">
            <div style="width: 10px; color: orangered; font-weight: bold">{{ index + 1 }}</div>
            <div style="width: 50px">
              <img :src="item.coverPic" alt="" style="width: 100%">
            </div>
            <div style="flex: 1; width: 0; font-size: 12px">
              <div style="margin-bottom: 5px" class="line1">{{ item.title }}</div>
              <div style="color: #666" class="line2">{{ item.introduction }}</div>
            </div>
          </div>
          <div @mouseover="changeIndex(index)" v-else style="display: flex; align-items: center; grid-gap: 10px; font-size: 12px">
            <div style="width: 10px">{{ index + 1 }}</div>
            <div style="flex: 1; width: 0" class="line1">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <!-- 排行榜结束 -->


    </div>
  </div>

</template>




<script setup>

import Header from "@/components/Header.vue";

const componentName = "User"

import {reactive} from "vue";
import request from "@/utils/request";
import img1 from '@/assets/imgs/1.jpg'
import img2 from '@/assets/imgs/2.jpg'
import img3 from '@/assets/imgs/3.jpg'

const data = reactive( {
  categoryList: [],
  imgs: [img1, img2, img3],
  rankBookList: [],
  currentIndex: 0 // 图书排行榜里高亮选中的序号
})

request.get('/api/bookCategory/categoryList').then(res => {
  data.categoryList = res.data
})

request.get('/api/books/booksList').then(res => {
  data.rankBookList = res.data.splice(0,5)
})

const changeIndex = (index) => {
  data.currentIndex = index
}

const goPage = (path) => {
  location.href = path
}

</script>





<style scoped>
a:hover {
  color: red !important;
  text-decoration: underline;
  font-weight: bold;
}

</style>