<template>
  <div>
    <UserHeader />
  </div>

  <div class="main-body">
    <div class="container">
      <div class="header">我的借阅</div>

      <!-- 查询部分 -->
      <div class="query-section">
        <div class="el-input-wrapper">
          <el-input
              v-model="searchTitle"
              placeholder="请输入书名查询"
              clearable
              class="input-query"
          ></el-input>
        </div>
        <div class="el-input-wrapper">
          <el-input
              v-model="searchId"
              placeholder="请输入借阅编号查询"
              clearable
              class="input-query"
          ></el-input>
        </div>
        <div class="query-buttons">
          <el-button
              type="primary"
              size="large"
              @click="searchBooks"
              class="search-btn"
          >
            查询
          </el-button>
          <el-button
              type="warning"
              size="large"
              @click="resetSearch"
              class="reset-btn"
          >
            重置
          </el-button>
        </div>
      </div>

      <!-- 图书借阅记录 -->
      <el-table :data="paginatedBooks" style="width: 100%;" border>
        <el-table-column label="书籍名称" prop="title"></el-table-column>
        <el-table-column label="借阅编号" prop="id"></el-table-column>
        <el-table-column label="借阅日期" prop="borrowDate"></el-table-column>
        <el-table-column label="借阅天数" prop="borrowDays"></el-table-column>
        <el-table-column label="还书截止日期" prop="dueDate"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
                v-if="row.status === '借阅中'"
                type="success"
                size="small"
                @click="returnBook(row.id)"
            >
              归还
            </el-button>
            <el-button
                v-if="row.status === '已归还'"
                type="warning"
                size="small"
                @click="handleDuplicateBorrow(row.id)"
            >
              重新借阅
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredBooks.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
          class="custom-pagination"
      />
    </div>
  </div>
  <Footer />
</template>



<script>
import UserHeader from "@/components/UserHeader.vue";
import Footer from "@/components/Footer.vue";
import request from "@/utils/request";
import {reactive} from "vue";

export default {
  components: { Footer, UserHeader },
  data() {
    return {
      title: "用户图书借阅页面",
      books: [], // 初始为空，后端请求后填充
      searchTitle: "",
      searchId: "",
      currentPage: 1,
      pageSize: 5, // 每页显示5条记录
    };
  },
  mounted() {
    // 页面加载时请求后端数据
    this.fetchBooks();
  },
  computed: {
    // 计算过滤后的书籍
    filteredBooks() {
      return this.books.filter(book => {
        const matchesTitle = this.searchTitle ? book.title.includes(this.searchTitle) : true;
        const matchesId = this.searchId ? book.id.toString().includes(this.searchId) : true;
        return matchesTitle && matchesId;
      });
    },
    // 计算分页后的书籍数据
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredBooks.slice(start, end);
    }
  },
  methods: {
    // 请求后端数据
    fetchBooks() {
      request.get('/api/borrow/borrowRecordList')
          .then(res => {
            if (res.data && Array.isArray(res.data)) {
              this.books = res.data; // 成功获取数据后赋值给 books
            } else {
              console.error("数据格式错误", res.data);
            }
          })
          .catch(error => {
            console.error('获取分类列表失败', error);
          });
    },
    returnBook(bookId) {
      const book = this.books.find(b => b.id === bookId);
      if (book) {
        book.status = "已归还";
        alert(`图书《${book.title}》已成功归还！`);
      }
    },
    handleDuplicateBorrow(bookId) {
      const book = this.books.find(b => b.id === bookId);
      if (book.status === '已归还') {
        book.status = "借阅中";
        alert(`图书《${book.title}》已重新借阅！`);
      } else {
        alert(`图书《${book.title}》已经在借阅中，无法再次借阅！`);
      }
    },
    searchBooks() {
      // 查询时将页码重置为第一页
      this.currentPage = 1;
    },
    resetSearch() {
      this.searchTitle = "";
      this.searchId = "";
      this.currentPage = 1; // 重置分页
    },
    // 页码切换时触发的方法
    handlePageChange(page) {
      this.currentPage = page;
      console.log('当前页:', page);
      // 如果需要可以请求新的数据
      // this.fetchBooks(); // 根据当前页码重新获取数据
    }
  },
};


