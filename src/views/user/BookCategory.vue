<template>
  <UserHeader />
  <div style="flex: 1; padding-left: 120px; padding-right: 120px; margin-top: 40px;">
    <div style="margin-bottom: 30px">
      <div style="padding-bottom: 10px; color: #1149a9; font-size: 24px; border-bottom: 2px solid #1149a9; margin-bottom: 10px;">
        <strong>{{ data.categoryName }}类</strong>图书
      </div>
      <el-row :gutter="20">
        <!-- 这里使用 paginatedBooks 来遍历当前页的数据 -->
        <el-col @click="goBookDetail(item.bookId)" :span="6" v-for="item in paginatedBooks" :key="item.bookId" style="margin-bottom: 20px; cursor: pointer">
          <div class="book-box">
            <img :src="item.coverPic" alt="" style="width: 100%; height: 400px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
          </div>
          <div style="margin: 5px 0; font-size: 14px; font-weight: bold" class="line1">{{ item.title }}</div>
          <div style="margin: 5px 0; font-size: 12px; color: #666" class="line1">{{ item.author }}</div>
          <div style="margin: 5px 0; font-size: 12px; color: #666" class="line1">借阅量：{{ item.borrowedCount }}</div>
        </el-col>
      </el-row>

      <!-- 分页组件 -->
      <el-pagination
          :current-page="data.currentPage"
          :page-size="data.pageSize"
          :total="data.categoryBookList.length"
          @current-change="handlePageChange"
          layout="prev, pager, next, jumper"
          style="margin-top: 20px; text-align: center;"
      />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, onMounted, reactive } from "vue";
import request from "@/utils/request";
import router from "@/router";
import UserHeader from "@/components/UserHeader.vue";
import Footer from "@/components/Footer.vue";
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
// 获取路由参数
const route = useRoute();
const categoryId = route.params.categoryId;  // 从路由参数中提取 categoryId

// 创建响应式数据
const data = reactive({
  categoryName: '',  // 存储找到的 categoryName
  categoryList: [],  // 存储所有图书分类列表
  bookList: [],  // 存储所有图书列表
  categoryBookList: [],  // 存储当前分类下的图书列表
  currentPage: 1,  // 当前页码
  pageSize: 4,  // 每页显示的图书数量
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
});

// 请求图书分类列表并根据 categoryId 获取对应的 categoryName
onMounted(() => {

  request.get('/api/bookCategory/find/'+ categoryId)
      .then(res => {
        data.categoryList = res.data;
        // console.log("res.data--", res.data);
        // console.log("data.categoryList", res.data.categoryName)
        data.categoryName = res.data.categoryName;
      })
      .catch(error => {
        console.error('获取图书分类列表失败', error);
      });
});

// 请求图书列表并根据 categoryId 获取所有对应分类的图书信息
onMounted(() => {
  // 请求所有图书列表
  request.get('/api/books/booksList')
      .then(res => {
        data.bookList = res.data;
        const categoryId = Number(route.params.categoryId);  // 获取传递的 categoryId 并强制转换为数字
        // 根据 categoryId 找到所有符合的图书信息
        data.categoryBookList = data.bookList.filter(book => book.categoryId === categoryId);
        // 给每本书分配封面图片
        data.categoryBookList.forEach((book, index) => {
          // 根据索引从 coverPicList 中获取封面图，假设bookId与索引一一对应
          book.coverPic = data.coverPicList[index];  // 使用 index 作为图片的映射
        });
      })
      .catch(error => {
        console.error('获取图书列表失败', error);
      });
});

// goBookDetail 方法接收 bookId 作为参数
const goBookDetail = (bookId) => {
  router.push({ name: 'BookDetail', params: { bookId } });
};

// 计算分页后的图书列表
const paginatedBooks = computed(() => {
  const startIndex = (data.currentPage - 1) * data.pageSize;
  return data.categoryBookList.slice(startIndex, startIndex + data.pageSize);
});

// 处理页码变化
const handlePageChange = (newPage) => {
  data.currentPage = newPage;
};
</script>