<template>

  <div>
    <UserHeader />
  </div>

  <div>
    <div style="width: 60%; margin: 10px auto">
      <div style="display: flex; gap: 20px">
        <img v-if="bookDetail.bookInfo" :src="bookDetail.bookInfo.coverPic" alt="图书封面" style="width: 300px; height: 350px;">
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

<!--          &lt;!&ndash; 借阅数量控制 &ndash;&gt;-->
<!--          <div style="margin-bottom: 10px;">-->
<!--            <el-input-number-->
<!--                v-model="borrowQuantity.count"-->
<!--                :min="1"-->
<!--                :max="bookDetail.bookInfo ? bookDetail.bookInfo.realQuantity : 10"-->
<!--                label="借阅数量"-->
<!--                style="width: 120px; margin-right: 10px;">-->
<!--            </el-input-number>-->
<!--          </div>-->

          <!-- 借阅按钮 -->
          <button
              aria-disabled="false"
              type="button"
              class="el-button el-button--danger"
              style="padding: 20px 40px;"
              @click="borrowBook">
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
          <!-- 输入框及评论按钮 -->
          <div style="margin-bottom: 20px;">
            <div class="el-textarea">
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

          <!-- 他人评论展示 -->
          <div>
            <div style="margin-bottom: 20px; font-size: 18px; font-weight: bold;">他人评论：</div>
            <div v-if="comments.length > 0">
              <div v-for="(comment, index) in comments" :key="index" style="margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <!-- 显示用户名 -->
                <div v-if="comment.userId" style="font-weight: bold; color: #333;">
                  {{ comment.userId }}
                </div>
                <div>{{ comment.commentText }}</div> <!-- 显示评论内容 -->
                <div style="font-size: 12px; color: #999; margin-top: 5px;">{{ formatDate(comment.commentDate) }}</div> <!-- 显示评论时间 -->
              </div>
            </div>
            <div v-else style="color: #999;">暂无评论</div> <!-- 如果没有评论，显示暂无评论 -->
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
import UserHeader from "@/components/UserHeader.vue";
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

const commentText = reactive({
  text: '',  // 绑定的评论内容
  UserList: [],  // 存储所有用户列表
});
const comments = reactive([]);

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

  console.log('组件已挂载');
  fetchComments(); // 调用 fetchComments

  // 请求所有用户列表，存储为以 userId 为键的对象
  request.get('/api/users/usersList')
      .then(res => {
        commentText.UserList = res.data.reduce((acc, user) => {
          acc[user.userId] = user.name; // 将用户列表转换为以 userId 为键的对象
          return acc;
        }, {});
      })
      .catch(error => {
        console.error('获取用户列表失败', error);
      });
});


// 日期格式转换
const formattedPublishDate = computed(() => {
  const publishDate = bookDetail.bookInfo ? bookDetail.bookInfo.publishDate : '加载中';
  if (publishDate === '加载中') {
    return publishDate;
  }
  // 格式化日期
  return format(new Date(publishDate), 'yyyy-MM-dd');
});

// 格式化日期为 yyyy-MM-dd hh:mm
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;  // 使用模板字符串
};


// 借阅功能
const borrowedBooks = new Set();  // 用于记录已借阅的书籍ID，Set自动去重

const borrowBook = () => {
  const bookId = bookDetail.bookInfo.bookId;  // 获取当前书籍的 bookId
  const quantity = 1;  // 用户选择的借书数量

  // 检查该书是否已经被借阅
  if (borrowedBooks.has(bookId)) {
    alert('您已经借阅过这本书，不能重复借阅！');
    return;  // 如果已经借阅过，直接返回，不继续执行后续代码
  }

  // 调用后端的借阅接口，将 bookId 作为查询参数传递
  request.post(`/api/borrow/borrowBook?bookId=${bookId}`)
      .then(response => {
        console.log('Response from backend:', response);  // 打印后端响应
        if (response.code === "200") {
          // 借阅成功，记录已借阅的书籍
          borrowedBooks.add(bookId);  // 将这本书添加到已借阅列表中
          alert('借阅成功');
        } else {
          // 显示后端返回的错误信息
          alert(response.msg || '借阅失败');
        }
      })
      .catch(error => {
        console.error('借阅失败', error);
        alert('借阅失败');
      });
};