// export default {
//   components: {Footer, UserHeader},
//   data() {
//     return {
//       title: "用户图书借阅页面",
//       books: [
//         {id: 1, title: "图书1", borrowDate: "2024-12-01", borrowDays: 10, dueDate: "2024-12-11", status: "借阅中"},
//         {id: 2, title: "图书2", borrowDate: "2024-12-05", borrowDays: 5, dueDate: "2024-12-10", status: "借阅中"},
//         {id: 3, title: "图书3", borrowDate: "2024-11-25", borrowDays: 15, dueDate: "2024-12-10", status: "已归还"},
//         {id: 4, title: "图书4", borrowDate: "2024-10-20", borrowDays: 20, dueDate: "2024-11-10", status: "借阅中"},
//         {id: 5, title: "图书5", borrowDate: "2024-09-15", borrowDays: 30, dueDate: "2024-10-15", status: "已归还"},
//         {id: 6, title: "图书6", borrowDate: "2024-07-10", borrowDays: 5, dueDate: "2024-07-15", status: "借阅中"},
//         {id: 7, title: "图书7", borrowDate: "2024-06-01", borrowDays: 12, dueDate: "2024-06-13", status: "已归还"},
//       ],
//       searchTitle: "",
//       searchId: "",
//       currentPage: 1,
//       pageSize: 5, // 每页显示5条记录
//     };
//   },
//   computed: {
//     // 计算过滤后的书籍
//     filteredBooks() {
//       return this.books.filter(book => {
//         const matchesTitle = this.searchTitle
//             ? book.title.includes(this.searchTitle)
//             : true;
//         const matchesId = this.searchId ? book.id.toString().includes(this.searchId) : true;
//         return matchesTitle && matchesId;
//       });
//     },
//     // 计算分页后的书籍数据
//     paginatedBooks() {
//       const start = (this.currentPage - 1) * this.pageSize;
//       const end = start + this.pageSize;
//       return this.filteredBooks.slice(start, end);
//     }
//   },
//
//   methods: {
//     returnBook(bookId) {
//       const book = this.books.find(b => b.id === bookId);
//       if (book) {
//         book.status = "已归还";
//         alert(`图书《${book.title}》已成功归还！`);
//       }
//     },
//     handleDuplicateBorrow(bookId) {
//       const book = this.books.find(b => b.id === bookId);
//       if (book.status === '已归还') {
//         book.status = "借阅中";
//         alert(`图书《${book.title}》已重新借阅！`);
//       } else {
//         alert(`图书《${book.title}》已经在借阅中，无法再次借阅！`);
//       }
//     },
//     searchBooks() {
//       // 查询时将页码重置为第一页
//       this.currentPage = 1;
//     },
//     resetSearch() {
//       this.searchTitle = "";
//       this.searchId = "";
//       this.currentPage = 1; // 重置分页
//     },
//     // 页码切换时触发的方法
//     handlePageChange(page) {
//       this.currentPage = page;
//       console.log('当前页:', page);
//       // 在这里你可以请求新的数据，基于当前页和每页条数
//     }
//   },
// }



</script>


<style scoped>
.main-body {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}

.query-section {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.el-input-wrapper {
  width: 240px; /* 增加输入框宽度 */
}

.input-query {
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 0 10px;
  border-radius: 4px;
}

.query-buttons {
  display: flex;
  gap: 15px;
  align-items: center;
}

.el-button {
  font-size: 16px; /* 增加按钮字体大小 */
  padding: 10px 20px;
}

.search-btn {
  background-color: #409eff;
  color: white;
  border-radius: 4px;
}

.reset-btn {
  background-color: #ff9900;
  color: white;
  border-radius: 4px;
}

.el-button:hover {
  opacity: 0.8;
}

.el-table {
  margin-top: 20px;
  overflow-x: auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.el-table th {
  background-color: #f4f4f4;
  text-align: center;
  font-weight: bold;
}

.el-table .cell {
  padding: 10px 15px;
  text-align: center;
  font-size: 14px; /* 调整图书信息字体大小 */
}

.el-button {
  font-size: 12px;
  padding: 5px 15px;
}

.el-button--success {
  background-color: #28a745;
  color: white;
}

.el-button--success:hover {
  background-color: #218838;
}

.el-button--warning {
  background-color: #ffc107;
  color: white;
}

.el-button--warning:hover {
  background-color: #e0a800;
}

/* 自定义分页条的样式 */
.custom-pagination {
  margin-top: 20px; /* 上方间距 */
  margin-bottom: 10px; /* 下方间距 */
  text-align: center;
}

.custom-pagination .el-pagination__list {
  margin: 0 auto;
  font-size: 14px;
}

.custom-pagination .el-pagination__jump {
  font-size: 14px;
  padding: 0 10px;
}

.custom-pagination .el-pagination__total {
  font-size: 14px;
}

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
