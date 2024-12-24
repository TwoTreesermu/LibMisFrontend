<template>
<!--  <div>-->
<!--    <h1>{{ title }}</h1>-->
<!--    <div v-if="books.length > 0">-->
<!--      <h2>当前借阅的图书</h2>-->
<!--      <ul>-->
<!--        <li v-for="book in books" :key="book.id">-->
<!--          <div>{{ book.title }} - {{ book.author }}</div>-->
<!--          <button @click="returnBook(book.id)">归还图书</button>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--    <div v-else>-->
<!--      <p>您当前没有借阅任何图书。</p>-->
<!--    </div>-->
<!--  </div>-->


  <div class="main-body">
    <div style="width: 60%; margin: 10px auto">
      <div style="font-size: 24px; margin-bottom: 20px;">我的借阅</div>
      <div class="card" style="padding: 20px;"></div>
      <div class="el-overlay" style="z-index: 2004; display: none;"></div>
    </div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      title: "用户图书借阅页面",
      books: [] // 假设书籍列表会从后端获取
    };
  },
  mounted() {
    this.fetchBorrowedBooks();
  },
  methods: {
    // 假设这个方法通过API获取当前用户借阅的书籍
    fetchBorrowedBooks() {
      // 这里模拟从服务器获取当前借阅图书
      this.books = [
        { id: 1, title: '图书1', author: '作者1' },
        { id: 2, title: '图书2', author: '作者2' },
      ];
    },
    // 归还图书的方法
    returnBook(bookId) {
      // 在这里可以调用API来处理图书归还的请求
      alert(`图书ID ${bookId} 已归还`);
      // 假设归还成功后重新获取借阅图书
      this.fetchBorrowedBooks();
    }
  }
};
</script>