// 预约功能
const reservedBooks = new Set();  // 记录已预约的书籍ID，Set自动去重

const reserveBook = () => {
  const bookId = bookDetail.bookInfo.bookId;  // 获取当前书籍的 bookId
  const quantity = 1;  // 用户选择的借书数量

  // 检查该书是否已经被预约
  if (reservedBooks.has(bookId)) {
    alert('您已经预约过这本书，不能重复预约！');
    return;  // 如果已经预约过，直接返回，不继续执行后续代码
  }

  // 调用后端的预约接口，将 bookId 作为查询参数传递
  const book = { bookId, quantity };

  request.post('/api/reservation/reserve', book)
      .then(response => {
        console.log('Response from backend:', response);  // 打印后端响应
        if (response.code === "200") {
          // 预约成功，记录已预约的书籍
          reservedBooks.add(bookId);  // 将这本书添加到已预约列表中
          alert('预约成功');
        } else {
          // 显示后端返回的错误信息
          alert(response.msg || '预约失败');
        }
      })
      .catch(error => {
        console.error('预约失败', error);
        alert('预约失败');
      });
};



// // 提交评论
// const submitComment = () => {
//   if (commentText.text.trim() === '') {
//     alert('评论内容不能为空');
//     return;
//   }
//
//   const commentData = {
//     bookId: bookDetail.bookInfo.bookId,
//     comment_text: commentText.text
//   };
//
//   request.post('/api/comment/sendComment', commentData)
//       .then(response => {
//         if (response.code === "200") {
//           alert('评论成功');
//           commentText.text = '';  // 清空评论框
//           // 重新获取评论列表并更新页面（假设有评论接口）
//           fetchComments();
//         } else {
//           alert(response.msg || '评论失败');
//         }
//       })
//       .catch(error => {
//         console.error('评论失败', error);
//         alert('评论失败');
//       });
// };


const submitComment = () => {
  // 检查评论内容是否为空
  if (commentText.text.trim() === '') {
    alert('评论内容不能为空');
    return;
  }

  console.log('评论内容:', commentText.text);

  // 构造评论数据
  const commentData = {
    bookId: bookDetail.bookInfo.bookId,  // 当前书籍ID
    comment_text: commentText.text,  // 评论内容
  };

  console.log('构造评论数据:', commentData);

  // 调用后端的评论接口，提交评论数据
  request.post('/api/comment/sendComment', commentData)
      .then(response => {
        console.log('Response from backend:', response);

        if (response.code === "200") {
          alert('评论成功');
          commentText.text = '';  // 清空评论框
          fetchComments();  // 重新加载评论列表
        } else {
          alert(response.msg || '评论失败');
        }
      })
      .catch(error => {
        console.error('评论失败', error);
        alert('评论失败');
      });
};






// 获取评论列表
const fetchComments = () => {
  const bookId = route.params.bookId;  // 获取当前图书的 ID（从路由中获取）

  // 请求评论接口（假设返回所有评论）
  request.get('/api/comment/getComment')
      .then(response => {
        console.log('评论数据:', response);  // 打印返回的评论数据
        if (response.code === "200") {
          const allComments = response.data;
          // 根据当前的 bookId 过滤出与当前图书相关的评论
          const filteredComments = allComments.filter(comment => String(comment.bookId) === String(bookId));
          comments.splice(0, comments.length, ...filteredComments);  // 使用 splice 直接更新 comments 数组
          console.log('过滤后的评论数据:', filteredComments);  // 打印过滤后的评论数据
        } else {
          console.error('获取评论失败:', response.msg);
        }
      })
      .catch(error => {
        console.error('请求评论失败:', error);
      });
};



</script>

<style scoped>
/* 页脚样式：固定在页面底部 */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}
</style>