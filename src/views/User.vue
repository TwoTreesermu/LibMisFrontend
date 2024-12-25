<template>
  <div>
    <UserHeader />
  </div>

  <div class="main-content" style="margin-left: 120px; margin-right: 120px">
    <div style="display: flex; gap: 20px;">
      <!-- 分类开始 -->
      <div style="width: 160px; padding: 20px; background-color: #f7f7f7; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
        <div style="text-align: center; margin-bottom: 20px">
          <img src="@/assets/book.png" alt="" style="width: 50%">
          <div style="font-size: 14px; color: #8b5a2b; margin-top: 10px;">阅读，让心灵在书海中自由翱翔</div>
        </div>
        <el-row :gutter="10">
          <el-col :span="12" style="text-align: center; margin-bottom: 10px" v-for="item in data.categoryList" :key="item.categoryId">
            <!-- 使用 @click 绑定 goPage 方法，传入 item.categoryName -->
            <a style="color: #333; font-size: 14px" @click="goCategory(item.categoryId)">{{ item.categoryName }}</a>
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
        <div @click="goBookDetail(item.bookId)" v-for="(item, index) in data.rankBookList" :key="item.bookId"
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
            <!-- 每本书的列 -->
            <el-col
                @click="goBookDetail(item.bookId)"
                :span="6"
                v-for="item in data.newBookList"
                :key="item.bookId"
                style="margin-bottom: 20px; cursor: pointer; padding: 0 10px; display: flex; flex-direction: column; justify-content: space-between;">

              <div class="book-box" style="flex-grow: 1;">
                <!-- 设置固定的高度并保持宽度自适应 -->
                <img
                    :src="item.coverPic"
                    alt="书籍封面"
                    style="width: 100%; height: 300px; object-fit: cover; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
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
            <div @click="goComment(item.commentId)" v-for="item in data.commentList" :key="item.commentId" style="margin-bottom: 15px; padding: 10px; background-color: #f7f7f7; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); cursor: pointer">
              <div style="font-size: 15px; color: #333" class="activity-item line2">{{ item.commentText }}</div>
              <span style="font-size: 12px; color: #888; margin-right: 30px;" class="line1">点赞数：{{ item.likes }}</span>
              <span style="font-size: 12px; color: #888; margin-right: 30px;" class="line1">图书名：{{ getBookName(item.bookId) }}</span>
              <span style="font-size: 12px; color: #888; margin-right: 30px;" class="line1">发布者：{{ getUserName(item.userId) }}</span>
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

import UserHeader from "@/components/UserHeader.vue";
import Footer from "@/components/Footer.vue";

const componentName = "User"

import {reactive} from "vue";
import request from "@/utils/request";
import img1 from '@/assets/imgs/轮播图1.jpg'
import img2 from '@/assets/imgs/轮播图2.jpg'
import img3 from '@/assets/imgs/轮播图3.jpg'
import img4 from '@/assets/imgs/轮播图4.jpg'
import img5 from '@/assets/imgs/轮播图5.jpg'

import coverPic1 from '@/assets/coverPic/1.jpg';
import coverPic2 from '@/assets/coverPic/2.jpg';
import coverPic3 from '@/assets/coverPic/3.jpg';
import coverPic4 from '@/assets/coverPic/4.jpg';
import coverPic5 from '@/assets/coverPic/5.jpg';
import coverPic6 from '@/assets/coverPic/6.jpg';
import coverPic7 from '@/assets/coverPic/7.jpg';
import coverPic8 from '@/assets/coverPic/8.jpg';
import coverPic9 from '@/assets/coverPic/9.jpg';
import coverPic10 from '@/assets/coverPic/10.jpg';
import coverPic11 from '@/assets/coverPic/11.jpg';
import coverPic12 from '@/assets/coverPic/12.jpg';
import coverPic13 from '@/assets/coverPic/13.jpg';
import coverPic14 from '@/assets/coverPic/14.jpg';
import coverPic15 from '@/assets/coverPic/15.jpg';
import coverPic16 from '@/assets/coverPic/16.jpg';
import coverPic17 from '@/assets/coverPic/17.jpg';
import coverPic18 from '@/assets/coverPic/18.jpg';
import coverPic19 from '@/assets/coverPic/19.jpg';
import coverPic20 from '@/assets/coverPic/20.jpg';
import coverPic21 from '@/assets/coverPic/21.jpg';
import coverPic22 from '@/assets/coverPic/22.jpg';
import coverPic23 from '@/assets/coverPic/23.jpg';
import coverPic24 from '@/assets/coverPic/24.jpg';
import coverPic25 from '@/assets/coverPic/25.jpg';
import coverPic26 from '@/assets/coverPic/26.jpg';
import coverPic27 from '@/assets/coverPic/27.jpg';
import coverPic28 from '@/assets/coverPic/28.jpg';
import coverPic29 from '@/assets/coverPic/29.jpg';
import coverPic30 from '@/assets/coverPic/30.jpg';
import coverPic31 from '@/assets/coverPic/31.jpg';
import coverPic32 from '@/assets/coverPic/32.jpg';
import coverPic33 from '@/assets/coverPic/33.jpg';
import coverPic34 from '@/assets/coverPic/34.jpg';
import coverPic35 from '@/assets/coverPic/35.jpg';
import coverPic36 from '@/assets/coverPic/36.jpg';
import coverPic37 from '@/assets/coverPic/37.jpg';
import coverPic38 from '@/assets/coverPic/38.jpg';
import coverPic39 from '@/assets/coverPic/39.jpg';
import coverPic40 from '@/assets/coverPic/40.jpg';
import coverPic41 from '@/assets/coverPic/41.jpg';
import coverPic42 from '@/assets/coverPic/42.jpg';
import coverPic43 from '@/assets/coverPic/43.jpg';
import coverPic44 from '@/assets/coverPic/44.jpg';
import coverPic45 from '@/assets/coverPic/45.jpg';
import coverPic46 from '@/assets/coverPic/46.jpg';
import coverPic47 from '@/assets/coverPic/47.jpg';
import coverPic48 from '@/assets/coverPic/48.jpg';
import coverPic49 from '@/assets/coverPic/49.jpg';
import coverPic50 from '@/assets/coverPic/50.jpg';


