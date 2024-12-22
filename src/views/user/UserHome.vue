<template>
  <div>
    <Header />
  </div>

  <div class="main-content" style="margin-left: 120px; margin-right: 120px">
    <div style="display: flex; gap: 20px;">
      <!-- 分类开始 -->
      <div style="width: 160px; padding: 20px; background-color: #f7f7f7; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
        <div style="text-align: center; margin-bottom: 20px">
          <img src="@/assets/book.png" alt="" style="width: 50%">
          <div style="font-size: 14px; color: #8b5a2b; margin-top: 10px;">莫负年华，阅读正当时</div>
        </div>
        <el-row :gutter="10">
          <el-col :span="12" style="text-align: center; margin-bottom: 10px" v-for="item in data.categoryList" :key="item.categoryId">
            <a style="color: #333; font-size: 14px" :href="'/user/search?categoryName=' + item.categoryName">{{ item.categoryName }}</a>
          </el-col>
        </el-row>
      </div>
      <!-- 分类结束 -->

      <!-- 轮播图开始 -->
      <div style="flex: 1; padding: 10px; border-radius: 8px; background-color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
        <el-carousel height="320px" arrow="always">
          <el-carousel-item v-for="item in data.imgs" :key="item">
            <img :src="item" alt="" style="width: 100%; border-radius: 8px;">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 轮播图结束 -->

      <!-- 排行榜开始 -->
      <div style="width: 220px; padding: 20px; background-color: #f7f7f7; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
        <div style="color: goldenrod; font-size: 20px; margin-bottom: 15px;">图书借阅排行榜</div>
        <div @click="goPage('/user/bookDetail/' + item.bookId)" v-for="(item, index) in data.rankBookList" :key="item.bookId"
             style="padding: 10px 0; cursor: pointer; border-bottom: 1px solid #ddd; transition: background-color 0.3s;">
          <div style="display: flex; gap: 10px" v-if="index === data.currentIndex">
            <div style="width: 10px; color: orangered; font-weight: bold">{{ index + 1 }}</div>
            <div style="width: 50px">
              <img :src="item.coverPic" alt="" style="width: 100%; border-radius: 5px;">
            </div>
            <div style="flex: 1; width: 0; font-size: 14px">
              <div style="margin-bottom: 5px; font-weight: bold;" class="line1">{{ item.title }}</div>
              <div style="color: #666" class="line2">{{ item.introduction }}</div>
            </div>
          </div>
          <div @mouseover="changeIndex(index)" v-else style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #555">
            <div style="width: 10px">{{ index + 1 }}</div>
            <div style="flex: 1; width: 0" class="line1">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <!-- 排行榜结束 -->
    </div>

    <div style="display: flex; gap: 20px; margin-top: 20px; justify-content: space-between;">
      <!-- 左边的区域开始-->
      <div style="flex: 7">
        <div style="margin-bottom: 30px">
          <div style="padding-bottom: 10px; color: #1149a9; font-size: 24px; border-bottom: 2px solid #1149a9; margin-bottom: 10px;">
            <strong>新</strong>书上架
          </div>
          <el-row :gutter="20">
            <el-col @click="goPage('/user/bookDetail/' + item.bookId)" :span="6" v-for="item in data.newBookList" :key="item.bookId" style="margin-bottom: 20px; cursor: pointer">
              <div class="book-box">
                <img :src="item.coverPic" alt="" style="width: 100%; height: 250px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
              </div>
              <div style="margin: 5px 0; font-size: 14px; font-weight: bold" class="line1">{{ item.title }}</div>
              <div style="margin: 5px 0; font-size: 12px; color: #666" class="line1">{{ item.author }}</div>
              <div style="margin: 5px 0; font-size: 12px; color: #666" class="line1">借阅量：{{ item.borrowedCount }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 左边的区域结束 -->

      <!-- 右边的区域开始-->
      <div style="flex: 3">
        <div style="margin-bottom: 30px">
          <div style="padding-bottom: 10px; color: orange; font-size: 24px; border-bottom: 2px solid orange; margin-bottom: 10px;">
            <strong>高赞</strong>书评
          </div>
          <div>
            <div @click="goPage('user/commentDetail?id=' + item.commentId)" v-for="item in data.commentList" :key="item.commentId" style="margin-bottom: 15px; padding: 10px; background-color: #f7f7f7; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); cursor: pointer">
              <div style="font-size: 15px; color: #333" class="activity-item line2">{{ item.commentText }}</div>
              <div style="font-size: 12px; color: #888" class="line1">点赞数：{{ item.likes }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边的区域结束-->
    </div>
  </div>
  <Footer />
</template>







<script setup>

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

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
  currentIndex: 0, // 图书排行榜里高亮选中的序号
  newBookList: [],
  commentList: []
})

// 查询分类信息
request.get('/api/bookCategory/categoryList').then(res => {
  data.categoryList = res.data
})

// 查询图书排行
request.get('/api/books/booksList').then(res => {  //这个booksList后续需要替换成，后端提供的按借阅量降序排序后的list
  data.rankBookList = res.data.splice(0,5)
})

// 查询新书上架
request.get('/api/books/booksList').then(res => {  //这里的新书上架，我理解为是按 bookId 降序排列的“新” or 按 publishDate 降序排列的新？
  data.newBookList = res.data.splice(0,8)
})

// 查询高赞书评
request.get('/api/comment/commentList').then(res => {  // 评论按点赞数降序排列
  data.newBookList = res.data.splice(0,8)
})

const changeIndex = (index) => {
  data.currentIndex = index
}

import { useRouter } from 'vue-router';

const router = useRouter();  // 获取路由实例

const goPage = (bookId) => {
  console.log("Navigating to:", `/user/bookDetail/${bookId}`);
  router.push(`/user/bookDetail/${bookId}`);
};

</script>





<style scoped>
a:hover {
  color: red !important;
  text-decoration: underline;
  font-weight: bold;
}

.activity-item:hover {
  cursor: pointer;
  color: #1890ff !important;
  text-decoration: underline;
}

.book-box {
  overflow: hidden;
}
.book-box:hover img {
  scale: 1.2;
}
.book-box img {
  transition: all 0.5s;
}

</style>