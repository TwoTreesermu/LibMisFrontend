<template>
  <div>
    <!-- 用户头部 -->
    <UserHeader />
    <div style="width: 60%; margin: 10px auto;">
      <div style="margin: 20px 0; display: flex; align-items: flex-start; gap: 20px;">
        <!-- 分类 -->
        <div>
          <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
            <!-- "全部" 分类 -->
            <strong
                :class="['item', { active: selectedCategory === '全部' }]"
                @click="selectCategory('全部')"
                style="text-align: center; cursor: pointer;">
              全部
            </strong>

            <!-- 循环显示分类列表 -->
            <div v-if="data.categoryList.length === 0" style="flex: 1 1 0; text-align: center; margin-bottom: 5px">
              加载中...
            </div>
            <div v-else style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-start;">
              <el-col
                  v-for="item in data.categoryList"
                  :key="item.categoryId"
                  :span="4"
                  style="text-align: center; margin-bottom: 5px; cursor: pointer;"
                  @click="selectCategory(item.categoryName)">
                {{ item.categoryName }}
              </el-col>
            </div>
          </div>
        </div>

        <!-- 搜索 -->
        <div style="flex: 1 1 0; display: flex;">
          <div class="el-input el-input--large" style="flex: 1 1 0; margin-right: 5px"></div>
          <button>搜索</button>
        </div>
      </div>

      <!-- 图书展示 -->
      <div class="el-row" style="margin-left: -10px; margin-right: -10px;">
        <el-row :gutter="20">
          <el-col @click="goBookDetail(item.bookId)" :span="6" v-for="item in data.BookList" :key="item.bookId" style="margin-bottom: 20px; cursor: pointer">
            <div class="book-box">
              <img :src="item.coverPic" alt="" style="width: 100%; height: 250px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1)">
            </div>
            <div style="margin: 5px 0; font-size: 14px; font-weight: bold" class="line1">{{ item.title }}</div>
            <div style="margin: 5px 0; font-size: 12px; color: #666" class="line1">{{ item.author }}</div>
            <div style="margin: 5px 0; font-size: 12px; color: #666" class="line1">借阅量：{{ item.borrowedCount }}</div>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div style="margin: 20px 0;">
        <div class="el-pagination is-background"></div>
      </div>
    </div>
  </div>
  <Footer />
</template>


<script setup>
import UserHeader from "@/components/UserHeader.vue";
import { reactive, ref } from "vue";
import request from "@/utils/request";
import router from "@/router";
import Footer from "@/components/Footer.vue";

const data = reactive({
  categoryList: [],  // 分类列表
  BookList: []       // 图书列表
});

const selectedCategory = ref('全部');  // 当前选择的分类

// 查询分类信息
request.get('/api/bookCategory/categoryList')
    .then(res => {
      data.categoryList = res.data;
    })
    .catch(error => {
      console.error('获取分类列表失败', error);
    });

// 查询图书列表
const fetchBooks = (category) => {
  let url = '/api/books/booksList';
  if (category !== '全部') {
    url = `/api/books/booksList?category=${category}`;  // 假设接口支持按分类筛选
  }

  request.get(url)
      .then(res => {
        data.BookList = res.data;
      })
      .catch(error => {
        console.error('获取图书列表失败', error);
      });
};

// 选择分类
const selectCategory = (category) => {
  selectedCategory.value = category;  // 更新选中的分类
  fetchBooks(category);  // 根据分类更新图书列表
};

// goBookDetail 方法接收 bookId 作为参数
const goBookDetail = (bookId) => {
  router.push({ name: 'BookDetail', params: { bookId } });
};

// 初次加载时，展示所有图书
fetchBooks('全部');

</script>


<style scoped>
/* 样式可以根据需求进行修改 */
</style>
