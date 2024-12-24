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
            <img :src="item.coverPic" alt="" style="width: 100%; height: 250px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
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
});

// 请求图书分类列表并根据 categoryId 获取对应的 categoryName
onMounted(() => {
  // 请求所有图书分类列表
  request.get('/api/bookCategory/categoryList')
      .then(res => {
        data.categoryList = res.data;
        const categoryId = Number(route.params.categoryId);  // 获取传递的 categoryId 并强制转换为数字
        // 根据 categoryId 找到对应的 categoryName
        const category = data.categoryList.find(book => book.categoryId === categoryId);
        if (category) {
          data.categoryName = category.categoryName;  // 获取并存储对应的 categoryName
        } else {
          console.warn('未找到对应的 categoryId');
        }
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