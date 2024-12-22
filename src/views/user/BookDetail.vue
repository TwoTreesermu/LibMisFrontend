<template>

  <div>
    <Header />
  </div>

  <div>
    <div style="width: 60%; margin: 10px auto">
      <div style="display: flex; gap: 20px">
        <img v-if="bookDetail.bookInfo" :src="bookDetail.bookInfo.coverPic" alt="图书封面" style="width: 300px; height: 350px;">
<!--        <img-->
<!--            v-if="bookDetail.bookInfo"-->
<!--            style="width: 300px; height: 350px;"-->
<!--            :src="bookDetail.bookInfo.coverPic"-->
<!--            alt="图书封面"-->
<!--        />-->
        <div style="flex: 1 1 0;">

          <!-- 图书标题 -->
          <div style="margin-bottom: 10px; font-size: 28px; font-weight: bold; text-align: justify">
            {{ bookDetail.bookInfo ? bookDetail.bookInfo.title : '加载中' }}
          </div>

          <!-- 图书简介 -->
          <div class="line3" style="margin-bottom: 10px; font-size: 16px; color: rgb(102, 102, 102); text-align: justify; line-height: 24px">
            {{ bookDetail.bookInfo ? bookDetail.bookInfo.introduction : '加载中' }}
          </div>

          <!-- 图书具体信息 -->
          <div style="margin-bottom: 10px; background-color: rgb(242, 242, 242); padding: 15px; border-radius: 5px; color: rgb(102, 102, 102);" >
            <div style="margin-bottom: 10px; display: flex">
              <div style="flex: 1 1 0%;">
                作者：
                <span style="color: rgb(51, 51, 51);">{{ bookDetail.bookInfo ? bookDetail.bookInfo.author : '加载中' }}</span>
              </div>
              <div style="flex: 1 1 0%;">
                出版社：
                <span style="color: rgb(51, 51, 51)">{{ bookDetail.bookInfo ? bookDetail.bookInfo.publisher : '加载中' }}</span>
              </div>
              <div style="flex: 1 1 0%;">
                出版日期：
                <span style="color: rgb(51, 51, 51)">{{ formattedPublishDate }}</span>
              </div>
            </div>
            <div style="display: flex">
              <div style="flex: 1 1 0%;">
                ISBN：
                <span style="color: rgb(51, 51, 51);">{{ bookDetail.bookInfo ? bookDetail.bookInfo.isbn : '加载中' }}</span>
              </div>
              <div style="flex: 1 1 0%;">
                零售价：
                <span style="color: rgb(51, 51, 51);">{{ bookDetail.bookInfo ? bookDetail.bookInfo.price : '加载中' }}</span>
              </div>
              <div style="flex: 1 1 0%;">
                剩余库存：
<!--                <span style="color: rgb(51, 51, 51);">{{ bookDetail.bookStorage ? bookDetail.bookStorage.realQuantity : '加载中' }}</span>-->
              </div>
            </div>
          </div>

          <!-- 借阅须知 -->
          <div style="margin-bottom: 10px; background-color: rgb(253, 251, 238); color: rgb(51, 51, 51); padding: 15px;">
            借阅须知：借阅书籍如果出现破损需借阅者承担借书全部费用，默认可借阅30天， 逾期未归还图书会扣除信誉分，信誉分低于50无法借阅图书
          </div>

          <!-- 借阅数量控制 -->
          <div style="margin-bottom: 10px;">
            <el-input-number
                v-model="borrowQuantity.count"
                :min="1"
                :max="bookDetail.bookInfo ? bookDetail.bookInfo.realQuantity : 10"
                label="借阅数量"
                style="width: 120px; margin-right: 10px;">
            </el-input-number>
          </div>

          <!-- 借阅按钮 -->
          <button
              aria-disabled="false"
              type="button"
              class="el-button el-button--danger"
              style="padding: 20px 40px;"
              @click="borrowBook"
              :disabled="borrowQuantity.count > (bookDetail.bookInfo ? bookDetail.bookInfo.realQuantity : 0)">
            <span>立即借阅</span>
          </button>

          <!-- 预约按钮 -->
          <button
              aria-disabled="false"
              type="button"
              class="el-button el-button--warning"
              style="padding: 20px 40px;"
              @click="reserveBook">
            <span>立即预约</span>
          </button>

        </div>
      </div>

      <!-- 评论功能 -->
      <div style="margin: 50px 0">
        <div>
          <div style="margin-bottom: 20px; font-size: 22px; font-weight: bold;">评论 {{}}</div>
          <div style="margin-bottom: 20px;">
            <div class="el-textarea">
              <!-- input -->
              <textarea
                  v-model="commentText.text"
                  class="el-textarea__inner"
                  tabindex="0"
                  autocomplete="off"
                  placeholder="请输入评论"
                  rows="2"
                  style="min-height: 31px;">
              </textarea>
            </div>
            <div style="text-align: right; margin-top: 5px;">
              <el-button
                  type="primary"
                  @click="submitComment">
                评论
              </el-button>
            </div>
          </div>
          <div>
            <!---->
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import request from '@/utils/request';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { computed } from 'vue';
import { format } from 'date-fns';

