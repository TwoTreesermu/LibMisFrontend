<template>

  <div>
    <UserHeader />
  </div>

  <div class="main-body">
    <div class="container">
      <div class="header">我的预约</div>

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
              placeholder="请输入预约编号查询"
              clearable
              class="input-query"
          ></el-input>
        </div>
        <div class="query-buttons">
          <el-button
              type="primary"
              size="large"
              @click="searchReservations"
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

      <!-- 预约记录列表 -->
      <el-table :data="paginatedReservations" style="width: 100%;" border>
        <el-table-column label="书籍名称" prop="title"></el-table-column>
        <el-table-column label="预约编号" prop="reservationId"></el-table-column>
        <el-table-column label="预约日期" prop="reservationDate"></el-table-column>
        <el-table-column label="预计可借日期" prop="expectedAvailableDate"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
                v-if="row.status === '已预约'"
                type="danger"
                size="small"
                @click="cancelReservation(row.reservationId)"
            >
              取消预约
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredReservations.length"
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

export default {
  components: { Footer, UserHeader },
  data() {
    return {
      title: "用户图书预约页面",
      reservations: [], // 初始为空，后端请求后填充
      searchTitle: "",
      searchId: "",
      currentPage: 1,
      pageSize: 5, // 每页显示5条记录
    };
  },
  mounted() {
    // 页面加载时请求后端数据
    this.fetchReservations();
  },
  computed: {
    // 计算过滤后的预约记录
    filteredReservations() {
      return this.reservations.filter(reservation => {
        const matchesTitle = this.searchTitle ? reservation.title.includes(this.searchTitle) : true;
        const matchesId = this.searchId ? reservation.reservationId.toString().includes(this.searchId) : true;
        return matchesTitle && matchesId;
      });
    },
    // 计算分页后的预约数据
    paginatedReservations() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredReservations.slice(start, end);
    }
  },
  methods: {
    // 请求后端预约数据
    fetchReservations() {
      request.get('/api/reservation/userReservationList')
          .then(res => {
            if (res.data && Array.isArray(res.data)) {
              this.reservations = res.data; // 成功获取数据后赋值给 reservations
            } else {
              console.error("数据格式错误", res.data);
            }
          })
          .catch(error => {
            console.error('获取预约列表失败', error);
          });
    },
    cancelReservation(reservationId) {
      const reservation = this.reservations.find(r => r.reservationId === reservationId);
      if (reservation) {
        reservation.status = "已取消";
        alert(`预约《${reservation.title}》已成功取消！`);
      }
    },
    searchReservations() {
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
      // this.fetchReservations(); // 根据当前页码重新获取数据
    }
  }
};


// export default {
//   components: {Footer, UserHeader},
//   data() {
//     return {
//       title: "用户图书预约页面",
//       reservations: [
//         { reservationId: 1, userId: 1, bookId: 101, title: "图书1", reservationDate: "2024-12-01", expectedAvailableDate: "2024-12-10", status: "已预约" },
//         { reservationId: 2, userId: 1, bookId: 102, title: "图书2", reservationDate: "2024-12-05", expectedAvailableDate: "2024-12-15", status: "已预约" },
//         { reservationId: 3, userId: 2, bookId: 103, title: "图书3", reservationDate: "2024-11-20", expectedAvailableDate: "2024-12-05", status: "已取消" },
//         { reservationId: 4, userId: 2, bookId: 104, title: "图书4", reservationDate: "2024-10-10", expectedAvailableDate: "2024-10-25", status: "已预约" },
//         { reservationId: 5, userId: 3, bookId: 105, title: "图书5", reservationDate: "2024-09-15", expectedAvailableDate: "2024-10-10", status: "已借出" },
//         { reservationId: 6, userId: 3, bookId: 106, title: "图书6", reservationDate: "2024-07-10", expectedAvailableDate: "2024-07-20", status: "已预约" },
//         { reservationId: 7, userId: 4, bookId: 107, title: "图书7", reservationDate: "2024-06-01", expectedAvailableDate: "2024-06-10", status: "已取消" },
//       ],
//       searchTitle: "",
//       searchId: "",
//       currentPage: 1,
//       pageSize: 5, // 每页显示5条记录
//     };
//   },
//   computed: {
//     // 计算过滤后的预约记录
//     filteredReservations() {
//       return this.reservations.filter(reservation => {
//         const matchesTitle = this.searchTitle
//             ? reservation.title.includes(this.searchTitle)
//             : true;
//         const matchesId = this.searchId ? reservation.reservationId.toString().includes(this.searchId) : true;
//         return matchesTitle && matchesId;
//       });
//     },
//     // 计算分页后的预约数据
//     paginatedReservations() {
//       const start = (this.currentPage - 1) * this.pageSize;
//       const end = start + this.pageSize;
//       return this.filteredReservations.slice(start, end);
//     }
//   },
//
//   methods: {
//     cancelReservation(reservationId) {
//       const reservation = this.reservations.find(r => r.reservationId === reservationId);
//       if (reservation) {
//         reservation.status = "已取消";
//         alert(`预约《${reservation.title}》已成功取消！`);
//       }
//     },
//     searchReservations() {
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
//     }
//   }
// };
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
}

.el-button {
  font-size: 12px;
  padding: 5px 15px;
}

.el-button--danger {
  background-color: #dc3545;
  color: white;
}

.el-button--danger:hover {
  background-color: #c82333;
}

/* 自定义分页条的样式 */
.custom-pagination {
  margin-top: 20px; /* 上方间距 */
  margin-bottom: 10px; /* 下方间距，可以调整分页条距离页面底部的距离 */
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