const data = reactive( {
  categoryList: [],
  imgs: [img1, img2, img3, img4, img5],
  rankBookList: [],
  currentIndex: 0, // 图书排行榜里高亮选中的序号
  newBookList: [],
  commentList: [],
  BookList: [],  // 书籍列表
  UserList: [],  // 用户列表
  coverPicList: [
    coverPic1, coverPic2, coverPic3, coverPic4, coverPic5,
    coverPic6, coverPic7, coverPic8, coverPic9, coverPic10,
    coverPic11, coverPic12, coverPic13, coverPic14, coverPic15,
    coverPic16, coverPic17, coverPic18, coverPic19, coverPic20,
    coverPic21, coverPic22, coverPic23, coverPic24, coverPic25,
    coverPic26, coverPic27, coverPic28, coverPic29, coverPic30,
    coverPic31, coverPic32, coverPic33, coverPic34, coverPic35,
    coverPic36, coverPic37, coverPic38, coverPic39, coverPic40,
    coverPic41, coverPic42, coverPic43, coverPic44, coverPic45,
    coverPic46, coverPic47, coverPic48, coverPic49, coverPic50
  ],
})

// 查询分类信息
request.get('/api/bookCategory/categoryList')
    .then(res => {
      data.categoryList = res.data;
    })
    .catch(error => {
      console.error('获取分类列表失败', error);
    });

// 查询图书排行
request.get('/api/books/booksList')
    .then(res => {
      // 按借阅量（borrowedCount）降序排序，并取前五个图书
      data.rankBookList = res.data
          .sort((a, b) => b.borrowedCount - a.borrowedCount)  // 降序排序
          .splice(0, 5);  // 取前五个
      // 给每本书分配封面图片
      data.rankBookList.forEach((book, index) => {
        // 根据索引从 coverPicList 中获取封面图，假设bookId与索引一一对应
        book.coverPic = data.coverPicList[index];  // 使用 index 作为图片的映射
      });
    })
    .catch(error => {
      console.error('获取图书列表失败', error);
    });

// 查询新书上架
request.get('/api/books/booksList')
    .then(res => {
      // 按 bookId 降序排序，并取前8个图书
      data.newBookList = res.data
          .sort((a, b) => b.bookId - a.bookId)  // 按 bookId 降序排序
          .splice(0, 8);  // 取前8个
      // 给每本书分配封面图片
      data.newBookList.forEach((book, index) => {
        // 根据索引从 coverPicList 中获取封面图，假设bookId与索引一一对应
        book.coverPic = data.coverPicList[49-index];  // 使用 index 作为图片的映射
      });
    })
    .catch(error => {
      console.error('获取图书列表失败', error);
    });


// 查询高赞书评
request.get('/api/comment/getComment')
    .then(res => {
      if (res.data && Array.isArray(res.data)) {
        data.commentList = res.data
            .sort((a, b) => b.likes - a.likes)
            .splice(0, 5);
      } else {
        data.commentList = [];
        console.error('返回数据格式错误');
      }
    })
    .catch(error => {
      console.error('获取评论列表失败', error);
    });

// 查询图书列表
request.get('/api/books/booksList')
    .then(res => {
      data.BookList = res.data;
    })
    .catch(error => {
      console.error('获取图书列表失败', error);
    });

// 查询用户列表
request.get('/api/users/usersList')
    .then(res => {
      data.UserList = res.data;
    })
    .catch(error => {
      console.error('获取用户列表失败', error);
    });

const changeIndex = (index) => {
  data.currentIndex = index
}

import { useRouter } from 'vue-router';

const router = useRouter();  // 获取路由实例

// goCategory 方法接收 categoryId
const goCategory = (categoryId) => {
  router.push({ name: 'BookCategory', params: { categoryId } });  // 使用路由的 name 跳转
};

// goBookDetail 方法接收 bookId 作为参数
const goBookDetail = (bookId) => {
  router.push({ name: 'BookDetail', params: { bookId } });
};

// goComment 方法接收 commentId 作为参数
const goComment = (bookId) => {
  router.push({ name: 'BookComment', params: { commentId } });  // 使用路由的 name 跳转
};

// 获取图书名
const getBookName = (bookId) => {
  const book = data.BookList.find(b => b.bookId === bookId);
  return book ? book.title : '未知书籍';
};

// 获取用户名
const getUserName = (userId) => {
  const user = data.UserList.find(u => u.userId === userId);
  return user ? user.userName : '未知用户';
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