// 获取路由参数
const route = useRoute();

// 创建响应式数据
const bookDetail = reactive({
  bookInfo: null,
  bookList: []  // 存储所有图书列表
});

// 请求图书列表并根据 bookId 获取对应的书籍信息
onMounted(() => {
  // 请求所有图书列表
  request.get('/api/books/booksList')
      .then(res => {
        bookDetail.bookList = res.data;
        const bookId = Number(route.params.bookId);  // 获取传递的 bookId 并强制转换为数字
        // 根据 bookId 找到对应的图书信息
        bookDetail.bookInfo = bookDetail.bookList.find(book => book.bookId === bookId);
      })
      .catch(error => {
        console.error('获取图书列表失败', error);
      });
});

console.log('bookId from route:', route.params.bookId);
console.log('bookList:', bookDetail.bookList);



// 日期格式转换
const formattedPublishDate = computed(() => {
  const publishDate = bookDetail.bookInfo ? bookDetail.bookInfo.publishDate : '加载中';
  if (publishDate === '加载中') {
    return publishDate;
  }
  // 格式化日期
  return format(new Date(publishDate), 'yyyy-MM-dd');
});

// 借阅数量控制
const borrowQuantity = reactive({
  count: 1  // 初始借阅数量
});

// 评论内容
const commentText = reactive({
  text: ''  // 用于存储用户输入的评论内容
});

// // 借阅功能
// const borrowBook = () => {
//   if (borrowQuantity.count > 0 && borrowQuantity.count <= bookDetail.bookInfo.realQuantity) {
//     // 调用借阅接口
//     request.post('/api/borrow', {
//       bookId: bookDetail.bookInfo.bookId,
//       quantity: borrowQuantity.count
//     })
//         .then(response => {
//           // 处理成功借阅后的逻辑
//           alert('借阅成功');
//         })
//         .catch(error => {
//           console.error('借阅失败', error);
//           alert('借阅失败');
//         });
//   } else {
//     alert('库存不足');
//   }
// };

// // 预约功能
// const reserveBook = () => {
//   // 调用预约接口
//   request.post('/api/reserve', {
//     bookId: bookDetail.bookInfo.bookId,
//     quantity: borrowQuantity.count
//   })
//       .then(response => {
//         alert('预约成功');
//       })
//       .catch(error => {
//         console.error('预约失败', error);
//         alert('预约失败');
//       });
// };
//
// // 提交评论
// const submitComment = () => {
//   if (commentText.text.trim() === '') {
//     alert('评论内容不能为空');
//     return;
//   }

//   // 调用评论接口
//   request.post('/api/comments', {
//     bookId: bookDetail.bookInfo.bookId,
//     comment: commentText.text
//   })
//       .then(response => {
//         alert('评论成功');
//         commentText.text = '';  // 提交后清空评论框
//       })
//       .catch(error => {
//         console.error('评论失败', error);
//         alert('评论失败');
//       });
// };


</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>